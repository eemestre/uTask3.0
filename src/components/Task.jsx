import { useState } from 'react'
import OptionsLight from '../assets/options-light.svg'
import OptionsDark from '../assets/options-dark.svg'
import BtnNextLight from '../assets/btn-next-light.svg'
import BtnNextDark from '../assets/btn-next-dark.svg'
import BtnPreviousLight from '../assets/btn-previous-light.svg'
import BtnPreviousDark from '../assets/btn-previous-dark.svg'
import BtnRestartLight from '../assets/btn-restart-light.svg'
import BtnRestartDark from '../assets/btn-restart-dark.svg'
import BtnExpandMoreDark from '../assets/expand-more-dark.svg'
import BtnExpandMoreLight from '../assets/expand-more-light.svg'
import BtnExpandLessLight from '../assets/expand-less-light.svg'
import BtnExpandLessDark from '../assets/expand-less-dark.svg'
import './task.css'

function Task(props) {
  const [extended, setExtended] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)

  return (
    <>
      <div id={props.id} className={props.darkMode ? "task-dark" : "task-light"} style={extended ? {minHeight: "auto"} : {}} >
        <div className='box flex-row'>
          <div className='task-left container'>
            <div className='task-title'>{props.title}</div>
            <div className='task-text'>
              {extended
              ? (<>
                  <button onClick={() => setExtended(false)} className='flex-row btn-extend'>
                    <div style={props.darkMode ? {color: "#5C9DFF", marginRight: "10px"} : {color: "#002D6C", marginRight: "10px"} }>Esconder descrição</div>
                    <img src={props.darkMode ? BtnExpandLessDark : BtnExpandLessLight} style={{width: "11px"}} />
                  </button>
                  <div style={{marginTop: "10px"}}>{props.descr}</div>
                </>)
              : (<>
                  <button onClick={() => setExtended(true)} className='flex-row btn-extend'>
                    <div style={{marginRight: "10px"}}>Ler descrição</div>
                    <img src={props.darkMode ? BtnExpandMoreDark : BtnExpandMoreLight} style={{width: "11px"}} />
                  </button>
                </>)
              }
            </div>
          </div>
          <div className='task-right'>
            <button id='btn-options' onClick={() => optionsOpen ? setOptionsOpen(false) : setOptionsOpen(true)}>
              <img className='options-img' src={props.darkMode ? OptionsDark : OptionsLight} alt="" />
            </button>
            <div className='popup' style={optionsOpen ? {visibility: "visible"} : {visibility: "hidden"}} >
              <button id='btn-delete' className='flex-row box' >
                <img src={BtnRestartDark} />
                <div>Excluir</div>
              </button>
            </div>
            <div className='flex-row' style={{marginBottom: "15px"}}>
              {
              props.status === "todo" &&
              <button className='btn-next'>
                <img src={props.darkMode ? BtnNextDark : BtnNextLight} className='btn-arrow-img' />
              </button>
              }
              {
              props.status === "doing" &&
              <>
                <button className='btn-previous'>
                  <img src={props.darkMode ? BtnPreviousDark : BtnPreviousLight} className='btn-arrow-img' />
                </button>
                <button className='btn-next'>
                  <img src={props.darkMode ? BtnNextDark : BtnNextLight} className='btn-arrow-img' />
                </button>
              </>
              }
              {
              props.status === "done" &&
              <>
                <button className='btn-previous'>
                  <img src={props.darkMode ? BtnPreviousDark : BtnPreviousLight} className='btn-arrow-img' />
                </button>
                <button className='btn-restart'>
                  <img src={props.darkMode ? BtnRestartDark : BtnRestartLight} className='btn-arrow-img' />
                </button>
              </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Task


/*const addedUser = await res.json()
    setUsers((prevUsers) => [...prevUsers, addedUser])*/