import './login.scss'
import inicialImage from '../../assets/images/inicial_img.png'
import user from '../../assets/icons/icon-user.svg'
import lock from '../../assets/icons//icon-password.svg'
import compassLogo from '../../assets/icons/Type=Colored negative.png'
import { useState } from 'react'

export default function LogIn() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [desUser, setDesUser] = useState(0)
    const [desLock, setDesLock] = useState(0)

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
        <div className="content">
            <div className="form-container">
                <div className="form-content">
                    <h1>Welcome,</h1>
                    <span>To continue browsing safely, log in to the <br /> network.</span>

                    <h2>Login</h2>
                    <form>
                        <div className='input-container'>
                            <input
                                type="text"
                                // name='name'
                                placeholder='user name'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                onFocus={handleFocusUser}
                                onBlur={handleBlurUser}
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
                                type="password"
                                name='password'
                                placeholder='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                onFocus={handleFocusLock}
                                onBlur={handleBlurLock}
                            />
                            <img
                                src={lock}
                                alt="Icon"
                                className='icon-lock'
                                style={{ transform: `translateX(${desLock}px)` }}
                            />
                        </div>
                        <button type='submit' className='btn-login'>Log in</button>
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