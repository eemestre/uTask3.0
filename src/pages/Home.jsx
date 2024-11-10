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
import BtnCloseLigth from '../assets/btn-close-light.svg'
import BtnCloseDark from '../assets/btn-close-dark.svg'
import './home.css'

function Home() {
    const { id } = useParams()
    const url = "http://localhost:3000/cadastros/" + id
    const { data:user, httpConfig } = useFetch(url)
    const [addTaskOpen, setAddTaskOpen] = useState(false)
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescr, setTaskDescr] = useState("")

    useEffect(() => {
        if(user && user.darkMode) {
            document.body.style.backgroundColor = "#222222";
        } else {
            document.body.style.backgroundColor = "#FAFAFA";
        }
    }, [user && user.darkMode])

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

    const handleDelete = (id) => {
        const tasks = user.tasks.filter((t) => t.id !== id);
        const update = {
        "tasks": tasks
        }
        httpConfig(update, "PATCH")
    }

    const handleChangeStatus = (id, newStatus) => {
        let changedTask = user.tasks.filter((t) => t.id === id);
        changedTask[0].status = newStatus
        console.log(changedTask)
        const otherTasks = user.tasks.filter((t) => t.id !== id);
        const updatedTasks = [...otherTasks, ...changedTask]
        const update = {
            "tasks": updatedTasks
        }
        httpConfig(update, "PATCH")
    }

    const addTask = () => {
        if(taskTitle === "") return

        let newId = user.currentTaskId + 1

        const newTask = {
            "id": newId,
            "title": taskTitle,
            "descr": taskDescr,
            "status": "todo"
        }
        
        const newTasks = [...user.tasks, newTask]
        
        const update = {
            "currentTaskId": newId,
            "tasks": newTasks
        }
        
        httpConfig(update, "PATCH")
        setTaskTitle("")
        setTaskDescr("")
        setAddTaskOpen(false)
    }

    if(user) return (
        <>
            <div className='add-task-popup flex-column' style={addTaskOpen ? {display: "flex"} : {display: "none"}}>
                <div id='add-task-form' className='flex-column' style={user.darkMode ? {backgroundColor: "#3D3D3D"} : {backgroundColor: "#FFFFFF"}}>
                    <div className='box-task-form'>
                        <div className='nova-task-title flex-column' style={user.darkMode ? {color: "#226ED8"} : {color: "#3867D6"}}>
                            <div>Nova Task</div>
                            <hr className='linha-nova-task' />
                        </div>
                        <button id='btn-close-add-task' className='prevent-select' onClick={() => {setAddTaskOpen(false)}}>
                            <img src={user.darkMode ? BtnCloseDark : BtnCloseLigth} style={{width: "40px"}}/>
                        </button>
                        <div className='text-div' style={user.darkMode ? {color: "#FFFFFF"} : {color: "#000000"}}>
                            <label htmlFor="title">Título *</label>
                            <div className='input-box-add-task-title flex-row'  style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                                <div className='box3 flex-row'>
                                    <input name="title" value={taskTitle} className='text-input' type='text' placeholder='Digite o Título...' style={user.darkMode ? {color: "#FFFFFF"} : {color: "#000000"}} onChange={(e) => setTaskTitle(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='text-div' style={user.darkMode ? {color: "#FFFFFF"} : {color: "#000000"}}>
                            <label htmlFor="descr">Descrição</label>
                            <div className='input-box-add-task-descr flex-row' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                                <div className='box3 flex-row'>
                                    <textarea name="descr" value={taskDescr} placeholder='Digite a Descrição...' style={user.darkMode ? {color: "#FFFFFF"} : {color: "#000000"}} onChange={(e) => {setTaskDescr(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <button id='btn-create-task' className='prevent-select' style={taskTitle === "" ? {cursor: "not-allowed"} : {cursor: "pointer"}} onClick={addTask}>Criar task</button>
                    </div>
                </div>
            </div>
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
                        <button onClick={() => setAddTaskOpen(true)} id='btn-add-task' className='prevent-select'>
                            <img src={AddTask} style={{width: "42px"}} />
                        </button>
                    </div>
                    <div className='widget' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                        {user && (user.tasks.filter((t) => t.status === "todo")).map((t) => (
                            <Task {...t} handleDelete={handleDelete} handleChangeStatus={handleChangeStatus} darkMode={user.darkMode} />
                        ))}
                    </div>
                </div>
                <div id='andamento' className='widget-container'>
                    <div className={user.darkMode ? "dark-text kanban-title" : "light-text kanban-title"}>Em andamento</div>
                    <div className='widget' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                        {user && (user.tasks.filter((t) => t.status === "doing")).map((t) => (
                            <Task {...t} handleDelete={handleDelete} handleChangeStatus={handleChangeStatus} darkMode={user.darkMode} />
                        ))}
                    </div>
                </div>
                <div id='feito' className='widget-container'>
                    <div className={user.darkMode ? "dark-text kanban-title" : "light-text kanban-title"}>Feito</div>
                    <div className='widget' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                        {user && (user.tasks.filter((t) => t.status === "done")).map((t) => (
                            <Task {...t} handleDelete={handleDelete} handleChangeStatus={handleChangeStatus} darkMode={user.darkMode} />
                        ))}
                    </div>
                </div>
            </div>
            <footer>
                <div>Processo treinee</div>
                <div>feito com amor por Mestre</div>
            </footer>
        </>
    )
}

export default Home