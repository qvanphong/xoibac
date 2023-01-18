const { MessageEmbed } = require('discord.js')

module.exports = async function handle(interaction) {
const embed = new MessageEmbed()
      .setColor('#ffc031')
      .setTitle('Test Embed')
      .setDescription('Lo cc')
    await interaction.channel.send({ embeds: [embed] })
    await interaction.deferReply()
    await interaction.editReply({ content: 'Hello' })
}
