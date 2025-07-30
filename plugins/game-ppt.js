let cooldowns = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let poin = 300
    let tiempoEspera = 5 * 1000
    let user = global.db.data.users[m.sender]
 
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera - Date.now()) / 1000))
        return conn.reply(m.chat, `❤ ¡Teto ya está jugando! Espera *⏱ ${tiempoRestante}* para apostar nuevamente con 🥖 baguettes.`, m, rcanal)
    }

    cooldowns[m.sender] = Date.now()

    if (!text) return conn.reply(m.chat, '❤ ¡Teto quiere jugar! Elige una opción ( *piedra/papel/tijera* ) para empezar el juego 🎤\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* piedra`, m, rcanal)

    let opciones = ['piedra', 'papel', 'tijera']
    let astro = opciones[Math.floor(Math.random() * opciones.length)]

    if (!opciones.includes(text)) return conn.reply(m.chat, '❤ ¡Teto no entiende! Elige una opción ( *piedra/papel/tijera* ) para empezar el juego 🎵\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* piedra`, m, rcanal)

    let resultado = ''
    let puntos = 0

    if (text === astro) {
        resultado = `❤ ¡Fue un empate! Teto te da una recompensa especial: *100 🥖 Baguettes* 🎤`
        puntos = 100
    } else if (
        (text === 'piedra' && astro === 'tijera') ||
        (text === 'tijera' && astro === 'papel') ||
        (text === 'papel' && astro === 'piedra')
    ) {
        resultado = `❤ ¡GANASTE! Teto está impresionada 🎵 Acabas de ganar *300 🥖 Baguettes*`
        puntos = poin
    } else {
        resultado = `❤ Perdiste... ¡Pero Teto cree en ti! 🎤 Perdiste *300 🥖 Baguettes*`
        puntos = -poin
    }

    user.limit += puntos
    conn.reply(m.chat, `${resultado}`, m, rcanal)
}

handler.help = ['ppt']
handler.tags = ['game']
handler.command = ['ppt']
//handler.group = true
handler.register = true
export default handler

function segundosAHMS(segundos) {
    return `${segundos % 60} segundos`
}