import fetch from 'node-fetch';
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let pp = await conn.profilePictureUrl(m.sender, 'image')

    const anu = {
      "key": {
        "fromMe": false,
        "participant": "0@s.whatsapp.net",
        "remoteJid": "0@s.whatsapp.net"
      },
      "message": {
        "groupInviteMessage": {
          "groupJid": "392485650_51939508653@g.us",
          "inviteCode": "mememteeeekkeke",
          "groupName": "P",
          "caption": "Hello, I'm Kasane Teto",
          "jpegThumbnail": await (await fetch(pp)).buffer()
        }
      }
    }
    
    conn.sendMessage(m.chat, { text: 'Hola teto word of the day quiere saber, ¿Cómo puedo ayudarte?' }, { quoted: anu })
  } catch (error) {
    conn.sendMessage(m.chat, 'Hola soy ❤KASANE TETO❤, ¿Cómo puedo ayudarte?', 'conversation', { quoted: m })
  }
}

handler.customPrefix = /^(teto)$/i
handler.command = new RegExp
export default handler
