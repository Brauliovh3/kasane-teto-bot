

import MessageType from '@whiskeysockets/baileys'
let impuesto = 0.02
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '❤ Menciona al usuario con *@user.*'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '❤ Ingrese la cantidad de *🥖 Baguettes* que quiere transferir.'
    if (isNaN(txt)) throw 'Sólo números.'
    let poin = parseInt(txt)
    let limit = poin
    let imt = Math.ceil(poin * impuesto)
    limit += imt
    if (limit < 1) throw '❤ Mínimo es *1 🥖 Baguette*.'
    let users = global.db.data.users
    if (limit > users[m.sender].limit) throw 'No tienes suficientes *🥖 Baguettes* para dar.'
    users[m.sender].limit -= limit
    users[who].limit += poin
    
    await m.reply(`*${-poin}* 🥖 Baguettes
Impuesto 2% : *${-imt}* 🥖 Baguettes
Total gastado: *${-limit}* 🥖 Baguettes`)
    conn.fakeReply(m.chat, `*+${poin}* *🥖 Baguettes.*`, who, m.text)
}
handler.help = ['darcebollines *@user <cantidad>*']
handler.tags = ['rpg']
handler.command = ['darcoins', 'darcebollines']
handler.register = true 

export default handler