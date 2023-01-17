module.exports = async function handle(interaction) {
    await interaction.deferReply()
    await interaction.editReply({ content: 'Hello' })
}