import { createHash } from 'crypto'

let handler = async (m, { conn, usedPrefix, command }) => {
  
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let user = global.db.data.users[who]
  let username = conn.getName(who)
  
  if (!(who in global.db.data.users)) {
    return m.reply(`❌ El usuario @${who.split('@')[0]} no está registrado en la Academia Musical de Teto.\n\n🎤 Usa ${usedPrefix}reg para registrarte primero.`)
  }

  // Imagen temática de Kasane Teto
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
    minute: '2-digit' 
  })

  // Calcular nivel musical
  let level = user.level || 1
  let xp = user.exp || 0
  let nextLevelXp = level * 100
  let progress = Math.floor((xp / nextLevelXp) * 100)
  
  // Estrellas musicales basadas en el nivel
  let stars = '⭐'.repeat(Math.min(level, 10))
  if (level > 10) stars += ` +${level - 10}`
  
  // Rango musical
  let rank = 'Cantante Novato 🎤'
  if (level >= 50) rank = 'Estrella Musical ⭐'
  else if (level >= 30) rank = 'Artista Profesional 🎵'
  else if (level >= 20) rank = 'Vocalista Avanzado 🎶'
  else if (level >= 10) rank = 'Cantante Intermedio 🎼'
  else if (level >= 5) rank = 'Aprendiz de Teto 🥖'

  let txt = `┏━━━━━━━━━━━━━━━━━━━━━┓\n`
  txt += `┃   🎤 KASANE TETO MUSIC 🎤 ┃\n`
  txt += `┃    PERFIL MUSICAL    ┃\n`
  txt += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`
  
  txt += `╔═══════════════════════╗\n`
  txt += `║🌟 ESTATUS DEL CANTANTE 🌟║\n`
  txt += `╠═══════════════════════╣\n`
  txt += `║👤 Cantante: ${username}\n`
  txt += `║🎵 Nivel Musical: ${level}\n`
  txt += `║⭐ Estrellas: ${stars}\n`
  txt += `║🏆 Rango: ${rank}\n`
  txt += `║✨ Experiencia: ${xp.toLocaleString()} XP\n`
  txt += `║🎯 Siguiente Nivel: ${nextLevelXp.toLocaleString()} XP\n`
  txt += `║📊 Progreso: ${progress}%\n`
  txt += `║🥖 Baguettes: ${(user.money || 0).toLocaleString()}\n`
  txt += `║💎 Cristales Teto: ${(user.crystal || 0).toLocaleString()}\n`
  txt += `║🏛️ Banco: ${(user.bank || 0).toLocaleString()}\n`
  txt += `╚═══════════════════════╝\n\n`
  
  txt += `📅 Fecha: ${date}\n`
  txt += `⏰ Hora: ${time}\n\n`
  txt += `❤ ¡Sigue cantando para subir de nivel en la Academia de Teto! 🎤`
  
  // Barra de progreso visual
  let progressBar = ''
  let filled = Math.floor(progress / 10)
  for (let i = 0; i < 10; i++) {
    progressBar += i < filled ? '█' : '░'
  }
  
  txt += `\n\n🎵 Progreso al siguiente nivel:\n[${progressBar}] ${progress}%`

  await conn.sendFile(m.chat, img, 'teto_stars.jpg', txt, m, false, { 
    mentions: [who] 
  })
  
  // Reacción automática
  await conn.sendMessage(m.chat, { react: { text: '⭐', key: m.key } })
}

handler.help = ['stars', 'estrella', 'perfil', 'nivel']
handler.tags = ['rpg']
handler.command = /^(stars|estrella|perfil|nivel)$/i
handler.register = true

export default handler
