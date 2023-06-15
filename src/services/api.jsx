import axios from "axios";
//key = 338c6464bf3e79bdf9fb3ae9b743123c
//base da URL = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}

const api = axios.create({
    baseURL: 'https://api.openweathermap.org'
})

export default api