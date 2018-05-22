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

  toUSD (money, desiredCurrencyCode) {
    for (var rate of this.rates) {
      if (rate.abbr === money.currencyCode) {
        var moneyInUSD = new Money(money.getAmount() * rate.rateInUSD, desiredCurrencyCode)
        console.log(moneyInUSD)
      }
    }
  }

  fromUSD (money, desiredCurrencyCode) {
    for (var rate of this.rates) {
      if (rate.abbr === desiredCurrencyCode) {
        return new Money(money.getAmount() / rate.rateInUSD, desiredCurrencyCode)
      }
    }
  }

  exchange (money, desiredCurrencyCode) {
    if (money.currencyCode === desiredCurrencyCode) {
      return money
    }
    // To USD
    if (desiredCurrencyCode === 'USD') {
      for (var rate of this.rates) {
        if (rate.abbr === money.currencyCode) {
          break
        }
      }
      return new Money(money.getAmount() * rate.rateInUSD, desiredCurrencyCode)
    }
    // From USD
    if (money.currencyCode === 'USD') {
      for (rate of this.rates) {
        if (rate.abbr === desiredCurrencyCode) {
          break
        }
      }
      return new Money(money.getAmount() / rate.rateInUSD, desiredCurrencyCode)
    } else {
      for (rate of this.rates) {
        if (rate.abbr === money.currencyCode) {
          var thisInUSD = this.toUSD(money)
          var finalAnswer = this.fromUSD(thisInUSD)
        }
      }
    }
  }
}
