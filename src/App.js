import React, { useState } from 'react'
import './App.css';

let App = () => {

// use state
const [city, setCity] = useState('')
const [data, setData] = useState({})
const [sectionOpen, setSectionOpen] = useState(false)

// api key stored in hidden folder - please insert your own key here, descriptions avalible in README-file
let key = process.env.REACT_APP_KEY;   //   <----  Your key goes here

// get the current date from users position
const getDate = new Date();
const currentDate = getDate.toDateString();

// base url
let api =  `https://api.openweathermap.org/data/2.5/`

//onclick/submit event
let getData = e => {
  e.preventDefault()
// fetching full url
  fetch(`${api}weather?q=${city}&units=metric&appid=${key}`)
  .then(res => res.json())
  .then(result => {
// close section again (if user submit more than once)  
    setSectionOpen(false)
// set data to the api responce
    setData(result)
// open section when user submits 
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

  {/* If api responce is valid */}
  { data.cod === 200 ?
  (

  <section className={sectionOpen ? 'output' : 'hide'}>
    
    <article className="location">
    <p className="small-text">Location:</p>
    <p className="big-text">{data.name}, {data.sys.country}</p>
    </article>
    
  <article className="weather-desc">
  <p className="small-text">Weather:</p>
  <p className="deg-text"> {Math.round(data.main.temp)}°</p>
  <span>
  <p className="big-text" style={{textTransform: 'capitalize'}}>{data.weather[0].description}</p>
  <img src={`https://api.openweathermap.org/img/w/${data.weather[0].icon}`} alt="weather-icon"  />
  </span>   
  </article>
 
  <article className="date">
    <p className="small-text">Date:</p>
  <p className="big-text">{currentDate}</p>
    </article>

  </section>

) :
''
}
  {/* If user submits & api responce is unvalid */}

 {sectionOpen && data.main === undefined ? (
  <section className="location">
    <p className="big-text" style={{textTransform: 'capitalize'}}>{data.message}</p>
    <p className="big-text">Country not found</p>
    <p className="big-text">Continent not found</p>
  </section>
)
: ''
} 
    </section>
    </main>

  );
}

export default App;
