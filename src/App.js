import React, { useState } from "react";
import "./App.css";
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={e2bf4439877de3bd651b96bb5ea545e}
// uRJ60j0mPdYWVHTlh8i5Q9sTUMzRKaU5FAz1b-7rDlY
//  https://api.unsplash.com/photos/?client_id=uRJ60j0mPdYWVHTlh8i5Q9sTUMzRKaU5FAz1b-7rDlY

const api = {
  key: "e2bf4439877de3bd651b96bb5ea545ee",
  base: "HTTPS://api.openweathermap.org/data/2.5/",
  photo:
    "https://api.unsplash.com/photos/random/?client_id=uRJ60j0mPdYWVHTlh8i5Q9sTUMzRKaU5FAz1b-7rDlY",
  photoSearch: "https://api.unsplash.com/search/photos?page=1&query=",
};

function App() {
  // when you run these functions , add a blank string
  const [photo, setPhoto] = useState(
    "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1949&q=80"
  );
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    evt.preventDefault();

    fetch(`${api.base}weather?q=${query}$units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
        if (query !== "") {
          fetch(`${api.photoSearch}${query}`, {
            method: "GET",
            headers: {
              Authorization:
                "Client-ID uRJ60j0mPdYWVHTlh8i5Q9sTUMzRKaU5FAz1b-7rDlY",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
              setPhoto(result.results[3].urls.regular);
              console.log(result);
              setQuery("");
            });
        }
      });
  };

  const dateBuild = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <>
      <main>
        <div className="App">
          <div className="divSep" style={{ backgroundImage: `url(${photo})` }}>
            <p>W3THR</p>
          </div>
          <form onSubmit={(e) => search(e)}>
            <h1 className="searchbox">
              <input
                type="text"
                placeholder="...CITY, STATE?"
                // the event 'e'
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onClick={search}
              />
            </h1>
            {/* when we only have one condition && to show just one thing  */}
            {typeof weather.main != "undefined" ? (
              <ul className="locationbox">
                <li>LOCATION:{weather.name}</li>
                <li>DATE:{dateBuild(new Date())}</li>
                <li>TEMP:{Math.round(weather.main.temp / 10)}*c</li>
                {/* <li>Humidity:</li> */}
                <li>SKY:{weather.weather[0].main}</li>
              </ul>
            ) : (
              <ul className="initPage">
                <li>Enter City and State to view current weather!</li>
                <li>Try searching a city in another country</li>
                </ul>
            )}
          </form>
        </div>
      </main>
    </>
  );
}

export default App;

// const response = await fetch(url, {
//   method: 'GET', // *GET, POST, PUT, DELETE, etc.
//   // mode: 'cors', // no-cors, *cors, same-origin
//   // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   // credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Authorization': 'Client-ID uRJ60j0mPdYWVHTlh8i5Q9sTUMzRKaU5FAz1b-7rDlY',
//     'Content-Type': 'application/json'
//   },
