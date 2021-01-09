import React, { Component } from 'react'
import './App.css';



//http://api.tvmaze.com/search/people?q=sarah+michelle+gellar


//get persons ID from above, then below for credits
//http://api.tvmaze.com/people/35928/castcredits?embed=show


//show posters
// http://api.tvmaze.com/shows/1/images

//Components
import TopBar from './components/TopBar'
import Form from './components/Form'
import People from './components/People'
import Footer from './components/Footer'

const personSearch = `http://api.tvmaze.com/search/people?q=`


// const postersSearch = `http://api.tvmaze.com/shows/35928/images`

class App extends Component {

  state = {

    people: []

  }

  getPerson = async (e) => {
    const personName = e.target.elements.personName.value

    e.preventDefault()

    try {
      //cors anywhere here just incase https://cors-anywhere.herokuapp.com/
      const API_CALL = await fetch(`${personSearch}${personName}`)

      const data = await API_CALL.json()

      this.setState({ people: data })

    } catch (err) {
    
      console.log(err)
    
    }
  }

  componentDidUpdate = () => {
    const people = JSON.stringify(this.state.people)

    localStorage.setItem("people", people)

  }

  componentDidMount = () => {
    const localPeople = localStorage.getItem('people')

    const people = JSON.parse(localPeople)

    this.setState({ people })

  }

  render() {
    return (
      <div className="App">
        <TopBar title="TV Search" />
        <Form getPerson={ this.getPerson } />
        <People people={ this.state.people } />
        <Footer />
      </div>
    );
  }
}

export default App;