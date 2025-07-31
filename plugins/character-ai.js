import Starlights from "@StarlightsTeam/Scraper"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '❤ ¿Qué le quieres decir a *Kasane Teto*? 🎤\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* Holaa`, m, rcanal)
  
  try {
    let character_id = "927b625cda47f1" //Consigue el ID de tu preferencia en https://spicychat.ai
    let name = conn.getName(m.sender)
    let { msg } = await Starlights.characterAi(character_id, text, name)

    await conn.reply(m.chat, `${msg.join("\n")}`, m, rcanal)
  } catch {
    await m.react('✖️')
  }
}
handler.tags = ["tools"]
handler.help = ["Teto *<texto>*"]
handler.command = ["kasane", "teto"]
handler.register = true 
export default handler