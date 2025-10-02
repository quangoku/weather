const weatherform =document.querySelector(".weatherform")
const cityinput=document.querySelector(".cityinput")
const card = document.querySelector(".card")
const apikey= "your-key-here"


weatherform.addEventListener("submit", async event =>
{
 event.preventDefault();
 const city = cityinput.value;
 if (city)
 {
    try{
         const weatherdata = await get_weather_data(city);
         display(weatherdata);
    }
    catch (error)
    {
        console.log(error);
        display_error(error);
    }
 }
 else {
    display_error("PLS ENTER A CITY")
 }
})
async function get_weather_data(city)
{
   const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
   const response = await fetch(apiurl);
   if(!response.ok)
   {
    throw new Error("could not fetch data")
   }
  return await response.json();
}

function display(data)
{
    const {name : city,
           main :{temp,humidity,},
           weather:[{description,id}]
    }=data;
    card.textContent="";
    card.style.display="flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const emojidisplay = document.createElement("p");

    citydisplay.textContent=city;
    citydisplay.classList.add(".city_display");
    card.appendChild(citydisplay);

    
    tempdisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    tempdisplay.classList.add("temp_display");
    card.appendChild(tempdisplay);


    humiditydisplay.textContent=`Humidity : ${humidity}%`;
    humiditydisplay.classList.add("humidity_display");
    card.appendChild(humiditydisplay);

       
     descdisplay.textContent=`${description}`;
     descdisplay.classList.add("desc_display");
     card.appendChild(descdisplay);

     emojidisplay.textContent=get_weather_emoji(id);
     emojidisplay.classList.add("emoji_display");
     card.appendChild(emojidisplay);
    
}
function get_weather_emoji(weather_id)
{
  switch (true)
  {
    case (weather_id >= 200 && weather_id <300):
        return "🌩️"
    case (weather_id >= 300 && weather_id <400):
        return "🌧️"
    case (weather_id >= 500 && weather_id <600):
        return "🌧️"
    case (weather_id >= 600 && weather_id <700):
        return "❄️"
    case (weather_id >= 200 && weather_id <300):
        return "🍃"
    case (weather_id === 800):
        return "☀️"
    case (weather_id >= 801 && weather_id <810):
        return "☁️" 
    default:
        return "❓"
  }
}
function display_error(message)
{
const error = document.createElement("p")
error.textContent=message
error.classList.add("error_display")
 
 card.textContent=""
 card.appendChild(error); 
 card.style.display="flex"

}
