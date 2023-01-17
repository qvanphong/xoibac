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
    files: ['https://media.discordapp.net/attachments/932640939917332540/934361335901347860/unknown.png']
    })
}
