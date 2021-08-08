import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import CityExplorer from './component/CityExplorer';
import Header from './component/Header';
class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <CityExplorer/>
      </div>
    )
  }
}

export default App
