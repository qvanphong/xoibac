const BetRound = require('../BetRound')
const database = require('../Database')

const choiceValue = {
  NUA: 'Nứa',
  HUONG: 'Hương',
  PILL: 'Pill',
  FAN_CAO: 'Falcao',
  VIET_MY: 'Việt Mỹ',
  DUC_MEO: 'Đức Meo',
}

module.exports = async function handle(interaction) {
  if (!BetRound.isOnGame) {
    await interaction.reply('Chưa có cái, ai muốn làm cái gõ /batdau')
    return
  }

  if (BetRound.isRolling) {
    await interaction.reply('https://media.discordapp.net/stickers/881690336261451836.webp?size=160')
    return
  }

  const betValue = interaction.options.getString('bet')
  const amount = interaction.options.getNumber('amount')
  const userId = interaction.user.id
  const username = interaction.user.username
  await interaction.deferReply()
  await database.saveBet(userId, username, betValue, amount)
  await interaction.editReply({
    content: `<:conganwoke:828370046208311296> **<@!${userId}> đã đặt ${choiceValue[betValue]} ${amount} **`,
  })
}
