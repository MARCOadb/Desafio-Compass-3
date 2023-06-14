import './signup.scss'
import inicialImage from '../../assets/images/inicial_img.png'
import compassLogo from '../../assets/icons/Type=Colored negative.png'
import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from '../../contexts/auth'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

export default function SignUp() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [ageError, setAgeError] = useState(false)

    const { SignUp, loadingAuth, emailError, setEmailError } = useContext(AuthContext)

    setEmailError(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setConfirmPasswordError(false)

        if (
            firstName !== '' &&
            lastName !== '' &&
            birthDate !== '' &&
            country !== '' &&
            city !== '' &&
            email !== '' &&
            password !== '' &&
            confirmPass !== ''
        ) {
            if (testAge(birthDate)) {
                setAgeError(false)
                if (validPassword(password)) {
                    setPasswordError(false)
                    if (password === confirmPass) {
                        setFirstName(capitalize(firstName))
                        setLastName(capitalize(lastName))
                        setCountry(capitalize(country))
                        setCity(capitalize(city))
                        await SignUp(firstName, lastName, birthDate, country, city, email, password, confirmPass)
                    } else {
                        toast.error('As senhas são diferentes!')
                        setConfirmPass('')
                        setPasswordError(false)
                        setConfirmPasswordError(true)
                    }
                } else {
                    toast.error('A senha deve ter 6 caracteres, um caractere especial, um número e uma letra maíuscula')
                    setPassword('')
                    setConfirmPass('')
                    setPasswordError(true)
                }
            } else {
                toast.error('Você precisa ter 18 anos para criar uma conta!')
                setAgeError(true)
                setBirthDate('')
            }
        } else {
            toast.error('Todos os campos devem ser preenchidos!')
        }
    }

    function capitalize(palavra) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    }

    function validPassword(senha) {
        const regex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{8,}$/;
        setPasswordError(false)
        return regex.test(senha);
    }

    function testAge(birthDate) {
        const todayDate = new Date();
        const data = new Date(birthDate);

        const anosDiferenca = todayDate.getFullYear() - data.getFullYear();
        const mesesDiferenca = todayDate.getMonth() - data.getMonth();
        const diasDiferenca = todayDate.getDate() - data.getDate();

        if (anosDiferenca > 18) {
            return true;
        } else if (anosDiferenca === 18) {
            if (mesesDiferenca > 0) {
                return true;
            } else if (mesesDiferenca === 0 && diasDiferenca >= 0) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className="content">
            <div className="form-container">
                <div className="form-content">
                    <h1>Welcome,</h1>
                    <p>Please, register to continue</p>

                    <form onSubmit={handleSubmit}>
                        <div className='input-container-2'>
                            <label>first name</label>
                            <input
                                type="text"
                                placeholder='Your first name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className='input-container-2'>
                            <label>last name</label>
                            <input
                                type="text"
                                placeholder='Your last name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className='input-container-2'>
                            <label>birth date</label>
                            <input
                                type="date"
                                placeholder='MM/DD/YYYY'
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                style={{ border: `1px solid ${ageError ? '#E9B425' : '#fff'}` }}
                            />
                        </div>

                        <div className='input-container-2'>
                            <label>Country</label>
                            <input
                                type="text"
                                placeholder='Your Country'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>

                        <div className='input-container-2'>
                            <label>City</label>
                            <input
                                type="text"
                                placeholder='Your City'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className='input-container-2'>
                            <label>e-mail</label>
                            <input
                                type="text"
                                name='email'
                                placeholder='A valid e-mail here'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ border: `1px solid ${emailError ? '#E9B425' : '#fff'}` }}
                            />
                        </div>

                        <div className='input-container-2'>
                            <label>password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ border: `1px solid ${passwordError ? '#E9B425' : '#fff'}` }}
                            />
                            {!showPassword ? (
                                <BsEye size={20} onClick={() => setShowPassword(true)} />
                            ) : (
                                <BsEyeSlash size={20} onClick={() => setShowPassword(false)} />
                            )}
                        </div>

                        <div className='input-container-2'>
                            <label>password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password-confirm'
                                placeholder='Confirm your password'
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                style={{ border: `1px solid ${confirmPasswordError ? '#E9B425' : '#fff'}` }}
                            />
                        </div>

                        <button type='submit' className='btn-register'>
                            {loadingAuth ? 'Loading...' : 'Register Now'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="img-container">
                <img src={compassLogo} alt="Logo Compass" className='logo-img' />
                <img src={inicialImage} alt="Computador" className='pc-img' />
            </div>
        </div>
    )
}