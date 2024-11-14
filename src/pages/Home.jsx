import { useFetch } from '../hooks/useFetch'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import Frase from '../components/Frase'
import Kanban from '../components/Kanban'
import KanbanPequeno from '../components/KanbanPequeno'
import LogoUnectWhite from '../assets/logo-unect-branca.svg'
import LogoUnectBlue from '../assets/logo-unect-azul.svg'
import BtnLightMode from '../assets/btn-light-mode.svg'
import BtnDarkMode from '../assets/btn-dark-mode.svg'
import BtnCloseLigth from '../assets/btn-close-light.svg'
import BtnCloseDark from '../assets/btn-close-dark.svg'
import Heart from '../assets/favorite.svg'
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
                            <img src={user.darkMode ? BtnCloseDark : BtnCloseLigth} style={{width: "30px"}}/>
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
            <div className='frase-box' style={{marginTop: "75px"}}>
                <Frase darkMode={user.darkMode}/>
            </div>

            <MediaQuery maxWidth={1019}>
                <KanbanPequeno user={user} setAddTaskOpen={setAddTaskOpen} handleDelete={handleDelete} handleChangeStatus={handleChangeStatus}></KanbanPequeno>
            </MediaQuery>

            <MediaQuery minWidth={1020}>
                <Kanban user={user} setAddTaskOpen={setAddTaskOpen} handleDelete={handleDelete} handleChangeStatus={handleChangeStatus}></Kanban>
            </MediaQuery>

            <footer className="dark-text" style={user.darkMode ? {backgroundColor: "#111111"} : {backgroundColor: "#114FA7"}}>
                <div className='box-footer'>
                    <div className='footer-text'>
                        <p>© Processo de Trainee <a href="https://unect.com.br" target="_blank" rel="noopener noreferrer" style={{fontWeight: "bold", color: "#FAFAFA", textDecoration: "none"}}>Unect Jr.</a></p>
                    </div>
                    <div className='footer-text'>
                        <div>Feito com</div>
                        <img src={Heart} style={{width: "16px", margin: "5px"}}/>
                        <p>por <a href="https://www.linkedin.com/in/eemestre/" target="_blank" rel="noopener noreferrer" style={{fontWeight: "bold", color: "#FAFAFA", textDecoration: "none"}}>Mestre</a></p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Home