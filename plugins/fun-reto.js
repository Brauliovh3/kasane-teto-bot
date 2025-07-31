let handler = async (m, { conn }) => {
    conn.reply(m.chat, `*┌────「 𝚁𝙴𝚃𝙾 」─*\n*"${pickRandom(global.bucin)}"*\n*└────「 TETO ❤ 」─*`, m)
}

handler.help = ['reto']
handler.tags = ['fun']
handler.command = /^reto/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

global.bucin = [
    "❤ Teto te reta: ¡Canta una canción en el chat! 🎤",
    "🥖 Reto de Teto: Di algo dulce a alguien del grupo",
    "🎵 Teto dice: ¡Baila mientras escribes tu próximo mensaje!",
    "❤ Reto musical: Menciona tu canción favorita de Teto",
    "🎤 Teto te desafía: ¡Haz una rima con la palabra 'baguette'!",
    "🥖 Reto dulce: ¡Envía un emoji de corazón a todos!",
    "🎵 Teto dice: ¡Cuenta hasta 10 cantando!",
    "❤ Reto de personalidad: ¡Actúa como Teto por 5 minutos!",
    "🎤 Desafío musical: ¡Inventa una letra corta para Teto!",
    "🥖 Teto te reta: ¡Di 'baguette' 3 veces seguidas!"
]
