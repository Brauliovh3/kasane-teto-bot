// ❤ CONFIGURACIÓN DE EJEMPLO PARA KASANE TETO BOT ❤
// Copia este archivo como settings.js y personaliza según tus necesidades

import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
  ['TU-NUMERO-AQUI', 'Tu Nombre', true],
  // Agrega más números si necesitas más owners
]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

// Usuarios moderadores y premium
global.mods = []
global.prems = []
   
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

// Información del bot
global.packname = ``
global.author = '{\n "bot": {\n   "name": "❤KASANE TETO❤",\n     "author": "Tu Nombre",\n   "status_bot": "active"\n }\n}'
global.wait = '🥖 *Espera un momento, estoy preparando baguettes... ❤*'
global.botname = '❤KASANE TETO❤'
global.textbot = `Powered By Tu Nombre`
global.listo = '*¡Aquí tienes tu baguette! 🥖❤*'
global.namechannel = '❤KASANE TETO CHANNEL❤'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

// Recursos multimedia
global.catalogo = fs.readFileSync('./storage/img/catalogo.png')
global.miniurl = fs.readFileSync('./storage/img/miniurl.mp4')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

// Enlaces importantes (personaliza con los tuyos)
global.group = 'https://chat.whatsapp.com/TU-GRUPO-1'
global.group2 = 'https://chat.whatsapp.com/TU-GRUPO-2'
global.group3 = 'https://chat.whatsapp.com/TU-GRUPO-3'
global.canal = 'https://whatsapp.com/channel/TU-CANAL'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

// Estilo de mensajes
global.estilo = { 
  key: {  
    fromMe: false, 
    participant: `0@s.whatsapp.net`, 
    ...(false ? { remoteJid: "TU-GRUPO-ID@g.us" } : {}) 
  }, 
  message: { 
    orderMessage: { 
      itemCount : -999999, 
      status: 1, 
      surface : 1, 
      message: botname, 
      orderTitle: 'Teto', 
      thumbnail: catalogo, 
      sellerJid: '0@s.whatsapp.net'
    }
  }
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

// Librerías globales
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})

// 🥖❤ ¡Teto está lista para cantar! ❤🎤
