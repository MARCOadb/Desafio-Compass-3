import './modal.scss'
import { FaUserSlash } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { useContext } from 'react'

export default function Modal() {
    const { setOpenModal } = useContext(AuthContext)

    return (
        <div className="background">
            <div className="modal">
                <div className="topbar"></div>
                <h1>Usuário não encontrado!</h1>
                <GrClose size={25} className='close' onClick={() => setOpenModal(false)} />
                <FaUserSlash size={200} className='user' />
                <Link to={'/register'}>Crie uma conta!</Link>
            </div>
        </div>
    )
}