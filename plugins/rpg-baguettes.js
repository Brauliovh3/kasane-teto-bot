import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    let name = conn.getName(who)
    if (!(who in global.db.data.users)) return conn.reply(m.chat, '❤ El usuario no se encuentra en la base de datos de Teto.', m, rcanal).then(_ => m.react('✖️'))
    
    // Asegurar que el usuario tenga propiedades inicializadas
    if (!user.limit) user.limit = 0;
    if (!user.bank) user.bank = 0;
    if (!user.exp) user.exp = 0;
    if (!user.name) user.name = name;
    
    // Array de imágenes temáticas de Kasane Teto
    let tetoImages = [
        'https://files.catbox.moe/7oczzi.png',
        'https://files.catbox.moe/7oczzi.png',
        'https://files.catbox.moe/7oczzi.png',
        'https://files.catbox.moe/7oczzi.png'
    ];
    
    // Seleccionar imagen aleatoria (por ahora usar la primera)
    let selectedImage = tetoImages[0];
    
    let img = await (await fetch(selectedImage)).buffer()
    let txt = `❤ ╭───〔 KASANE TETO WALLET 〕───╮ 🥖\n\n`
        txt += `💰 *Usuario:* ${user.name}\n`
        txt += `🥖 *Baguettes:* ${toNum(user.limit)} ( ${user.limit} )\n`
        txt += `🏦 *Banco:* ${toNum(user.bank)} ( ${user.bank} )\n`
        txt += `💫 *Experiencia:* ${toNum(user.exp)} ( ${user.exp} )\n\n`
        txt += `🎵 *"¡Mis baguettes son la melodía de mi corazón!"* - Kasane Teto\n\n`
        txt += `❤ ╰───〔 POWERED BY TETO 〕───╯ 🎤`
    let mentionedJid = [who]
        
await conn.sendFile(m.chat, img, 'teto_baguettes.jpg', txt, m, null, rcanal)
await m.react('🥖')
}
handler.help = ['Baguettes']
handler.tags = ['rpg']
handler.command = ['coins', 'wallet', 'cartera', 'baguettes', 'baguette', 'bal', 'balance']
handler.register = true 
export default handler

function toNum(number) {
    if (!number || isNaN(number)) return '0';
    const num = parseInt(number);
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    } else if (num <= -1000 && num > -1000000) {
        return (num / 1000).toFixed(1) + 'K'
    } else if (num <= -1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    } else {
        return num.toString()
    }
}
