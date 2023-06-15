import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            const storageUser = localStorage.getItem('@planner')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }

        loadUser()
    }, [])

    // Logar no usuário
    async function LogIn(email, password) {
        setLoadingAuth(true)
        setPasswordError(false)
        setEmailError(false)

        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid

                const docRef = doc(db, 'users', uid)
                const docSnap = await getDoc(docRef)

                let data = {
                    uid: uid,
                    firstName: docSnap.data().firstName,
                    lastName: docSnap.data().lastName,
                    birthDate: docSnap.data().birthDate,
                    country: docSnap.data().country,
                    city: docSnap.data().city,
                    email: value.user.email
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success('Bem-vindo(a) de volta!')
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error)
                switch (error.code) {
                    case 'auth/invalid-email':
                        setEmailError(true)
                        toast.error('E-mail inválido!')
                        break
                    case 'auth/user-not-found':
                        setOpenModal(true)
                        setEmailError(true)
                        break
                    case 'auth/wrong-password':
                        toast.error('Senha incorreta!')
                        setPasswordError(true)
                        setEmailError(true)
                        break
                }
                setLoadingAuth(false)
            })

    }

    // Cadastrar novo usuário
    async function SignUp(firstName, lastName, birthDate, country, city, email, password, confirmPass) {
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid

                await setDoc(doc(db, 'users', uid), {
                    firstName: firstName,
                    lastName: lastName,
                    birthDate: birthDate,
                    country: country,
                    city: city
                })
                    .then(() => {
                        toast.success('Usuário cadastrado com Sucesso!')
                        let data = {
                            uid: uid,
                            firstName: firstName,
                            lastName: lastName,
                            birthDate: birthDate,
                            country: country,
                            city: city,
                            email: value.user.email
                        }

                        storageUser(data)
                        setUser(data)
                        setEmailError(false)
                        setOpenModal(false)
                        navigate('/')
                        loadingAuth(false)
                    })
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error('E-mail já cadastrado!')
                        setEmailError(true)
                        break
                    case 'auth/invalid-email':
                        setEmailError(true)
                        toast.error('E-mail inválido!')
                        break
                }
                setLoadingAuth(false)
            })
    }

    function storageUser(data) {
        localStorage.setItem('@planner', JSON.stringify(data))
    }


    // Sair do usuário
    async function logout() {
        await signOut(auth)
        localStorage.removeItem('@planner')
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                LogIn,
                SignUp,
                loadingAuth,
                emailError,
                setEmailError,
                passwordError,
                setPasswordError,
                openModal,
                setOpenModal,
                loading,
                logout
            }}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider