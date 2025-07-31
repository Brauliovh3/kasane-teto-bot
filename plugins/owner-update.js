import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
  await m.react('🎵')
  
  if (conn.user.jid == conn.user.jid) {
    try {
      let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
      
      let updateMsg = `┏━━━━━━━━━━━━━━━━━━━━━┓\n`
      updateMsg += `┃   🎤 KASANE TETO MUSIC 🎤 ┃\n`
      updateMsg += `┃    ACTUALIZACIÓN BOT    ┃\n`
      updateMsg += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`
      updateMsg += `🔄 **Estado de la actualización:**\n\n`
      updateMsg += `\`\`\`\n${stdout.toString()}\`\`\`\n\n`
      updateMsg += `❤ ¡Bot actualizado con éxito! 🎵\n`
      updateMsg += `🥖 Todas las funciones musicales están al día.`
      
      await conn.reply(m.chat, updateMsg, m)
      await m.react('✅')
    } catch (error) {
      let errorMsg = `┏━━━━━━━━━━━━━━━━━━━━━┓\n`
      errorMsg += `┃   🎤 KASANE TETO MUSIC 🎤 ┃\n`
      errorMsg += `┃    ERROR ACTUALIZACIÓN    ┃\n`
      errorMsg += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`
      errorMsg += `❌ **Error en la actualización:**\n\n`
      errorMsg += `\`\`\`\n${error.message}\`\`\`\n\n`
      errorMsg += `🔧 Contacta al desarrollador si persiste el problema.`
      
      await conn.reply(m.chat, errorMsg, m)
      await m.react('❌')
    }
  }
}

handler.help = ['update', 'actualizar']
handler.tags = ['owner']
handler.command = ['update', 'actualizar', 'fix', 'fixed'] 
handler.rowner = true

export default handler