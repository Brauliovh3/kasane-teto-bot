let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
  try {
    let kickte = `❤🥖 ¡Querido fan! Menciona al usuario que deseas remover o responde a su mensaje. Como cantante principal, necesito saber quién debe ser removido de este grupo musical.`
    
    
    if (!m.mentionedJid[0] && !m.quoted) {
      return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) })
    }
    
    
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    
    
    let participantsList = participants.map(p => p.id)
    if (!participantsList.includes(user)) {
      return m.reply('❤🥖 ¡Querido fan! Ese usuario no se encuentra en este grupo musical. ❤KASANE TETO❤ ha verificado la lista de miembros.')
    }
    
    
    if (user === conn.user.jid) {
      return m.reply('❤🥖 ¡Querido fan! No puedo removerme a mí misma del grupo musical. La Academia Musical ❤KASANE TETO❤ me necesita aquí para coordinar las actividades musicales. ¡Eso sería contraproducente!')
    }
    
    
    let groupMetadata = await conn.groupMetadata(m.chat)
    if (user === groupMetadata.owner) {
      return m.reply('❤🥖 ¡Querido fan! No puedo remover al director supremo de esta banda musical. Como vocalista principal de la Academia Musical ❤KASANE TETO❤, debo respetar la jerarquía musical.')
    }
    
    
    let userName = conn.getName(user)
    
    
    const removalMessages = [
      "¡Operación de remoción ejecutada con precisión estratégica!",
      "¡La decisión táctica ha sido implementada exitosamente!",
      "¡La Academia Musical ❤KASANE TETO❤ ha procesado la solicitud de transferencia!",
      "¡Protocolo musical de la Academia activado con éxito!"
    ]
    
    
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
    
   
    let successMsg = removalMessages[Math.floor(Math.random() * removalMessages.length)]
    m.reply(`❤🥖 ${successMsg}\n\n*${userName}* ha sido removido de la banda musical según las órdenes del director.\n\n"La coordinación musical siempre debe considerar estos ajustes necesarios." - ❤KASANE TETO❤ ✨`)
    
    
    try {
      await conn.sendMessage(user, { 
        text: `❤🥖 Estimado fan, has sido transferido fuera de la banda musical *${groupMetadata.subject}* por decisión administrativa.\n\n"No lo tomes personal, son ajustes musicales necesarios para el funcionamiento óptimo del grupo." - ❤KASANE TETO❤, Academia Musical 🥖` 
      })
    } catch (error) {
      console.log('No se pudo enviar mensaje privado al usuario expulsado:', error)
    }
    
  } catch (error) {
    console.error('Error en comando kick:', error)
    m.reply('❤🥖 ¡Oh no, querido fan! Ocurrió un error durante la operación de remoción. Como vocalista de la Academia Musical ❤KASANE TETO❤, recomiendo verificar que tengas los permisos administrativos necesarios para esta acción.')
  }
}

handler.help = ['kick *@user*', 'expulsar *@user*']
handler.tags = ['group']
handler.command = ['kick', 'expulsar', 'echar', 'remover'] 
handler.admin = true
handler.group = true
handler.Admin = true

export default handler
