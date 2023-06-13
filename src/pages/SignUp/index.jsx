import './signup.scss'
import inicialImage from '../../assets/images/inicial_img.png'
import compassLogo from '../../assets/icons/Type=Colored negative.png'

export default function SignUp() {
    return (
        <div className="content">
            <div className="form-container">
                <div className="form-content">
                    <h1>Welcome,</h1>
                    <p>Please, register to continue</p>

                    <form>
                        <div className='input-container-2'>
                            <label>first name</label>
                            <input type="text" placeholder='Your first name' />
                        </div>

                        <div className='input-container-2'>
                            <label>last name</label>
                            <input type="text" placeholder='Your last name' />
                        </div>

                        <div className='input-container-2'>
                            <label>birth date</label>
                            <input type="date" placeholder='MM/DD/YYYY' />
                        </div>

                        <div className='input-container-2'>
                            <label>Country</label>
                            <input type="text" placeholder='Your Country' />
                        </div>

                        <div className='input-container-2'>
                            <label>City</label>
                            <input type="text" placeholder='Your City' />

                        </div>

                        <div className='input-container-2'>
                            <label>e-mail</label>
                            <input type="email" placeholder='A valid e-mail here' />
                        </div>

                        <div className='input-container-2'>
                            <label>password</label>
                            <input type="password" placeholder='Your password' />
                        </div>

                        <div className='input-container-2'>
                            <label>password</label>
                            <input type="password" placeholder='Confirm your password' />
                        </div>

                        <button type='submit' className='btn-register'>Register Now</button>
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