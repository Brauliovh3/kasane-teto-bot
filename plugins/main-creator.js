let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;❤KASANE TETO❤;;\nFN:❤KASANE TETO❤\nORG:❤KASANE TETO❤\nTITLE:\nitem1.TEL;waid=51988514570:51988514570\nitem1.X-ABLabel:❤KASANE TETO❤\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:❤KASANE TETO❤\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: '❤KASANE TETO❤', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
