const BetRound = require('../BetRound')
const database = require('../Database')

module.exports = async function handle(interaction) {
  if (BetRound.isRolling) {
    await interaction.reply('https://media.discordapp.net/stickers/881690336261451836.webp?size=160')
    return
  }
  BetRound.isOnGame = true

  database.clearBets();

  await interaction.reply({
    content:
      '<:soyboy2:898561790592548925> Mở bát cược mới, các con bạc đặt cược bằng lệnh `/dat`',
    files: ['https://cdn.discordapp.com/attachments/955888196632322128/966715527080857601/unknown.png']
    })
}
