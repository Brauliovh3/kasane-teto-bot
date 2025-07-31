

let handler = async (m, { args }) => {
   let user = global.db.data.users[m.sender]
   if (!args[0]) return m.reply('❤ Ingresa la cantidad de *🥖 Baguettes* que deseas Depositar.')
   if ((args[0]) < 1) return m.reply('❤ Ingresa una cantidad válida de *🥖 Baguettes.')
   if (args[0] == 'all') {
      let count = parseInt(user.limit)
      user.limit -= count * 1
      user.bank += count * 1
      await m.reply(`Depositaste *${count} 🥖 Baguettes* al Banco.`)
      return !0
   }
   if (!Number(args[0])) return m.reply('❤ La cantidad deve ser un Numero.')
   let count = parseInt(args[0])
   if (!user.limit) return m.reply('No tienes *🥖 Baguettes* en la Cartera.')
   if (user.limit < count) return m.reply(`Solo tienes *${user.limit} 🥖 Baguettes* en la Cartera.`)
   user.limit -= count * 1
   user.bank += count * 1
   await m.reply(`Depositaste *${count} 🥖 Baguettes* al Banco.`)
}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'dep', 'd']
handler.register = true 
export default handler 