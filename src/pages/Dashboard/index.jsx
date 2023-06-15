import { AuthContext } from '../../contexts/auth'
import { useContext } from 'react'
import Header from '../../components/Header'
import './dashboard.scss'

export default function Dashboard() {

    return (
        <div>
            <Header />
            <div className='planner'>
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}
