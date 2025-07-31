let cooldowns = {}
let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)
  
  let tiempoEspera = 5 * 60
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`❤ ¡Querido fan! Ya has realizado una aventura musical recientemente~ Espera *⏱ ${tiempoRestante}* antes de tu próxima actuación para evitar agotar tu voz. ¡❤KASANE TETO❤ necesita descansar! 🥖`)
    return
  }
  
  cooldowns[m.sender] = Date.now()
  
  let senderLimit = users[senderId].limit || 0
  let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  while (randomUserId === senderId) {
    randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  }
  let randomUserLimit = users[randomUserId].limit || 0
  let minAmount = 15
  let maxAmount = 50
  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
  let randomOption = Math.floor(Math.random() * 3)
  
  
  const successMessages = [
    "¡Actuación musical completada con éxito!",
    "¡La melodía de ❤KASANE TETO❤ funcionó perfectamente!",
    "¡Sesión de grabación exitosa!",
    "¡El poder de la música prevalece!"
  ]
  
  const failMessages = [
    "¡Oh no! Se desafinó la canción...",
    "¡La actuación falló! ❤KASANE TETO❤ necesita mejorar su técnica...",
    "¡Querido fan, fuiste demasiado imprudente esta vez!",
    "¡La Academia Musical tendrá que replanear la presentación!"
  ]
  
  const partialMessages = [
    "¡Actuación parcialmente exitosa! Pero hubo algunos errores...",
    "¡Lograste cantar, pero no todo salió según la partitura!",
    "¡La improvisación fue necesaria!",
    "¡❤KASANE TETO❤ salvó la situación en el último momento!"
  ]
  
  switch (randomOption) {
    case 0:
      users[senderId].limit += amountTaken
      users[randomUserId].limit -= amountTaken
      let successMsg = successMessages[Math.floor(Math.random() * successMessages.length)]
      conn.sendMessage(m.chat, {
        text: `❤🥖 ${successMsg}\n\n¡Querido fan logró obtener ${amountTaken} 🥖 Baguettes de @${randomUserId.split("@")[0]} con una actuación musical increíble!\n\n*❤KASANE TETO❤ añade +${amountTaken} 🥖 Baguettes al inventario de ${senderName}* ✨\n\n"¡Excelente trabajo! ¡La música siempre da resultados!" - ❤KASANE TETO❤ 🥖`,
        contextInfo: { 
          mentionedJid: [randomUserId],
        }
      }, { quoted: m })
      break
      
    case 1:
      let amountSubtracted = Math.min(Math.floor(Math.random() * (senderLimit - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].limit -= amountSubtracted
      let failMsg = failMessages[Math.floor(Math.random() * failMessages.length)]
      conn.reply(m.chat, `❤🥖 ${failMsg}\n\n*Se restaron -${amountSubtracted} 🥖 Baguettes a ${senderName} como penalización* 😔\n\n"No te preocupes, querido fan... ¡La próxima vez tendremos una mejor melodía! La Academia Musical ❤KASANE TETO❤ aprende de cada nota." 🥖`, m)
      break
      
    case 2:
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserLimit / 2 - minAmount + 1)) + minAmount, maxAmount)
      users[senderId].limit += smallAmountTaken
      users[randomUserId].limit -= smallAmountTaken
      let partialMsg = partialMessages[Math.floor(Math.random() * partialMessages.length)]
      conn.sendMessage(m.chat, {
        text: `❤🥖 ${partialMsg}\n\n¡Solo lograste obtener ${smallAmountTaken} 🥖 Baguettes de @${randomUserId.split("@")[0]} antes de finalizar la canción!\n\n*❤KASANE TETO❤ añade +${smallAmountTaken} 🥖 Baguettes al inventario de ${senderName}* ✨\n\n"¡No está mal para una improvisación musical! La Academia Musical ❤KASANE TETO❤ siempre encuentra una melodía." 🥖`,
        contextInfo: { 
          mentionedJid: [randomUserId],
        }
      }, { quoted: m })
      break
  }
  
  global.db.write()
}

handler.tags = ['rpg']
handler.help = ['crimen', 'travesura']
handler.command = ['crimen', 'crime', 'travesura']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
