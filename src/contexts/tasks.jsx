import { createContext } from "react";

export const TasksContext = createContext({})

export default function TasksProvider({ children }) {
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}

/* PRECISO DE:

    -a array tasks
    -a variável 'day', passada nas props
    -com isso, faz o map e pode acessar
        task.id task.hora 

*/