import './App.css';
import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import data from './assets/mock-data.json'

const App = () => {

  let Cards = data.map( d => <Card card={d}/>)

  return (
    <div className="App">
      <Header/>
      <div className='Cards-container'>
      {Cards}
      </div>
    </div>
  );
}


export default App;
