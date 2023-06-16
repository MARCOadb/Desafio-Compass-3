import { useState, useEffect } from 'react'
import background from '../../assets/images/Group 5 1.png'
import { db } from '../../services/firebaseConnection'
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    where
} from 'firebase/firestore'
import './tasks.scss'

export default function Tasks(props) {
    const { day } = props

    const [tasks, setTasks] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadTarefas() {
            const userData = JSON.parse(localStorage.getItem('@planner'))
            setUser(userData)

            if (userData) {
                const tarefaRef = collection(db, 'tasks')
                const q = query(tarefaRef, orderBy('hora', 'asc'), where('userUid', '==', userData?.uid), where('dia', '==', day))
                const unsub = onSnapshot(q, (snapshot) => {
                    let list = []

                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            dia: doc.data().dia,
                            hora: doc.data().hora,
                            userUid: doc.data().userUid
                        })
                    })
                    setTasks(list)
                })
            }
        }

        loadTarefas()
    }, [day])

    function formatTime(time) {
        const splitedTime = time.split(':')
        return `${splitedTime[0]}h${splitedTime[1]}m`
    }


    return (
        <div className='content-dashboard'>
            <div className="time">Time</div>
            <div className="tasks-container">
                {tasks.map((task) => (
                    <div className="task-line" key={task.id}>
                        <div className={`task-time  ${day.toLowerCase()}`}>
                            {formatTime(task.hora)}
                        </div>
                        <div className="task-info">
                            <div className={`sidebar ${day.toLowerCase()}`}></div>
                            <span>{task.tarefa}</span>
                            <button>Delete</button>
                        </div>

                    </div>
                ))}
            </div>


            <img src={background} alt="Logo Compass UOL" className='logo-uol-img' />
            {/* <h1>Componente TASKS {day}</h1> */}
        </div>
    )
}