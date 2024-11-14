import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
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
import BtnDeleteLight from '../assets/delete-outline-light.svg'
import BtnDeleteDark from '../assets/delete-outline-dark.svg'
import './task.css'

function Task(props) {
  const [extended, setExtended] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)

  return (
    <>
      <div id={props.id} className={props.darkMode ? "task-dark" : "task-light"} style={{minHeight: "auto"}} >
        <div className='box flex-row'>
          <div className='task-left container'>
            <div className='task-title' style={props.status === "done" ? {textDecoration: "line-through"} : {textDecoration: "none"}}>{props.title}</div>
            <div className='task-text'>
              {extended
              ? (<>
                  <button onClick={() => setExtended(false)} className='btn-extend'>
                    <div className='extend-descr-text' style={props.darkMode ? {color: "#5C9DFF"} : {color: "#002D6C"} }>Esconder descrição</div>
                    <img src={props.darkMode ? BtnExpandLessDark : BtnExpandLessLight} style={{width: "10px"}} />
                  </button>
                  <div style={{marginTop: "10px", minHeight: "27px"}}>{props.descr}</div>
                </>)
              : (<>
                  <button onClick={() => setExtended(true) & setOptionsOpen(false)} className='btn-extend'>
                    <div className='extend-descr-text'>Ler descrição</div>
                    <img src={props.darkMode ? BtnExpandMoreDark : BtnExpandMoreLight} style={{width: "10px"}} />
                  </button>
                </>)
              }
            </div>
          </div>
          <div className='task-right'>
            <button id='btn-options' onClick={() => optionsOpen ? setOptionsOpen(false) : setOptionsOpen(true) & setExtended(false)}>
              <img className='options-img' src={props.darkMode ? OptionsDark : OptionsLight} />
            </button>
            <div className='popup prevent-select' style={optionsOpen ? {visibility: "visible"} : {visibility: "hidden"}} >
              <button id='btn-delete' className='flex-row box' style={props.darkMode ? {backgroundColor: "#535353"} : {backgroundColor: "#FFFFFF"}} onClick={() => setOptionsOpen(false) & props.handleDelete(props.id)} >
                <img src={props.darkMode ? BtnDeleteDark : BtnDeleteLight} style={{width: "13px", marginRight: "5px"}} />
                <div style={props.darkMode ? {color: "#FFAFAF"} : {color: "#DF0000"}}>Excluir</div>
              </button>
            </div>
            <div className='flex-row' style={{marginBottom: "15px"}}>
              {
              props.status === "todo" &&
              <button className='btn-next' onClick={() => props.handleChangeStatus(props.id, "doing")}>
                <img src={props.darkMode ? BtnNextDark : BtnNextLight} className='btn-arrow-img' />
              </button>
              }
              {
              props.status === "doing" &&
              <>
                <button className='btn-previous' onClick={() => props.handleChangeStatus(props.id, "todo")}>
                  <img src={props.darkMode ? BtnPreviousDark : BtnPreviousLight} className='btn-arrow-img' />
                </button>
                <button className='btn-next' onClick={() => props.handleChangeStatus(props.id, "done")}>
                  <img src={props.darkMode ? BtnNextDark : BtnNextLight} className='btn-arrow-img' />
                </button>
              </>
              }
              {
              props.status === "done" &&
              <>
                <button className='btn-previous' onClick={() => props.handleChangeStatus(props.id, "doing")}>
                  <img src={props.darkMode ? BtnPreviousDark : BtnPreviousLight} className='btn-arrow-img' />
                </button>
                <button className='btn-restart' onClick={() => props.handleChangeStatus(props.id, "todo")}>
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