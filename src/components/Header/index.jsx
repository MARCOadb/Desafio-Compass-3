import './header.scss'
import { WiDayCloudyGusts } from 'react-icons/wi'
import logoCompass from '../../assets/icons/Type=Colored positive 1.svg'
import arrow from '../../assets/icons/arrow-right-north 1.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { useContext, useState, useEffect } from 'react'
import api from '../../services/api'
import axios from 'axios'
import countries from '../../services/countries.json'

export default function Header() {
    const { logout } = useContext(AuthContext)

    const [time, setTime] = useState(new Date())
    const [weather, setWeather] = useState([])
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [icon, setIcon] = useState('')

    const userData = JSON.parse(localStorage.getItem('@planner'))

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, []);

    useEffect(() => {

        async function getWeatherData(city) {
            const response = await api.get('data/2.5/weather', {
                params: {
                    q: city,
                    units: 'metric',
                    appid: '338c6464bf3e79bdf9fb3ae9b743123c',
                    lang: 'pt_br'
                }
            })

            setCity(response.data.name) // <--- fui burro
            //setCity(userData.city) <--- forma mais fácil e óbvia
            setWeather(parseInt(response.data.main.temp))
            setIcon(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`)
            setCountry(getCountry(response.data.sys.country)) // <--- fui burro
            //setCountry(userData.country) <--- forma mais fácil e óbvia
        }

        getWeatherData(userData.city)
    }, [])

    function getCountry(code) {
        const countryName = countries.find(countryJSON => countryJSON.sigla === code).nome_pais
        return countryName
    }

    const formatTime = (date) => {
        const hours = date.getHours()
        const minutes = date.getMinutes()

        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
    };

    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()

        const formatedMonth = nameMonth(month)
        const formatedDay = nameDay(day)

        return `${formatedMonth} ${formatedDay}, ${year}`
    };

    function nameMonth(month) {
        let namedMonth
        switch (month) {
            case 0:
                namedMonth = 'January'
                break
            case 1:
                namedMonth = 'February'
                break
            case 2:
                namedMonth = 'March'
                break
            case 3:
                namedMonth = 'April'
                break
            case 4:
                namedMonth = 'May'
                break
            case 5:
                namedMonth = 'June'
                break
            case 6:
                namedMonth = 'July'
                break
            case 7:
                namedMonth = 'August'
                break
            case 8:
                namedMonth = 'September'
                break
            case 9:
                namedMonth = 'October'
                break
            case 10:
                namedMonth = 'November'
                break
            case 11:
                namedMonth = 'December'
                break
            default:
                return
        }
        return namedMonth
    }

    function nameDay(day) {
        let namedDay
        switch (day) {
            case 1:
                namedDay = day + 'st'
                break
            case 2:
                namedDay = day + 'nd'
                break
            case 3:
                namedDay = day + 'rd'
                break
            default:
                namedDay = day + 'th'
                break
        }
        return namedDay
    }

    async function handleLogout() {
        await logout()
    }

    return (
        <div className="header">
            <div className="banner">
                <h1>Weekly Planner</h1>
                <span>Use this planner to organize your daily issues.</span>
            </div>
            <div className="day-time">
                <h1>{formatTime(time)}</h1>
                <span>{formatDate(time)}</span>
            </div>
            <div className="wheater">
                <span>{city} - {country}</span>
                <div>
                    <img src={icon} alt="Icone do tempo" />
                    <h1>{weather}°</h1>
                </div>
            </div>
            <div className="logout">
                <Link to={'https://compass.uol/en/home/'} target="_blank">
                    <img src={logoCompass} alt="Logo Compass" />
                </Link>

                <div onClick={handleLogout}>
                    <img src={arrow} alt="Seta voltar" className='voltar' />
                    <span>Logout</span>
                </div>

            </div>
        </div>
    )
}