import React from 'react'
import FormInput from './FormInput.js'
import FormButton from './FormButton.js'

class Profile extends React.Component {

  state = {
    allStocks: null
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    fetch('https://cloud.iexapis.com/stable/stock/market/batch?symbols=aapl,fb,dow,cxo,psa,exr&types=quote,news,chart&range=1m&last=5&token=pk_91af6e7a0d1740b18ff9940c9e58e242')
      .then(res => res.json())
      .then(stocks => {
        this.setState({
          allStocks: stocks
        })
      })
  }

  getMoney = () => {
    return this.props.user ? this.props.user.money : 0
  }

  render() {
    return (
      <div>
        {console.log(this.state.allStocks)}
        {this.state.allStocks ? Object.entries(this.state.allStocks).map(array => `${array[0]}, ${array[1].quote.latestPrice}`) : null}
        Cash - ${this.props.user ? this.getMoney() : null}
        <form>
          <FormInput
            description="Username"
            placeholder="Ticker"
            type="text"
            name="username"
            changing={this.handleChange}
          />
          <FormInput
            description="Username"
            placeholder="Quantity"
            type="text"
            name="username"
            changing={this.handleChange}
          />
          <FormButton title="Buy"/>
        </form>
      </div>
    )
  }
}

export default Profile
