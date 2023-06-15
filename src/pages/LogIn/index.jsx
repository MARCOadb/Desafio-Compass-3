import './login.scss'
import inicialImage from '../../assets/images/inicial_img.png'
import user from '../../assets/icons/icon-user.svg'
import lock from '../../assets/icons//icon-password.svg'
import compassLogo from '../../assets/icons/Type=Colored negative.png'
import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../contexts/auth'
import Modal from '../../components/Modal'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

export default function LogIn() {
    const [name, setName] = useState('') //tá como nome, mas vai ser trabalhado sempre como email
    const [password, setPassword] = useState('')
    const [desUser, setDesUser] = useState(0)
    const [desLock, setDesLock] = useState(0)

    const { LogIn, emailError, passwordError, openModal, setOpenModal, loadingAuth } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)

    async function handleLogIn(e) {
        e.preventDefault()

        if (name !== '' && password !== '') {
            await LogIn(name, password)
        } else {
            toast.error('Todos os campos devem ser preenchidos!')
        }
    }

    function handleFocusUser() {
        setDesUser(-60)
    }

    function handleFocusLock() {
        setDesLock(-60)
    }

    function handleBlurUser() {
        if (name === '') {
            setDesUser(0);
        }
    }

    function handleBlurLock() {
        if (password === '') {
            setDesLock(0);
        }
    }

    return (
        <div className='content'>
            {openModal && (
                <Modal />
            )}
            <div className="form-container">
                <div className="form-content">
                    <h1>Welcome,</h1>
                    <span>To continue browsing safely, log in to the <br /> network.</span>

                    <h2>Login</h2>
                    <form onSubmit={handleLogIn}>
                        <div className='input-container'>
                            <input
                                type="text"
                                name='name'
                                placeholder='user name'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                onFocus={handleFocusUser}
                                onBlur={handleBlurUser}
                                style={{ border: `1px solid ${emailError ? '#E9B425' : '#fff'}` }}
                            />
                            <img
                                src={user}
                                alt="Icon"
                                className='icon-user'
                                style={{ transform: `translateX(${desUser}px)` }}
                            />
                        </div>
                        <div className='input-container'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                onFocus={handleFocusLock}
                                onBlur={handleBlurLock}
                                style={{ border: `1px solid ${passwordError ? '#E9B425' : '#fff'}` }}
                            />
                            {!showPassword ? (
                                <BsEye size={20} onClick={() => setShowPassword(true)} />
                            ) : (
                                <BsEyeSlash size={20} onClick={() => setShowPassword(false)} />
                            )}
                            <img
                                src={lock}
                                alt="Icon"
                                className='icon-lock'
                                style={{ transform: `translateX(${desLock}px)` }}
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn-login'>
                            {loadingAuth ? 'Carregando...' : 'Log in'}
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