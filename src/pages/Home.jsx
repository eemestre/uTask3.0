import { useFetch } from '../hooks/useFetch'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Frase from '../components/Frase'
import Task from '../components/Task'
import LogoUnectWhite from '../assets/logo-unect-branca.svg'
import LogoUnectBlue from '../assets/logo-unect-azul.svg'
import BtnLightMode from '../assets/btn-light-mode.svg'
import BtnDarkMode from '../assets/btn-dark-mode.svg'
import AddTask from '../assets/add-task.svg'
import './home.css'

function Home() {
    const { id } = useParams()
    const url = "http://localhost:3000/cadastros/" + id
    const { data:user, httpConfig } = useFetch(url)

    useEffect(() => {
        if(user && user.darkMode) {
            document.body.style.backgroundColor = "#222222";
        } else {
            document.body.style.backgroundColor = "#FAFAFA";
        }
    }, [user])

    const changeTheme = () => {
        let update
        if(user.darkMode) {
            update = {
                "darkMode": false
            }
        } else {
            update = {
                "darkMode": true
            }
        } 
        httpConfig(update, "PATCH")
    }

    const addTask = () => {
        console.log("add task")
    }

    if(user) return (
        <>
            <div className='header flex-column' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#226ED8"}}>
                <div className='box flex-spaced'>
                    <img className='logo-unect prevent-select' src={user.darkMode ? LogoUnectBlue : LogoUnectWhite}/>
                    <h1 style={user.darkMode ? {color: "#3867D6"} : {color: "#FAFAFA"}}>uTask 3.0</h1>
                    <button id='btn-mode' onClick={changeTheme} className='flex-row prevent-select'>
                        <img src={user.darkMode ? BtnDarkMode : BtnLightMode} style={{height: "30px"}}/>
                    </button>
                </div>
            </div>
            <div className='box' style={{marginTop: "50px"}}>
                <Frase darkMode={user.darkMode}/>
            </div>
            <div className='kanban-container flex-spaced'>
                <div id='fazer' className='widget-container'>
                    <div className={user.darkMode ? "dark-text kanban-title" : "light-text kanban-title"}>
                        <div>A fazer</div>
                        <button onClick={addTask} id='btn-add-task' className='prevent-select'>
                            <img src={AddTask} style={{width: "42px"}} />
                        </button>
                    </div>
                    <div className='widget' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                        {user && (user.tasks.filter((t) => t.status === "todo")).map((t) => (
                            <Task {...t} darkMode={user.darkMode} />
                        ))}
                    </div>
                </div>
                <div id='andamento' className='widget-container'>
                    <div className={user.darkMode ? "dark-text kanban-title" : "light-text kanban-title"}>Em andamento</div>
                    <div className='widget' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                        {user && (user.tasks.filter((t) => t.status === "doing")).map((t) => (
                            <Task {...t} darkMode={user.darkMode} />
                        ))}
                    </div>
                </div>
                <div id='feito' className='widget-container'>
                    <div className={user.darkMode ? "dark-text kanban-title" : "light-text kanban-title"}>Feito</div>
                    <div className='widget' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                        {user && (user.tasks.filter((t) => t.status === "done")).map((t) => (
                            <Task {...t} darkMode={user.darkMode} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home