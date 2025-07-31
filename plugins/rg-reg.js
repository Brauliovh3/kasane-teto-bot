import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /^(.+)[.\s]+(\d+)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  
  if (user.registered === true) return m.reply(`❤ ¡Ya estás registrado en el mundo de Teto! 🎤`)
  
  if (!Reg.test(text)) return m.reply(`*❤ KASANE TETO - REGISTRO MUSICAL*\n\n` +
    `*Por favor, ingresa tu nombre y edad para unirte a la familia de Teto.*\n\n` +
    `*🎵 Formato de registro:*\n` +
    `*${usedPrefix + command} [nombre].[edad]*\n` +
    `*${usedPrefix + command} [nombre] [edad]*\n\n` +
    `*🎤 Ejemplo:*\n` +
    `*${usedPrefix + command} TETO-FAN.18*\n` +
    `*${usedPrefix + command} Maria Carmen 18*`)
  
  // Extraer nombre y edad usando la regex corregida
  let match = text.match(Reg)
  let name = match[1].trim()
  let age = parseInt(match[2])
  
  if (!name) return conn.reply(m.chat, '❌ El nombre no puede estar vacío, ¡Teto necesita saber cómo llamarte! 🎤', m)
  if (!age || isNaN(age)) return conn.reply(m.chat, '❌ La edad debe ser un número válido para cantar juntos. 🎵', m)
  
  if (age < 13) return conn.reply(m.chat, '❌ Debes tener al menos 13 años para unirte al coro de Teto. 🥖', m)
  if (age > 100) return conn.reply(m.chat, '❌ Por favor ingresa una edad válida.', m)
  
  user.name = name
  user.age = age
  user.regTime = +new Date()
  user.registered = true
  
  let sn = createHash('md5').update(m.sender).digest('hex')
  
  // Imagen temática de Kasane Teto para el registro
  let img = 'https://files.catbox.moe/hx106s.jpg'
  
  let now = new Date()
  let date = now.toLocaleDateString('es-ES', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  let time = now.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })
  
  let studentId = `${age}${sn.slice(0, 4).toUpperCase()}`
  
  let txt = `┏━━━━━━━━━━━━━━━━━━━━━┓\n`
  txt += `┃   🎤 KASANE TETO MUSIC 🎤 ┃\n`
  txt += `┃REGISTRO MUSICAL COMPLETADO┃\n`
  txt += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`
  
  txt += `╔══════════════════════╗\n`
  txt += `║🎵 DATOS DEL CANTANTE 🎵║\n`
  txt += `╠══════════════════════╣\n`
  txt += `║👤 Usuario: @${m.sender.split('@')[0]}\n`
  txt += `║📝 Nombre: ${name}\n`
  txt += `║🎂 Edad: ${age} años\n`
  txt += `║🆔 ID Musical: ${studentId}\n`
  txt += `║📅 Fecha de Registro: ${date}\n`
  txt += `║⏰ Hora de Registro: ${time}\n`
  txt += `║🔐 Código Teto: ${sn.slice(0, 8).toUpperCase()}\n`
  txt += `╚══════════════════════╝\n\n`
  
  txt += `❤ ¡Bienvenido a la familia de Teto, ${name}! 🎤\n`
  txt += `🥖 Ya puedes usar todos los comandos musicales del bot.\n`
  txt += `🎵 Usa .menu para ver todas las canciones y funciones disponibles.`
  
  await conn.sendFile(m.chat, img, 'teto_registro.jpg', txt, m)
}

handler.help = ['reg', 'register', 'verificar']
handler.tags = ['rg']
handler.command = /^(verify|verificar|reg(ister)?)$/i

export default handler
