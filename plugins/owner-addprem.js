let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = db.data.users[who]
    if (!who) return m.reply(`❤ Etiqueta o menciona a alguien`)
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) return m.reply(`❤ Agrega el número de días que el usuario sera *Premium*`)
    if (isNaN(txt)) return m.reply(`Solo números!\n\*Ejemplo*\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`)
    global.prems.push(`${who.split`@`[0]}`)
    var jumlahHari = 86400000 * txt
    var now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += jumlahHari
    else user.premiumTime = now + jumlahHari
user.premium = true
    m.reply(`*💙 Nombre* : ${user.name}\n*💙 Tiempo* :${txt} Días`)
}
handler.help = ['addprem *@user*']
handler.tags = ['owner']
handler.command = /^(addprem|addpremium)$/i

handler.group = true
handler.rowner = true

export default handler