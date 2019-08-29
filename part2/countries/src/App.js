import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';


function App() {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ showCountries, setShowCountries ] = useState([])
  const [ wheather, setWheather ] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/countries")
      .then(response => setCountries(response.data))
  },[])

  const handleCountryChange = (event) => {
    const searchedCountry = event.target.value
    setSearch(searchedCountry)
    const arr = countries.filter(c => c.name.toLowerCase().includes(searchedCountry.toLowerCase()))

  
    setShowCountries(arr)
    if(arr.length !== 0){
      getWheather(arr[0].name)
      console.log("wheather",wheather);
    }
  }

  const showLanguages = () => showCountries[0].languages.map(lang => <li key={lang.name}>{lang.name}</li>)

  const showDetails = () => {
    return (
      <>
        <h2>{showCountries[0].name}</h2>
        <p>capital {showCountries[0].capital}</p>
        <p>population {showCountries[0].population}</p>
        <h3>languages</h3>
        <ul>
          {showLanguages()}
        </ul>
        <img src={showCountries[0].flag} width='100' alt="not found."/>
        <h2>Wheather in {showCountries[0].capital}</h2>
        <p><b>temperature:</b> {Math.trunc(wheather.current.temp_c)} Celsius</p>
        <img src={wheather.current.condition.icon} alt="not found."/>
        <p><b>wind:</b> {Math.trunc(wheather.current.wind_kph)} kph direction {wheather.current.wind_dir}</p>
      </>
    )
  }

  const getWheather = (name) => {
    const api = "http://api.apixu.com/v1/current.json?key=3eafde13385a4157b65153051192808&q="
    const srch = api.concat(name)

    axios
      .get(srch)
      .then(response => setWheather(response.data))
  }

  const row = () => {
    console.log("show countries",showCountries);
    if(showCountries.length === 1) {
      return (showDetails())
    }

    if(showCountries.length === 0) {
      return (
        <p>No country found.</p>
      )
    }

    if(showCountries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
    
    return (
      showCountries.map(c => {
        return (
          <div key={c.name}>
            <p key={c.name}>{c.name} <button key={c.name} onClick={() => {
              const arr = showCountries.filter(clicked => c.name === clicked.name)
              setShowCountries(arr)
              showDetails()
              setSearch('')
            }
            }>show</button></p>
          </div>
        )
      })
    )
  }

  return (
    <div>
      <div>
        <SearchForm text='find countries' value={search} onChange={handleCountryChange}/>
      </div>
      <div>
        <SearchResult row={row}/>
      </div>
    </div>
  );
}

export default App;
