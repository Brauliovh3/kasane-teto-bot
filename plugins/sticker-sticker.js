import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import fluent from 'fluent-ffmpeg'
import { fileTypeFromBuffer as fromBuffer } from 'file-type'
import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, args }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  let buffer

  try {
    // Verificar si hay una imagen o video
    if (/image|video/g.test(mime) && q.download) {
      if (/video/.test(mime) && (q.msg || q).seconds > 11) {
        return conn.reply(m.chat, '❤ El video no puede durar más de *10 segundos*', m, global.rcanal)
      }
      buffer = await q.download()
    } else if (args[0] && isUrl(args[0])) {
      try {
        const res = await fetch(args[0])
        if (!res.ok) throw new Error('No se pudo descargar la imagen/video de la URL')
        buffer = await res.buffer()
      } catch (error) {
        return conn.reply(m.chat, '❤ Error al descargar desde la URL. Verifica que sea válida.', m, global.rcanal)
      }
    } else {
      return conn.reply(m.chat,'❤ Donde esta la *imagen o video*? Envía una imagen/video o responde a una.', m, global.rcanal)
    }

    // Reaccionar para indicar que está procesando
    await m.react('🕓')

    // Verificar que el buffer no esté vacío
    if (!buffer || buffer.length === 0) {
      await m.react('❌')
      return conn.reply(m.chat, '❤ Error al procesar el archivo. Intenta de nuevo.', m, global.rcanal)
    }

    // Convertir a sticker
    const stickers = await toWebp(buffer) 
    
    if (!stickers) {
      await m.react('❌')
      return conn.reply(m.chat, '❤ Error al crear el sticker. Intenta con otra imagen/video.', m, global.rcanal)
    }

    let dl_url = await addExif(stickers, global.packname || '❤KASANE TETO❤', global.author || '(ㅎㅊDEPOOLㅊㅎ)')
    
    await conn.sendFile(m.chat, dl_url, 'sticker.webp', '', m)
    await m.react('✅')
    
  } catch (e) {
    console.error('Error en sticker:', e)
    await m.react('❌')
    conn.reply(m.chat, '❤ Ocurrió un error al crear el sticker. Intenta de nuevo más tarde.', m, global.rcanal)
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']
handler.register = true 

export default handler

async function toWebp(buffer, opts = {}) {
  const { name = '', author = '', emojis = [] } = opts
  const { ext } = await fromBuffer(buffer)
  if (!/(png|jpg|jpeg|mp4|mkv|m4p|gif|webp)/i.test(ext)) throw 'Media no compatible.'

  // Asegurar que el directorio tmp existe
  const tmpDir = global.tempDir || './tmp'
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true })
  }

  const input = path.join(tmpDir, `${Date.now()}.${ext}`)
  const output = path.join(tmpDir, `${Date.now()}.webp`)
  
  try {
    fs.writeFileSync(input, buffer)

    let aspectRatio = opts.isFull
      ? `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease`
      : `scale='if(gt(iw,ih),-1,299):if(gt(iw,ih),299,-1)', crop=299:299:exact=1`

    let options = [
      '-vcodec', 'libwebp',
      '-vf', `${aspectRatio}, fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
      ...(ext.match(/(mp4|mkv|m4p|gif)/) ? ['-loop', '0', '-ss', '00:00:00', '-t', '00:00:10', '-preset', 'default', '-an', '-vsync', '0'] : [])
    ]

    return new Promise((resolve, reject) => {
      fluent(input)
        .addOutputOptions(options)
        .toFormat('webp')
        .save(output)
        .on('end', () => {
          try {
            const result = fs.readFileSync(output)
            // Limpiar archivos temporales
            if (fs.existsSync(input)) fs.unlinkSync(input)
            if (fs.existsSync(output)) fs.unlinkSync(output)
            resolve(result)
          } catch (e) {
            reject(e)
          }
        })
        .on('error', (err) => {
          console.error('Error en fluent-ffmpeg:', err)
          // Limpiar archivo de entrada en caso de error
          if (fs.existsSync(input)) fs.unlinkSync(input)
          reject(err)
        })
    })
  } catch (error) {
    console.error('Error en toWebp:', error)
    // Limpiar archivos en caso de error
    if (fs.existsSync(input)) fs.unlinkSync(input)
    if (fs.existsSync(output)) fs.unlinkSync(output)
    throw error
  }
}

function isUrl(text) {
  return text.match(
    new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi')
  )
}
