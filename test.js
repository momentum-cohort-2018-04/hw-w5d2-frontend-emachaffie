/* globals test, expect */

import {Money, Bank} from './money'

const bank = new Bank([{'abbr': 'WGA', 'name': 'Wizard Galleon', 'rateInUSD': 5}, {'abbr': 'FRC', 'name': 'Forgotten Realms Copper', 'rateInUSD': 0.2}, {'abbr': 'AMD', 'name': 'Ankh-Morpork Dollar', 'rateInUSD': 0.8}])

// * Given a Money object and the same currency code as that money, it should return the same amount of money.
test('1 USD with a currency code of USD returns 1 USD', () => {
  const oneDollar = new Money(1, 'USD')
  const sameCurrencyCode = ('USD')
  const bank = new Bank([])
  expect(bank.exchange(oneDollar, sameCurrencyCode)).toEqual(new Money(1, 'USD'))
})

// * Given a Money object and the currency code of USD, it should return the correct amount of money in USD.
test('5 Wizard Galleons should equal 25 USD', () => {
  const wizardgals = new Money(5, 'WGA')
  const toCurrencyCode = 'USD'
  const bank = new Bank([{'abbr': 'WGA', 'name': 'Wizard Galleon', 'rateInUSD': 5}, {'abbr': 'FRC', 'name': 'Forgotten Realms Copper', 'rateInUSD': 0.2}, {'abbr': 'AMD', 'name': 'Ankh-Morpork Dollar', 'rateInUSD': 0.8}])
  expect(bank.exchange(wizardgals, toCurrencyCode)).toEqual(new Money(25, 'USD'))
})

// * Given a Money object with the currency code of USD and any other currency code to convert to, it should return the correct amount of money.
test('25 USD should convert to 5 WGA', () => {
  const moneyInUSD = new Money(25, 'USD')
  const toCurrencyCode = 'WGA'
  const bank = new Bank([{'abbr': 'WGA', 'name': 'Wizard Galleon', 'rateInUSD': 5}, {'abbr': 'FRC', 'name': 'Forgotten Realms Copper', 'rateInUSD': 0.2}, {'abbr': 'AMD', 'name': 'Ankh-Morpork Dollar', 'rateInUSD': 0.8}])
  expect(bank.exchange(moneyInUSD, toCurrencyCode)).toEqual(new Money(5, 'WGA'))
})

// * Given a Money object and a currency code to convert to, neither of which are in USD, it should return the correct amount of money.
test('2 wizard galleons should equal 50 FRC', () => {
  const wizardgals = new Money(2, 'WGA')
  const toCurrencyCode = 'FRC'
  const bank = new Bank([{'abbr': 'WGA', 'name': 'Wizard Galleon', 'rateInUSD': 5}, {'abbr': 'FRC', 'name': 'Forgotten Realms Copper', 'rateInUSD': 0.2}, {'abbr': 'AMD', 'name': 'Ankh-Morpork Dollar', 'rateInUSD': 0.8}])
  expect(bank.exchange(wizardgals, toCurrencyCode)).toEqual(new Money(50, 'FRC'))
})

// You are going to create a web site for currency exchange, using fantasy currencies from [this fantasy currency API](http://fantasy-currency.glitch.me/rates).

// To start, you will need a Money class that has an amount and a currency code. This class can be taken from the example code from class today.

// Next, you will need a Bank class that takes an array of rates in its constructor. It should be able to take a Money object and a currency code to exchange to and return a new Money object. This class should be thoroughly tested. A suggested test plan:

// * Given a Money object and the same currency code as that money, it should return the same amount of money.
// * Given a Money object and the currency code of USD, it should return the correct amount of money in USD.
// * Given a Money object with the currency code of USD and any other currency code to convert to, it should return the correct amount of money.
// * Given a Money object and a currency code to convert to, neither of which are in USD, it should return the correct amount of money.

// Your bank should levy a 2% processing fee on all transactions and should be able to calculate that separately.

// Once you have a Money and Bank class, create the actual website. The currency rates change on the minute, so you should request new ones on page load. Ideally, you should request new ones each minute the page is open.

// A sample wireframe is included.
