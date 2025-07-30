import fetch from 'node-fetch'
import cheerio from 'cheerio'

let handler = async (m, { conn, usedPrefix, command, args }) => {
    if (!args[0]) return conn.reply(m.chat, `❤ ¡Teto necesita un link de TikTok que contenga imágenes! 🥖`, m, rcanal)
    if (!args[0].match(/tiktok/gi)) return conn.reply(m.chat, `❤ ¡Ups! Verifica que el link sea de TikTok 🎤`, m, rcanal)
    
    await m.react('⏳')
    
    try {
        
        const response = await fetch(args[0], {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            }
        })
        
        const html = await response.text()
        const $ = cheerio.load(html)
        
        
        const scriptData = $('script[id="__UNIVERSAL_DATA_FOR_REHYDRATION__"]').html()
        
        if (scriptData) {
            const jsonData = JSON.parse(scriptData)
            const videoData = jsonData.__DEFAULT_SCOPE__['webapp.video-detail']?.itemInfo?.itemStruct
            
            if (videoData && videoData.imagePost && videoData.imagePost.images) {
                let txt = '┏━━━━━━━━━━━━━━━━━━┓\n'
                txt += '┃❤ 𝐓𝐢𝐤𝐓𝐨𝐤 𝐈𝐦𝐚𝐠𝐞 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐫 ❤┃\n'
                txt += '┗━━━━━━━━━━━━━━━━━━━┛\n'
                txt += '╭───────────╮\n'
                txt += '│🎤 ���� 𝐈𝐧𝐟𝐨 🎤│\n'
                txt += '├──────────┤\n'
                txt += `│👤 𝐔𝐬𝐮𝐚𝐫𝐢𝐨: ${videoData.author.nickname}\n`
                txt += `│📝 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢ó𝐧: ${videoData.desc}\n`
                txt += `│🖼️ 𝐈𝐦á𝐠𝐞𝐧𝐞𝐬: ${videoData.imagePost.images.length}\n`
                txt += '├─────────────────┤\n'
                txt += '│❤ ���𝐨 𝐆𝐞𝐧𝐞𝐫𝐚𝐧𝐝� 𝐈𝐦á𝐠��𝐞𝐬... ❤│\n'
                txt += '╰────────────────╯\n'
                txt += '♪(´▽｀)♪\n'
                txt += '╭─────────────────────╮\n'
                txt += '│"¡Aquí están tus imágenes! 🥖"│\n'
                txt += '╰─────────────────────╯\n'
                
                for (let i = 0; i < videoData.imagePost.images.length; i++) {
                    const imageUrl = videoData.imagePost.images[i].imageURL.urlList[0]
                    
                    
                    const imageResponse = await fetch(imageUrl, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            'Accept': 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                            'Accept-Language': 'en-US,en;q=0.9',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Referer': 'https://www.tiktok.com/',
                            'Origin': 'https://www.tiktok.com',
                            'DNT': '1',
                            'Connection': 'keep-alive',
                            'Sec-Fetch-Dest': 'image',
                            'Sec-Fetch-Mode': 'no-cors',
                            'Sec-Fetch-Site': 'cross-site',
                        }
                    })
                    
                    if (imageResponse.ok) {
                        const imageBuffer = await imageResponse.buffer()
                        
                        let imageCaption = '┏━━━━━━━━━━━━━━━━━━━━━┓\n'
                        imageCaption += '┃❤ �𝐚�𝐧� ���𝐨 𝐃𝐞𝐥𝐢𝐯𝐞𝐫𝐲 ❤┃\n'
                        imageCaption += '┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n'
                        imageCaption += '╭──────────────────╮\n'
                        imageCaption += `│🖼️ 𝐈𝐦𝐚𝐠𝐞𝐧 #${i + 1} 𝐝𝐞 ${videoData.imagePost.images.length}│\n`
                        imageCaption += '├──────────────────┤\n'
                        imageCaption += '│🎤 𝐓𝐢𝐤𝐓𝐨𝐤 𝐈𝐦𝐚𝐠𝐞 🎤 \n'
                        imageCaption += '├──────────────────┤\n'
                        imageCaption += `│ 👤 𝐂𝐫𝐞𝐚𝐝𝐨𝐫: ${videoData.author.nickname}\n`
                        imageCaption += `│ 📱 𝐏𝐥𝐚𝐭𝐚𝐟𝐨𝐫𝐦𝐚: TikTok\n`
                        imageCaption += `│ 🎯 𝐂𝐚𝐥𝐢𝐝𝐚𝐝: HD\n`
                        imageCaption += '╰─────────────────╯\n'
                        imageCaption += '｡◕‿◕｡\n'
                        imageCaption += '╭───────────────╮\n'
                        imageCaption += '│"¡Espero que te guste! 🥖"│\n'
                        imageCaption += '╰──────────────╯\n'
                        imageCaption += '❤ 𝐊𝐚���𝐞 ���� 𝐒𝐭𝐲𝐥𝐞 ❤'
                        
                        await conn.sendFile(m.chat, imageBuffer, `teto_tiktok_${i + 1}.jpg`, imageCaption, m, null, rcanal)
                    } else {
                        console.log(`❤ Teto: Error descargando imagen ${i + 1}: ${imageResponse.status}`)
                    }
                }
                
                await m.react('❤')
                
                
                let finalMsg = '┏━━━━━━━━━━━━━┓\n'
                finalMsg += '┃❤ 𝐌𝐢𝐬𝐢ó𝐧 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐚𝐝𝐚 ❤┃\n'
                finalMsg += '┗━━━━━━━━━━━━━━━━┛\n'
                finalMsg += '╭────────────╮\n'
                finalMsg += '│🎤 𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨 🎤│\n'
                finalMsg += '├────────────┤\n'
                finalMsg += `│📸 𝐈𝐦á𝐠𝐞𝐧𝐞𝐬 𝐞𝐧𝐯𝐢𝐚𝐝𝐚𝐬: ${videoData.imagePost.images.length}\n`
                finalMsg += '│🎯 𝐄𝐬𝐭𝐚𝐝𝐨: Completado exitosamente\n'
                finalMsg += '│❤ 𝐀𝐠𝐞𝐧𝐭𝐞: Kasane Teto\n'
                finalMsg += '├─────────────────────┤\n'
                finalMsg += '│"¡Misión cumplida! (◕‿◕)♡ 🥖"│\n'
                finalMsg += '╰─────────────────────╯\n'
                finalMsg += '❤ 𝐆𝐫𝐚𝐜𝐢𝐚𝐬 𝐩𝐨𝐫 𝐮𝐬𝐚𝐫𝐦𝐞 ❤'
                
                await conn.reply(m.chat, finalMsg, m, rcanal)
                return
            }
        }
        
        throw new Error('No se encontraron imágenes')
        
    } catch (error) {
        console.error('Error:', error)
        await m.react('💔')
        
        let errorMsg = '┏━━━━━━━━━━━━━┓\n'
        errorMsg += '┃💔 𝐄𝐫𝐫𝐨𝐫 𝐃𝐞𝐭𝐞𝐜𝐭𝐚𝐝𝐨 💔┃\n'
        errorMsg += '┗━━━━━━━━━━━━━━━━┛\n'
        errorMsg += '╭──────────╮\n'
        errorMsg += '│⚠️ 𝐀𝐥𝐞𝐫𝐭𝐚 ⚠️│\n'
        errorMsg += '────────────┤\n'
        errorMsg += '│❤ Teto: "¡Ups! Algo salió mal..."\n'
        errorMsg += '│🔍 Verifica que el link contenga imágenes\n'
        errorMsg += '│📱 Asegúrate de que sea un link válido de TikTok\n'
        errorMsg += '├───────────────────┤\n'
        errorMsg += '│"¡Inténtalo de nuevo! (｡•́︿•̀｡) 🥖"│\n'
        errorMsg += '╰───────────────────╯\n'
        errorMsg += '❤ �𝐚�𝐚𝐧� ���𝐨 ❤'
        
        conn.reply(m.chat, errorMsg, m, rcanal)
    }
}

handler.help = ['tiktokimg *<url tt>*']
handler.tags = ['downloader']
handler.command = ['tiktokimg', 'tiktokimgs', 'ttimg', 'ttimgs']
handler.register = true

export default handler
