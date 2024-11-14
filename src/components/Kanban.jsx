import Task from './Task'
import AddTask from '../assets/add-task.svg'

function Kanban({user, setAddTaskOpen, handleDelete, handleChangeStatus}) {
    return (
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
    )
}

export default Kanban