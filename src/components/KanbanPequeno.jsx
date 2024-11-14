import { useState } from 'react'
import Task from './Task'
import AddTask from '../assets/add-task.svg'
import Next from '../assets/navigate_next.svg'
import Previous from '../assets/navigate_before.svg'
import Active from '../assets/active.svg'
import EmptyDark from '../assets/empty-dark.svg'
import EmptyLight from '../assets/empty-light.svg'

function KanbanPequeno({user, setAddTaskOpen, handleDelete, handleChangeStatus}) {
    const [current, setCurrent] = useState(0)

    function handleNext() {
        if(current === 2) return
        else setCurrent(current+1)
    }

    function handlePrevious() {
        if(current === 0) return
        else setCurrent(current-1)
    }

    return (
        <>
            <div className='kanban-container flex-row'>
                <button id='btn-previous' className='btn-change' style={{marginRight: "20px"}}>
                    <img src={Previous} onClick={handlePrevious} style={{width: "15px"}} />
                </button>
                <div className='flex-column carrossel'>
                    <div id='fazer' className='widget-container' style={current === 0 ? {display: "block"} : {display: "none"}}>
                        <div className={user.darkMode ? "dark-text kanban-title" : "light-text kanban-title"}>
                            <div>A fazer</div>
                            <button onClick={() => setAddTaskOpen(true)} id='btn-add-task' className='prevent-select'>
                                <img src={AddTask} style={{width: "30px"}} />
                            </button>
                        </div>
                        <div className='widget' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                            {user && (user.tasks.filter((t) => t.status === "todo")).map((t) => (
                                <Task {...t} handleDelete={handleDelete} handleChangeStatus={handleChangeStatus} darkMode={user.darkMode} />
                            ))}
                        </div>
                    </div>
                    <div id='andamento' className='widget-container' style={current === 1 ? {display: "block"} : {display: "none"}}>
                        <div className={user.darkMode ? "dark-text kanban-title" : "light-text kanban-title"}>Em andamento</div>
                        <div className='widget' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                            {user && (user.tasks.filter((t) => t.status === "doing")).map((t) => (
                                <Task {...t} handleDelete={handleDelete} handleChangeStatus={handleChangeStatus} darkMode={user.darkMode} />
                            ))}
                        </div>
                    </div>
                    <div id='feito' className='widget-container' style={current === 2 ? {display: "block"} : {display: "none"}}>
                        <div className={user.darkMode ? "dark-text kanban-title" : "light-text kanban-title"}>Feito</div>
                        <div className='widget' style={user.darkMode ? {backgroundColor: "#333333"} : {backgroundColor: "#EEEEEE"}}>
                            {user && (user.tasks.filter((t) => t.status === "done")).map((t) => (
                                <Task {...t} handleDelete={handleDelete} handleChangeStatus={handleChangeStatus} darkMode={user.darkMode} />
                            ))}
                        </div>
                    </div>
                    <div id='selector'>
                        <button id='btn-fazer' className='btn-change' onClick={() => setCurrent(0)}>
                            <img src={current === 0 ? Active : (user.darkMode ? EmptyDark : EmptyLight)} />
                        </button>
                        <button id='bnt-andamento' className='btn-change' onClick={() => setCurrent(1)}>
                            <img src={current === 1 ? Active : (user.darkMode ? EmptyDark : EmptyLight)} />
                        </button>
                        <button id='bnt-feito' className='btn-change' onClick={() => setCurrent(2)}>
                            <img src={current === 2 ? Active : (user.darkMode ? EmptyDark : EmptyLight)} />
                        </button>
                    </div>
                </div>
                <button id='btn-next' className='btn-change' style={{marginLeft: "20px"}}>
                    <img src={Next} onClick={handleNext} style={{width: "15px"}} />
                </button>
            </div>
        </>
    )
}

export default KanbanPequeno