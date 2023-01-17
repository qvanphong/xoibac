const BetRound = require('../BetRound')
const database = require('../Database')
const wait = require('util').promisify(setTimeout)
const { MessageEmbed } = require('discord.js')

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


  await interaction.deferReply()
  if (!(await database.hasPlayers())) {
    await interaction.editReply({ content: 'Chưa có ai đặt cược, kéo người lên đi <:camnin:828369142649192478>' })
    return
  }

  BetRound.isRolling = true

  await interaction.editReply({
    content: '<:soyboy2:898561790592548925> Giờ lành đã điểm, các con nghiện buông đôi tay ra nào',
  })

  const choices = Object.keys(choiceValue)
  const selected = []
  const randomResult = []

  for (let i = 0; i < 3; i++) {
    let randomKey = choices[Math.floor(Math.random() * choices.length)]
    selected.push(randomKey)
    randomResult.push(choiceValue[randomKey])

    const embed = new MessageEmbed()
      .setColor('#ffc031')
      .setTitle('Kết quả xới lần ' + (i + 1))
      .setDescription(choiceValue[randomKey])
    await interaction.channel.send({ embeds: [embed] })
    await wait(i != 2 ? 3000 : 1000)
  }

  const playersResult = await database.getPlayerResult(selected)
  playersResult.sort((bettorA, bettorB) =>
    bettorA.totalWin < bettorB.totalWin ? 1 : bettorA.totalWin > bettorB.totalWin ? -1 : 0
  )

  let resultMessage = randomResult.join('\n')
  await interaction.channel.send({
    embeds: [new MessageEmbed().setColor('#ffc031').setTitle('Kết quả xới').setDescription(resultMessage)],
  })

  let playerResultMessage = '**Kết quả cược:**\n'
  playersResult.forEach((playerResult) => {
    playerResultMessage += `<@!${playerResult.id}> đã ${playerResult.totalWin >= 0 ? 'thắng' : 'thua'} ${
      playerResult.totalWin
    }\n`
  })

  await interaction.channel.send({ content: playerResultMessage })
  BetRound.isOnGame = false
  BetRound.isRolling = false

  // Clear bets in DB
  await database.clearBets()
}
