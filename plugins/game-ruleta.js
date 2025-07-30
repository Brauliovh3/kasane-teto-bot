let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender]
  
  let tiempoEspera = 10
  
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `❤ ¡Teto está ocupada cantando! Espera *⏱ ${tiempoRestante}* para apostar nuevamente con 🥖 baguettes`, m, rcanal)
    return
  }
  
  cooldowns[m.sender] = Date.now()

  if (!text) return conn.reply(m.chat, `❤ ¡Teto quiere jugar! Debes ingresar una cantidad de *🥖 Baguettes* y apostar a un color, por ejemplo: *${usedPrefix + command} 20 black*`, m, rcanal)

  let args = text.trim().split(" ")
  if (args.length !== 2) return conn.reply(m.chat, `❤ Formato incorrecto. Debes ingresar una cantidad de *🥖 Baguettes* y apostar a un color, por ejemplo: *${usedPrefix + command} 20 black*`, m, rcanal)

  let limit = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(limit) || limit <= 0) return conn.reply(m.chat, `❤ Por favor, ingresa una cantidad válida para la apuesta.`, m, rcanal)

  if (limit > 50) return conn.reply(m.chat, "❤ La cantidad máxima de apuesta es de 50 *🥖 Baguettes*.", m, rcanal)

  if (!(color === 'black' || color === 'red')) return conn.reply(m.chat, "❤ Debes apostar a un color válido: *black* o *red*.", m, rcanal)

  if (limit > users.limit) return conn.reply(m.chat, "❤ ¡Teto no puede prestarte! No tienes suficientes *🥖 Baguettes* para realizar esa apuesta.", m, rcanal)
  
  await conn.reply(m.chat, `❤ ¡Teto está emocionada! Apostaste ${limit} *🥖 Baguettes* al color ${color}. Espera *⏱ 10 segundos* para conocer el resultado.`, m, rcanal)

  setTimeout(() => {
    let result = Math.random()
    let win = false

    if (result < 0.5) {
      win = color === 'black'
    } else {
      win = color === 'red'
    }
    
    if (win) {
      users.limit += limit
      conn.reply(m.chat, `❤ ¡GANASTE! Teto está feliz 🎤 Obtuviste ${limit} *🥖 Baguettes*. Total: ${users.limit} *🥖 Baguettes*.`, m, rcanal)
    } else {
      users.limit -= limit
      conn.reply(m.chat, `❤ Perdiste... ¡Pero Teto te anima a seguir intentando! 🎵 Se restaron ${limit} *🥖 Baguettes*. Total: ${users.limit} *🥖 Baguettes*.`, m, rcanal)
    }

    
  }, 10000)
}
handler.tags = ['game']
handler.help =['ruleta *<cantidad> <color>*']
handler.command = ['ruleta', 'roulette', 'rt']
handler.register = true
handler.group = true 
export default handler

function segundosAHMS(segundos) {
  let segundosRestantes = segundos % 60
  return `${segundosRestantes} segundos`
}