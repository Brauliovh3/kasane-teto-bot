import fetch from 'node-fetch'

// Initialize rcanal immediately to avoid undefined errors
global.rcanal = global.rcanal || {}

export async function before(m, { conn }) {
let img = await (await fetch(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLOzG8KWlQXNJOhCBzKyGHwHhZ8YHjKg4lQ&s`)).buffer()

  const canales = [
    {
      id: "120363315369913363@newsletter",
      nombre: "❤KASANE TETO CHANNEL❤",
    },
    {
      id: "120363315369913363@newsletter",
      nombre: "❤KASANE TETO CHANNEL❤",
    },
  ]

  const canalSeleccionado = canales[Math.floor(Math.random() * canales.length)]

  global.rcanal = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: canalSeleccionado.id,
        serverMessageId: 100,
        newsletterName: canalSeleccionado.nombre,
      },
    },
  }

 global.adReply = {
	    contextInfo: { 
             forwardingScore: 9999, 
                 isForwarded: false, 
                    externalAdReply: {
				    showAdAttribution: true,
					title: botname,
					body: textbot,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: img,
                    thumbnail: img,
		           sourceUrl: canal,
		           mediaType: 1,
                   renderLargerThumbnail: true
				}
			}
		}
}
