const mongoose = require('./mongoose')
const Big = require('big.js')
const mongo = mongoose.mongoose

const betSchema = new mongo.Schema({
  id: String,
  name: String,
  totalWin: Number,
  bets: [
    {
      value: String,
      amount: Number,
    },
  ],
})

const Bet = mongo.model('bets', betSchema)

async function saveBet(userId, username, betValue, amount) {
  const existingBet = await Bet.findOne({ id: userId })
  if (existingBet != null) {
    const bets = existingBet.bets
    const hasDuplicateBet = bets.some((bet) => bet.value === betValue)

    if (hasDuplicateBet) {
      bets.map((bet) => {
        if (bet.value === betValue) {
          bet.value = betValue
          bet.amount = amount
        }
        return bet
      })
    } else {
		bets.push({value: betValue, amount: amount})
	}

    await existingBet.save()
    return
  }

  const newBet = new Bet({
    id: userId,
    name: username,
    totalWin: 0,
    bets: [
      {
        value: betValue,
        amount: amount,
      },
    ],
  })

  await newBet.save()
}

async function clearBets() {
  await Bet.deleteMany({})
}

async function getPlayerResult(results) {
  const bettors = await Bet.find({})
  return bettors.map((bettor) => {
    bettor.bets.forEach((bet) => {
      const frequency = results.filter((result) => result === bet.value).length
      let totalWin = new Big(bettor.totalWin)
      let betAmount = new Big(bet.amount)

      if (frequency == 0) {
        bettor.totalWin = totalWin.minus(betAmount).toNumber()
      } else {
        let multipliedAmount = betAmount.times(frequency)
        bettor.totalWin = totalWin.plus(multipliedAmount).toNumber()
      }
    })

    return bettor
  })
}

async function hasPlayers() {
  const count = await Bet.countDocuments({})
  return count > 0
}

module.exports = { saveBet, clearBets, getPlayerResult, hasPlayers }
