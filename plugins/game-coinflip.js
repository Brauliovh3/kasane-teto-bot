let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let tiempoEspera = 5
    
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
        m.reply(`❤ ¡Teto ya está esperando tu próxima canción! Espera *⏱ ${tiempoRestante}* para apostar nuevamente con 🥖 baguettes.`)
        return
    }

    if (!text || !['cara', 'cruz'].includes(text.toLowerCase())) {
        return conn.reply(m.chat, '❤ ¡Teto quiere jugar! Elige una opción ( *Cara o Cruz* ) para lanzar la moneda 🥖\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* cara`, m, rcanal)
    }

    cooldowns[m.sender] = Date.now()
    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz'
    let esGanador = text.toLowerCase() === resultado

    if (esGanador) {
        global.db.data.users[m.sender].limit += 1000
        conn.reply(m.chat, `🎰 La moneda cayó en *${resultado}*, acabas de ganar *1000 🥖 Baguettes*`, m, rcanal)
    } else {
        global.db.data.users[m.sender].limit -= 500
        conn.reply(m.chat, `🎰 La moneda cayó en *${resultado}*, acabas de perder *500 🥖 Baguettes*`, m, rcanal)
    }
}

handler.help = ['coinflip']
handler.tags = ['game']
handler.command = ['suerte', 'cf', 'flip', 'coinflip']
handler.register = true

export default handler

function segundosAHMS(segundos) {
    return `${segundos % 60} segundos`
}