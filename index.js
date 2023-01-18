// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js')
const { token } = require('./config.json')
const dispatch = require('./Handler.js')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

// When the client is ready, run this code (only once)
client.once('ready', () => {
  client.user.setActivity("Muốn làm giàu? Hãy đến xới bạc. Muốn bớt giàu? Hãy đến xới bạc.From TLLN with love ❤️",
  {type: 'PLAYING', name:'Xới bạc'})
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  dispatch(interaction)
})

// Login to Discord with your client's token
client.login(token)
