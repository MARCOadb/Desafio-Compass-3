import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import background from '../../assets/images/Group 5 1.png'
import { db } from '../../services/firebaseConnection'
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc
} from 'firebase/firestore'
import './tasks.scss'
import { toast } from 'react-toastify'

export default forwardRef(function Tasks(props, ref) {
    const { day } = props

    const [tasks, setTasks] = useState([])
    const [user, setUser] = useState({})


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('@planner'))
        setUser(userData)
        async function loadTarefas() {

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
                    console.log('teste som')
                    setTasks(list)
                })
            }
        }

        loadTarefas();
    }, [day])

    function formatTime(time) {
        const splitedTime = time.split(':')
        return `${splitedTime[0]}h${splitedTime[1]}m`
    }

    async function deleteTask(id) {
        const docRef = doc(db, 'tasks', id)
        await deleteDoc(docRef)
    }

    // async function deleteAll(day) {
    //     console.log('--------------')
    //     const tarefaRef = collection(db, 'tasks')
    //     const q = query(tarefaRef, where('userUid', '==', user.uid), where('dia', '==', day))
    //     const unsub = onSnapshot(q, (snapshot) => {

    //         snapshot.forEach(async (doc) => {
    //             await deleteDoc(doc.ref)
    //         })
    //     })
    //     toast.success('Tarefas do dia deletadas!')
    // }

    // useImperativeHandle(ref, () => ({
    //     deleteAll: deleteAll
    // }));

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
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>

                    </div>
                ))}
            </div>


            <img src={background} alt="Logo Compass UOL" className='logo-uol-img' />
        </div>
    )
})

//o botao de deletar tarefa individual pode ser feito aqui
// o de delete all que tem que ser feito no outro