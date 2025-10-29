import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Card from './components/Card';

function App() {

const data = [
  {
    "title": "Tesla",
    "text": "Best company",
    "currentLikes": 7
  },
  {
    "title": "VK",
    "text": "Messenger for children",
    "currentLikes": 2
  },
  {
    "title": "Me",
    "text": "Best student",
    "currentLikes": 999
  },
  {
    "title": "Item",
    "text": "Some other item",
    "currentLikes": 0
  },
  {
    "title": "Real article",
    "text": "Real text for real article",
    "currentLikes": 11
  }
]


const Cards = data.map( d => <Card title={d.title} text={d.text} currentLikes= {d.currentLikes}/>)

  return (
    <div className="App">
      <Header/>
      <div className='Cards_container'>
      {Cards}
      </div>
    </div>
  );
}

export default App;
