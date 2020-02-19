import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Router, Route, Link, Switch, Redirect } from "react-router-dom"
import SignUp from './signup.js'
import Login from './Login.js'
import Portfolio from './portfolio.js'

class App extends React.Component {

  state = {
    currentUser: null
  }

  componentDidMount() {
    const user_id = localStorage.user_id

    if (user_id) {
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": user_id
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response.errors) {
            alert(response.errors)
          } else {
            this.setState({
              currentUser: response
            })
          }
        })
    }
  }

  setUser = (user) => {
    this.setState({
      currentUser: user
    }, () => {
      localStorage.user_id = user.id
      window.location.href = "http://localhost:3001/portfolio"
    })
  }

  logout = () => {
    this.setState({
      currentUser: null
    }, () => {
      localStorage.removeItem("user_id")
      this.props.history.push("/login")
    })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <SignUp setUser={this.setUser}/>}/>
            <Route exact path="/portfolio" render={() => <Portfolio user={this.state.currentUser}/>}/>
            <Route exact path="/login" render={() => <Login setUser={this.setUser}/>}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
