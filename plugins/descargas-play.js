import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    
    if (!text?.trim()) {
      return conn.reply(m.chat, `🎤💙 ¡Ara ara! Por favor, dime el nombre de la canción que quieres que descargue para ti. 🎵✨`, m)
    }

    
    const botConfig = {
      name: global.botname || conn.user?.name || "Bot Musical 🎵",
      dev: global.dev || global.owner || "Desarrollador del Bot",
      thumbnail: null
    }

   
    let videoIdToFind = text.match(youtubeRegexID) || null
    let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1])
    
    if (videoIdToFind) {
      const videoId = videoIdToFind[1]  
      ytplay2 = ytplay2.all?.find(item => item.videoId === videoId) || 
                ytplay2.videos?.find(item => item.videoId === videoId)
    } 
    
    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2  
    
    
    if (!ytplay2 || Object.keys(ytplay2).length === 0) {
      return conn.reply(m.chat, '🎵💙 ¡Gomen! No encontré ninguna canción con ese nombre. ¿Podrías intentar con otro título? ✨', m)
    }

   
    const songData = {
      title: ytplay2.title || 'Título no encontrado',
      thumbnail: ytplay2.thumbnail || 'https://via.placeholder.com/300x300/ff69b4/ffffff?text=🎵+No+Image',
      timestamp: ytplay2.timestamp || '00:00',
      views: ytplay2.views || 0,
      ago: ytplay2.ago || 'Fecha desconocida',
      url: ytplay2.url || '#',
      author: ytplay2.author?.name || 'Canal desconocido'
    }
    
    const vistas = formatViews(songData.views)
    const infoMessage = `🎤💙 「✨」Descargando melodía virtual <${songData.title}> 🎵\n\n🎶 Canal Musical » ${songData.author}\n💫 Visualizaciones » ${vistas}\n⏰ Duración » ${songData.timestamp}\n✨ Publicado » ${songData.ago}\n🌟 Link Virtual » ${songData.url}\n\n💙 ¡Preparando tu canción favorita! ✨`
    
   
    let thumb = null
    try {
      if (songData.thumbnail && songData.thumbnail !== '#') {
        const thumbFile = await conn.getFile(songData.thumbnail)
        thumb = thumbFile?.data || null
      }
    } catch (e) {
      console.log('⚠️ Error al obtener thumbnail:', e.message)
      thumb = null
    }
    
   
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botConfig.name,
          body: botConfig.dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: songData.url,
          sourceUrl: songData.url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }
    
    
    const optionsMessage = `${infoMessage}\n\n🎯 **Opciones de Descarga:**\n\n1️⃣ **MP3** - Audio únicamente 🎵\n2️⃣ **MP4** - Video completo 🎬\n3️⃣ **MP3 DOC** - Audio como documento 📄\n4️⃣ **MP4 DOC** - Video como documento 📹\n\n💙 Responde con el número (1, 2, 3 o 4) de tu opción preferida ✨\n⏰ Tienes 60 segundos para elegir`
    
 
    await conn.reply(m.chat, optionsMessage, m, JT)
    
    
    try {
      if (!global.db) global.db = { data: { chats: {} } }
      if (!global.db.data) global.db.data = { chats: {} }
      if (!global.db.data.chats) global.db.data.chats = {}
      if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
      if (!global.db.data.chats[m.chat].playOptions) {
        global.db.data.chats[m.chat].playOptions = {}
      }
      
      
      global.db.data.chats[m.chat].playOptions[m.sender] = {
        url: songData.url,
        title: songData.title,
        thumbnail: songData.thumbnail,
        timestamp: Date.now() + 60000, 
        waitingResponse: true,
        videoId: ytplay2.videoId || null,
        duration: songData.timestamp,
        views: songData.views,
        author: songData.author
      }
    } catch (dbError) {
      console.error('⚠️ Error al guardar en base de datos:', dbError)
      
    }
    
  } catch (error) {
    console.error('❌ Error completo en handler:', error)
    
    let errorMsg = '🎤💙 ¡Gomen! Ocurrió un error en el escenario virtual ✨'
    
    if (error.message) {
      if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMsg += '\n\n🌐 Parece ser un problema de conexión. ¡Inténtalo de nuevo!'
      } else if (error.message.includes('search')) {
        errorMsg += '\n\n🔍 Error en la búsqueda. Verifica el nombre de la canción.'
      } else {
        errorMsg += `\n\n🔧 Detalle técnico: ${error.message}`
      }
    }
    
    return conn.reply(m.chat, errorMsg, m)
  }
}


handler.command = handler.help = ['play', 'música', 'musica', 'song', 'cancion', 'audio', 'video']
handler.tags = ['descargas']
handler.group = false
handler.register = false
handler.limit = true

export default handler


function formatViews(views) {
  if (views === undefined || views === null || views === 'no encontrado') {
    return "No disponible"
  }
  

  const numViews = typeof views === 'string' ? parseInt(views.replace(/,/g, '')) : views
  
  if (isNaN(numViews)) {
    return "No disponible"
  }
  
  if (numViews >= 1_000_000_000) {
    return `${(numViews / 1_000_000_000).toFixed(1)}B (${numViews.toLocaleString()})`
  } else if (numViews >= 1_000_000) {
    return `${(numViews / 1_000_000).toFixed(1)}M (${numViews.toLocaleString()})`
  } else if (numViews >= 1_000) {
    return `${(numViews / 1_000).toFixed(1)}k (${numViews.toLocaleString()})`
  }
  
  return numViews.toLocaleString()
}


function cleanExpiredOptions() {
  try {
    if (!global.db?.data?.chats) return
    
    const now = Date.now()
    Object.keys(global.db.data.chats).forEach(chatId => {
      const chat = global.db.data.chats[chatId]
      if (chat.playOptions) {
        Object.keys(chat.playOptions).forEach(userId => {
          const option = chat.playOptions[userId]
          if (option.timestamp && option.timestamp < now) {
            delete chat.playOptions[userId]
          }
        })
      }
    })
  } catch (error) {
    console.error('Error limpiando opciones expiradas:', error)
  }
}


setInterval(cleanExpiredOptions, 5 * 60 * 1000)
