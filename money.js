// import results from 'superagent'

const PRECISION = 3
const EXPONENT = (10 ** PRECISION)

export class Money {
  constructor (amount, currencyCode) {
    const decimalAsStr = amount.toString().split('.')[1]
    if (decimalAsStr && decimalAsStr.length > PRECISION) {
      throw new Error('Maximum money precision is ' + PRECISION)
    }

    this._amount = amount * EXPONENT
    this.currencyCode = currencyCode
  }

  getAmount () {
    return this._amount / EXPONENT
  }

  plus (other) {
    this.checkCurrencyCodes(other)
    return new Money((this._amount + other._amount) / EXPONENT, this.currencyCode)
  }

  minus (other) {
    this.checkCurrencyCodes(other)
    return new Money((this._amount - other._amount) / EXPONENT, this.currencyCode)
  }

  times (number) {
    return new Money((this._amount * number) / EXPONENT, this.currencyCode)
  }

  checkCurrencyCodes (other) {
    if (this.currencyCode !== other.currencyCode) {
      throw new Error('Currency codes do not match')
    }
  }
}

export class Bank {
  constructor (rates) {
    this.rates = rates
  }

  exchange (money, desiredCurrencyCode) {
    if (money.currencyCode === desiredCurrencyCode) {
      return money
    }
  }
}
