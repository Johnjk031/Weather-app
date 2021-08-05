import React, { useState } from 'react'
import './App.css';
import axios from 'axios';


function App() {

const [city, setCity] = useState('')
const [data, setData] = useState({})
const [sectionOpen, setSectionOpen] = useState(false)


let key = process.env.REACT_APP_KEY;

let temp = '15'

let api =  `https://api.openweathermap.org/data/2.5/`


let getData = e => {
  e.preventDefault()
  console.log(city)
  console.log(api)

  fetch(`${api}weather?q=${city}&appid=${key}`)
  .then(res => res.json())
  .then(result => {
    setSectionOpen(false)
    setData(result)
    setSectionOpen(true)
    console.log(result)
  })
  
console.log(process.env.REACT_APP_KEY);

}

  return (
    <section className="App">
  <main>
    
    <section className="search-box">
    <form onSubmit={getData}>
    <input 
    type="text"
    className="input-text"
    onChange={e => setCity(e.target.value)}
    />
    <button type="submit">submit</button>
    </form>
    </section>

{(typeof data.main != "undefined") ? (

<section className={sectionOpen ? 'output' : 'hide'}>
  <p>{data.name}, {data.sys.country}</p>
  <p>{data.main.temp}</p>
  </section>

):
('')
}


  

  </main>
    </section>
  );
}

export default App;
