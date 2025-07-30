let handler = async (m, { text, usedPrefix, command }) => {
global.db.data.sticker = global.db.data.sticker || {}
if (!m.quoted) return conn.reply(m.chat, `❤ Teto necesita que respondas a un mensaje.`, m, rcanal)
if (!m.quoted.fileSha256) return conn.reply(m.chat, `❤ Teto necesita que respondas a un mensaje válido.`, m, rcanal)
if (!text) return conn.reply(m.chat, `❤ Ingresa el nombre del comando para Teto.`, m, rcanal)
try {
let sticker = global.db.data.sticker
let hash = m.quoted.fileSha256.toString('base64')
if (sticker[hash] && sticker[hash].locked) return conn.reply(m.chat, `❤ No tienes permiso para cambiar este comando de Sticker de Teto.`, m, rcanal)
sticker[hash] = {
text,
mentionedJid: m.mentionedJid,
creator: m.sender,
at: + new Date,
locked: false,
}
await conn.reply(m.chat, `❤ ¡Comando guardado con éxito! Teto está feliz 🎤`, m, rcanal)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['cmd'].map(v => 'set' + v + ' *<texto>*')
handler.tags = ['cmd']
handler.command = ['setcmd']
handler.owner = true

export default handler