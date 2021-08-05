import React, { useState } from 'react'
import './App.css';

function App() {

const [city, setCity] = useState('')
const [data, setData] = useState({})
const [sectionOpen, setSectionOpen] = useState(false)


let key = process.env.REACT_APP_KEY;

const getDate = new Date();
const currentDate = getDate.toDateString();

let api =  `https://api.openweathermap.org/data/2.5/`


let getData = e => {
  e.preventDefault()
 

  fetch(`${api}weather?q=${city}&units=metric&appid=${key}`)
  .then(res => res.json())
  .then(result => {
    setSectionOpen(false)
    setData(result)
    setSectionOpen(true)
    console.log(result)
  })
  

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
    <button type="submit">search</button>
    
    </form>
    </section>

  { data.cod === 200 ? (

  <section className={sectionOpen ? 'output' : 'hide'}>
  <p>{data.name}, {data.sys.country}</p>
  <p>{currentDate}</p>
  <p>{Math.round(data.main.temp)}°</p>
  </section>

) :
''
}

 {sectionOpen && data.main === undefined ? (
  <section>
    <p>{data.message}</p>
  </section>
)
: ''
} 
  
  </main>
    </section>
  );
}

export default App;
