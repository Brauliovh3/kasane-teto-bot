import fetch from 'node-fetch';
import yts from 'yt-search';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import stream from 'stream';

const execAsync = promisify(exec);
const pipeline = promisify(stream.pipeline);
const downloadFolder = './descargas'; 
const MAX_SIZE_MB = 100; 

const FORCE_DOCUMENT = false;

if (!fs.existsSync(downloadFolder)) {
  fs.mkdirSync(downloadFolder, { recursive: true });
}

const sanitizeFilename = (filename) => {
  return filename
    .replace(/[/\\?%*:|"<>]/g, '-') 
    .replace(/\s+/g, '_') 
    .substring(0, 100); 
};

const getFileSize = async (url) => {
  try {
    const response = await axios.head(url);
    const sizeInBytes = response.headers['content-length'] || 0;
    return parseFloat((sizeInBytes / (1024 * 1024)).toFixed(2));
  } catch (error) {
    console.error("Error obteniendo el tamaño del archivo:", error);
    return 0;
  }
};

const downloadFileToLocal = async (url, filePath) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    
    await pipeline(response.data, fs.createWriteStream(filePath));
    return filePath;
  } catch (error) {
    console.error("Error descargando archivo:", error);
    throw error;
  }
};

const fetchAPI = async (url, type) => {
  const audioEndpoints = [
    {
      url: async () => {
        const response = await fetch(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${url}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.url
    },
    {
      url: async () => {
        const response = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.result?.download?.url
    },
    {
      url: async () => {
        const response = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${url}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.dl
    },
    {
      url: async () => {
        const response = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${url}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.data?.download
    },
    {
      url: async () => {
        const response = await fetch(`${global.APIs?.fgmods?.url || 'https://api-fgmods.ddns.net'}/downloader/ytmp3?url=${url}&apikey=${global.APIs?.fgmods?.key || 'fg-dylux'}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.result?.dl_url
    }
  ];

  const videoEndpoints = [
    {
      url: async () => {
        const response = await fetch(`https://api.ryzendesu.vip/api/downloader/ytmp4?url=${url}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.url
    },
    {
      url: async () => {
        const response = await fetch(`https://api.agatz.xyz/api/ytmp4?url=${url}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.data?.download
    },
    {
      url: async () => {
        const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.result?.download?.url
    },
    {
      url: async () => {
        const response = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.dl
    },
    {
      url: async () => {
        const response = await fetch(`${global.APIs?.fgmods?.url || 'https://api-fgmods.ddns.net'}/downloader/ytmp4?url=${url}&apikey=${global.APIs?.fgmods?.key || 'fg-dylux'}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.result?.dl_url
    }
  ];

  const endpoints = type === 'audio' ? audioEndpoints : videoEndpoints;
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Intentando endpoint para ${type}...`);
      const data = await endpoint.url();
      const downloadUrl = endpoint.extract(data);
      
      if (downloadUrl && downloadUrl.includes('http')) {
        console.log(`✅ Endpoint exitoso para ${type}: ${downloadUrl.substring(0, 50)}...`);
        return { download: downloadUrl };
      }
    } catch (error) {
      console.error(`❌ Error con endpoint ${type}:`, error.message);
    }
  }
  
  console.error(`❌ Todos los endpoints fallaron para ${type}`);
  return { download: null };
};

const sendAsAudio = async (conn, chatId, url, title, replyMsg) => {
  try {
    const sanitizedTitle = sanitizeFilename(title);
    const fileName = `${sanitizedTitle}.mp3`;
    
    await conn.sendMessage(chatId, {
      audio: { url },
      mimetype: 'audio/mpeg',
      fileName,
      caption: `❤ ¡Disfruta tu melodía! 🎵✨`
    }, { quoted: replyMsg });
    
    return true;
  } catch (error) {
    console.error("Error enviando audio:", error);
    await conn.sendMessage(chatId, { react: { text: '🚫', key: replyMsg.key } });
    return false;
  }
};

const sendAsVideo = async (conn, chatId, url, title, replyMsg) => {
  try {
    const sanitizedTitle = sanitizeFilename(title);
    const fileName = `${sanitizedTitle}.mp4`;
    
    await conn.sendMessage(chatId, {
      video: { url },
      mimetype: 'video/mp4',
      fileName,
      caption: `❤ ¡Disfruta tu video! 🎬✨`
    }, { quoted: replyMsg });
    
    return true;
  } catch (error) {
    console.error("Error enviando video:", error);
    await conn.sendMessage(chatId, { react: { text: '🚫', key: replyMsg.key } });
    return false;
  }
};

const sendAsDocument = async (conn, chatId, url, isAudio, title, replyMsg) => {
  const sanitizedTitle = sanitizeFilename(title);
  const fileName = `${sanitizedTitle}.${isAudio ? 'mp3' : 'mp4'}`;
  const filePath = path.join(downloadFolder, fileName);

  try {
    await conn.reply(chatId, `❤ Preparando ${isAudio ? 'audio' : 'video'} como documento... 📄🥖`, replyMsg);
    
    await downloadFileToLocal(url, filePath);
    
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
      throw new Error("Archivo descargado vacío o corrupto");
    }
    
    await conn.sendMessage(chatId, {
      document: fs.readFileSync(filePath),
      mimetype: isAudio ? 'audio/mpeg' : 'video/mp4',
      fileName,
      caption: `❤ ${isAudio ? 'Audio' : 'Video'} descargado como documento 📄✨`
    }, { quoted: replyMsg });
    
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error eliminando archivo temporal:", err);
    });
    
    return true;
  } catch (error) {
    console.error("Error enviando documento:", error);
    
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      await conn.sendMessage(chatId, {
        document: { url },
        mimetype: isAudio ? 'audio/mpeg' : 'video/mp4',
        fileName,
        caption: `❤ ${isAudio ? 'Audio' : 'Video'} descargado como documento 📄✨`
      }, { quoted: replyMsg });
      
      return true;
    } catch (directError) {
      console.error("Error en envío directo:", directError);
      await conn.reply(chatId, `❤ No se pudo enviar el archivo. Intenta más tarde. 🚫`, replyMsg);
      return false;
    }
  }
};

const downloadAndSend = async (conn, chatId, replyMsg, videoId, option, title) => {
  try {
    const isAudio = option === 1 || option === 3;
    const asDocument = option === 3 || option === 4;
    
    const messageType = isAudio ? 'audio' : 'video';
    const format = isAudio ? 'MP3' : 'MP4';
    const documentText = asDocument ? ' como documento' : '';
    
    await conn.reply(chatId, `❤ Descargando ${messageType} (${format})${documentText}, por favor espera... 🥖⏳`, replyMsg);

    const videoUrl = `https://youtu.be/${videoId}`;
    const apiResponse = await fetchAPI(videoUrl, isAudio ? 'audio' : 'video');
    const downloadUrl = apiResponse.download;

    if (!downloadUrl) {
      await conn.reply(chatId, `❤ No se pudo descargar el ${messageType}. Intenta más tarde. 🚫`, replyMsg);
      return false;
    }

    const fileSizeMB = await getFileSize(downloadUrl);

    if (fileSizeMB > MAX_SIZE_MB) {
      await conn.reply(chatId, `❤ El archivo es demasiado grande (${fileSizeMB.toFixed(2)}MB). No se puede descargar. 📏`, replyMsg);
      return false;
    }

    let success = false;
    
    if (option === 1) {
      success = await sendAsAudio(conn, chatId, downloadUrl, title, replyMsg);
    } else if (option === 2) {
      success = await sendAsVideo(conn, chatId, downloadUrl, title, replyMsg);
    } else if (option === 3 || option === 4) {
      success = await sendAsDocument(conn, chatId, downloadUrl, isAudio, title, replyMsg);
    }
    
    return success;
  } catch (error) {
    console.error('Error descargando con API:', error);
    await conn.reply(chatId, `❤ Ocurrió un error al procesar tu solicitud. Intenta más tarde. 🚫`, replyMsg);
    return false;
  }
};


const downloadAndSendBoth = async (conn, chatId, replyMsg, videoId, title) => {
  try {
    const videoUrl = `https://youtu.be/${videoId}`;

    
    await conn.reply(chatId, `❤ Descargando audio (MP3), por favor espera... 🥖⏳`, replyMsg);
    const audioApi = await fetchAPI(videoUrl, 'audio');
    const audioUrl = audioApi.download;
    let audioSuccess = false;
    if (audioUrl) {
      audioSuccess = await sendAsAudio(conn, chatId, audioUrl, title, replyMsg);
    } else {
      await conn.reply(chatId, `❤ No se pudo descargar el audio. Intenta más tarde. 🚫`, replyMsg);
    }

    
    await conn.reply(chatId, `❤ Descargando video (MP4), por favor espera... 🥖⏳`, replyMsg);
    const videoApi = await fetchAPI(videoUrl, 'video');
    const videoUrlFinal = videoApi.download;
    let videoSuccess = false;
    if (videoUrlFinal) {
      videoSuccess = await sendAsVideo(conn, chatId, videoUrlFinal, title, replyMsg);
    } else {
      await conn.reply(chatId, `❤ No se pudo descargar el video. Intenta más tarde. 🚫`, replyMsg);
    }

    return audioSuccess && videoSuccess;
  } catch (error) {
    console.error('Error descargando audio/video:', error);
    await conn.reply(chatId, `❤ Ocurrió un error al procesar tu solicitud. Intenta más tarde. 🚫`, replyMsg);
    return false;
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '❤ Ingresa el nombre de la canción o video que deseas buscar. 🎵🥖', m);

  try {
    // Mensaje de búsqueda
    await conn.reply(m.chat, '❤ Buscando tu música... 🔍🥖', m);
    
    let res = await search(text);
    if (!res || res.length === 0) {
      return conn.reply(m.chat, '❤ No se encontraron resultados para tu búsqueda. Intenta con otro término. 🚫', m);
    }

    const { title, thumbnail, timestamp, views, ago, videoId } = res[0];

    let txt = `❤ ╭───〔 KASANE TETO PLAYER 〕───╮ ✨\n\n`
            + `🎵 *Título:* ${title}\n`
            + `⏰ *Duración:* ${timestamp}\n`
            + `👁️ *Visitas:* ${views}\n`
            + `📅 *Subido:* ${ago}\n\n`
            + `❤ ╰───〔 OPCIONES 〕───╯ ✨\n\n`
            + `💫 *Responde a este mensaje con:*\n`
            + `1️⃣ Audio MP3 🎵\n`
            + `2️⃣ Video MP4 🎬\n`
            + `3️⃣ Audio MP3 como Documento 📄\n`
            + `4️⃣ Video MP4 como Documento 📁\n\n`
            + `✨ *Powered by Kasane Teto* ❤🥖`;

    let SM = await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);
    
    await conn.sendMessage(m.chat, { react: { text: '❤', key: SM.key } });

    const handleOnce = new Set();

    conn.ev.on("messages.upsert", async (upsertedMessage) => {
      let RM = upsertedMessage.messages[0];
      if (!RM.message) return;

      const UR = RM.message.conversation || RM.message.extendedTextMessage?.text;
      let UC = RM.key.remoteJid;
      const msgId = RM.key.id;

      if (RM.message.extendedTextMessage?.contextInfo?.stanzaId === SM.key.id && !handleOnce.has(msgId)) {
        handleOnce.add(msgId);
        
        await conn.sendMessage(UC, { react: { text: '🎵', key: RM.key } });
        let success = false;
        let option = 0;

        if (UR === '1') {
          option = 1; 
        } else if (UR === '2') {
          option = 2; 
        } else if (UR === '3') {
          option = 3; 
        } else if (UR === '4') {
          option = 4; 
        } else {
          await conn.sendMessage(UC, { text: "❤ Opción inválida. Responde con: 🥖\n\n1️⃣ Audio MP3 🎵\n2️⃣ Video MP4 🎬\n3️⃣ Audio MP3 como documento 📄\n4️⃣ Video MP4 como documento 📁" }, { quoted: RM });
          await conn.sendMessage(UC, { react: { text: '🚫', key: RM.key } });
          return;
        }
        
        success = await downloadAndSend(conn, UC, RM, videoId, option, title);
        
        let reactionEmoji = '🚫';
        if (success) {
          if (option === 1) reactionEmoji = '🎵';
          else if (option === 2) reactionEmoji = '🎬';
          else if (option === 3) reactionEmoji = '📄';
          else if (option === 4) reactionEmoji = '📁';
        }
        
        await conn.sendMessage(UC, { react: { text: reactionEmoji, key: RM.key } });
      }
    });
  } catch (error) {
    console.error('Error en play command:', error);
    conn.reply(m.chat, '❤ Ocurrió un error al procesar tu solicitud. Intenta más tarde. 🚫', m);
  }
};

handler.command = ["play"];
handler.help = ["play <canción>"];
handler.tags = ["downloader"];
export default handler;

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return search.videos;
}
