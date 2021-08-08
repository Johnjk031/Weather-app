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
    <main>
<section className="app">
    
<p className="description">Check weather in:</p>

    <section className="search-box">
    <form onSubmit={getData}>
    
    

    <input 
    type="text"
    className="input-text"
    onChange={e => setCity(e.target.value)}
    />
    <button className="submit-btn" type="submit">search</button>
    
    </form>
    </section>

  { data.cod === 200 ?
  (

  <section className={sectionOpen ? 'output' : 'hide'}>
    
    <article className="location">
    <p className="small-text">Location:</p>
  <p className="big-text">{data.name}, {data.sys.country}</p>
    </article>
    
    <article className="date">
    <p className="small-text">Day:</p>
  <p className="big-text">{currentDate}</p>
    </article>
  
  <article className="weather-desc">
  <p className="small-text">Weather:</p>
  <p className="big-text">{Math.round(data.main.temp)}°</p>
  <span>
  <p className="big-text" style={{textTransform: 'capitalize'}}>{data.weather[0].description}</p>
  <img src={`https://api.openweathermap.org/img/w/${data.weather[0].icon}`} alt="weather-icon"  />
  </span>   
  </article>
 
  </section>

) :
''
}

 {sectionOpen && data.main === undefined ? (
  <section>
    <p>{data.message} or country</p>
  </section>
)
: ''
} 
  
    </section>
    </main>

  );
}

export default App;
