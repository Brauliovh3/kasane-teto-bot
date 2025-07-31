import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://media.tenor.com/if2-iI3keS0AAAAe/tachibana-nozomi-nozomi.png')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  
  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = `❤═════◆【 ACADEMIA MUSICAL 】◆════❤
🥖 ¡Un nuevo fan ha llegado! 🥖
┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ❤ Fan: @${m.messageStubParameters[0].split`@`[0]}
┃ 🏫 Academia: ${groupMetadata.subject}
┃ 📚 Estado: ¡Registrado exitosamente!
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛
🎀 ¡Bienvenido a nuestra Academia Musical! 🎀
❤ ❤KASANE TETO❤ espera que disfrutes la música aquí~ ✨
🥖 ¡Que tengas una experiencia musical increíble! 🥖
🎆Sigue nuestro canal🚂
❤https://whatsapp.com/channel/0029VajYamSIHphMAl3ABi1o 
❤═════◆【 🎓 】◆═════❤`
    
    await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `❤══════◆【 ACADEMIA MUSICAL 】◆══════❤
🚫 ¡Acción disciplinaria ejecutada! 🚫
┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 💔 Fan: @${m.messageStubParameters[0].split`@`[0]}
┃ 📋 Motivo: Expulsión del grupo
┃ 🏫 Estado: Removido de la academia
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛
😔 Las reglas de la academia deben ser respetadas...
❤ Esperamos que reflexiones sobre tus acciones 🥖
🎓 La disciplina es parte del crecimiento musical
🎆Sigue nuestro canal🚂
❤https://whatsapp.com/channel/0029VajYamSIHphMAl3ABi1o
❤═══════◆【 ⚖️ 】◆═══════❤`
    
    await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `❤══════◆【 ACADEMIA MUSICAL 】◆══════❤
🥖 Un fan se ha graduado... 🥖
┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ❤ Fan: @${m.messageStubParameters[0].split`@`[0]}
┃ 🎓 Decisión: Transferencia voluntaria
┃ 💌 Estado: Siguiendo su propio camino
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛
😢 Los caminos estudiantiles a veces se separan...
🌿 ¡Pero los recuerdos permanecerán para siempre! ✨
💚 Nozomi te desea lo mejor en tu nueva aventura~ 🎀
🌸 ¡Siempre tendrás un lugar en nuestros corazones! 🌸
🎆Sigue nuestro canal🚂
💙https://whatsapp.com/channel/0029VajYamSIHphMAl3ABi1o
💚══════◆【 🌟 】◆══════💚`
    
    await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal, estilo)
  }
}
