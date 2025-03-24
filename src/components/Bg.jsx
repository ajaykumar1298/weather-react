import React from "react";
import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import searchIcon from "/assets/search.svg";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ClipLoader from "react-spinners/ClipLoader";

function Bg() {
    const [city, setCity] = useState("");
    const [data, setData] = useState({});
    const [lang, setLang] = useState(true);
    const [errorMsg,setErrorMsg]=useState(null)
    let [onload,setOnload]=useState(true)
    let color=window.innerWidth<768?"#fff":"#331744";
    let loading=true


useEffect(()=>{
  geoDataFromIp()
  
},[])

const geoDataFromIp=()=>{
  fetch("https://ipwhois.app/json/")
  .then(response => response.json())
  .then(data => {
    getGeoData(data.latitude,data.longitude)
  })
  .catch(error => console.error("Error fetching location:", error));
}

const getGeoData=async(latitude,longitude)=>{
    try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
        );
        const result = await res.json();

        if (result.cod === "404") {
          setData({});
          setErrorMsg("City not found.");
        } else {
          if(onload){
            setTimeout(() => {
              setOnload(false)
              setData(result);
            }, 500);
          }else{

            setData(result);
          }
          setErrorMsg(""); // Clear error on successful fetch
        }
      } catch (e) {
        setErrorMsg("There is some issue.");
      }
}

    const handleBtnLatLng = async () => {
        // setData({})
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              getGeoData(latitude,longitude)
              
            },
            (error) => {
            //   console.error("Error getting location:", error);
              setErrorMsg("Failed to get location.");
            }
          );
        } else {
            setErrorMsg("Not supported by this browser.");
        }
      };

    const getCityWeatherData =async () => {
        if(!city.trim())return "" 
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
            try {
              let data=  await fetch(url)
              data=await data.json()

              if(data.cod=="404"){
                  setData({})
                  setErrorMsg("City Not Found")
                }else{
                    setData(data)
                    setErrorMsg(null)
                }
            } catch (e) {
                // console.log("error")
                setErrorMsg("City Not Found")
                
            } 
        setCity("");
    };

    //   GetWeatherData({ city, setData });
    // console.log(Object.keys(data).length > 0);
    if(Object.keys(data).length==0 && !errorMsg){
      return (
<div className="loader-container">
  <ClipLoader color={color} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"  cssOverride={{
        borderWidth: "5px", 
      }} />
</div>

      )
    }
    return (
        <>
        <div className="box">
            <div className="cityName">
                {Object.keys(data).length > 0 && (
                    <p>
                        {data.name}, {data.sys.country}
                    </p>
                )}
                <div>
                </div>
                <div className="search">
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City Name" onKeyDown={(e)=>{
                        e.key=="Enter" && getCityWeatherData()
                    }}/>
                    <img className="search-icon" style={{ cursor: "pointer" }} src={searchIcon} alt="searchIcon" onClick={getCityWeatherData} />
                    <div className="my_location" onClick={geoDataFromIp}>
                    <MyLocationIcon />
                    </div>
                </div>
            </div>
                <p className="error-msg">{errorMsg?errorMsg:""}</p>
            {Object.keys(data).length > 0 ? <WeatherCard sys={data.sys} weatherData={data.main} weather={data.weather} city={data.name} lang={lang} windData={data.wind} /> : ""}

        </div>
        </>
        
    );
}

export default Bg;
