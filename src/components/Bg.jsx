import React from "react";
import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import linkIcon from "../assets/link.svg";
import searchIcon from "../assets/search.svg";
import MyLocationIcon from '@mui/icons-material/MyLocation';

function Bg() {
    const [city, setCity] = useState("");
    const [data, setData] = useState({});
    const [longitude, setLon] = useState(null);
    const [latitude, setLat] = useState(null);
    const [lang, setLang] = useState(true);
    // console.log(city);
    const [errorMsg,setErrorMsg]=useState(null)

    // useEffect(() => {
    //     // if (navigator.geolocation) {
    //     //     navigator.geolocation.getCurrentPosition(success, error);
    //     // } else {
    //     //     alert("Geolocation is not supported by this browser.");
    //     // }

    //     function success(position) {
    //         console.log(position.coords.latitude, position.coords.longitude);
    //         setLat(position.coords.latitude);
    //         setLon(position.coords.longitude);
    //         if (latitude && longitude) GetGeoLocationData();
    //     }

    //     function error() {
    //         getCityWeatherData();
    //     }
    // }, [latitude, longitude]);
    // const GetGeoLocationData = () => {
    //     console.log("click hua");
    //         if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(success, error);
    //         setLat(position.coords.latitude);
    //         setLon(position.coords.longitude);
    //     } else {
    //         alert("Geolocation is not supported by this browser.");
    //     }
    //     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((result) => setData(result));
    // };

useEffect(()=>{
    fetch("https://ipwhois.app/json/")
    .then(response => response.json())
    .then(data => {
    //   console.log("Latitude:", data.latitude);
    //   console.log("Longitude:", data.longitude);
    //   console.log("City:", data.city);
    //   console.log("Country:", data.country_name);
      getGeoData(data.latitude,data.longitude)
    })
    .catch(error => console.error("Error fetching location:", error));
  
},[])

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
          setData(result);
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
            //   console.log(data)
              if(data.cod=="404"){
                  setData({})
                  setErrorMsg(data.message)
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
    // if(Object.keys(data).length==0)return ""
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
                    <div className="my_location" onClick={handleBtnLatLng}>
                    <MyLocationIcon />
                    </div>
                </div>
                {/* <div className="location-button">

                    <MyLocationIcon className="my_location" onClick={handleBtnLatLng}/>
                </div> */}
            </div>
                <p className="error-msg">{errorMsg?errorMsg:""}</p>
            {Object.keys(data).length > 0 ? <WeatherCard sys={data.sys} weatherData={data.main} weather={data.weather} city={data.name} lang={lang} windData={data.wind} /> : ""}
        

            {/* <p onClick={() => setLang(!lang)} className="translater">
                {lang ? "Hindi ?" : "Eng ?"}
            </p> */}
        </div>
        </>
        
    );
}

export default Bg;
