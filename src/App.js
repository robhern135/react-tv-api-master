import React, { Component } from "react"
import "./App.css"

//show posters
// https://api.tvmaze.com/shows/1/images

//Components
import TopBar from "./components/TopBar"
import Form from "./components/Form"
import People from "./components/People"
import Footer from "./components/Footer"

import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

import { theme } from "./constants/colors"
// import { COLORS } from './constants/colors'

// const { background, white, primary, secondary } = COLORS

const personSearch = `https://api.tvmaze.com/search/people?q=`

// const postersSearch = `https://api.tvmaze.com/shows/35928/images`

class App extends Component {
  state = {
    people: [],
  }

  getPerson = async (e) => {
    const personName = e.target.elements.personName.value

    e.preventDefault()

    try {
      const API_CALL = await fetch(`${personSearch}${personName}`)

      const data = await API_CALL.json()

      this.setState({ people: data })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidUpdate = () => {
    const people = JSON.stringify(this.state.people)

    sessionStorage.setItem("people", people)
  }

  componentDidMount = () => {
    const localPeople = sessionStorage.getItem("people")

    const people = JSON.parse(localPeople)

    people && this.setState({ people })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ minHeight: "100vh" }}>
          <TopBar title="TV Search" />
          <Form getPerson={this.getPerson} />
          <People people={this.state.people} />
          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}

export default App
