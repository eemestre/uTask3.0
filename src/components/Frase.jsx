import { useFetch } from '../hooks/useFetch'
import { useState, useEffect } from 'react'
import MediaQuery from 'react-responsive'
import LightBulb from '../assets/light-bulb.svg'
import DarkBulb from '../assets/dark-bulb.svg'
import BtnCloseLigth from '../assets/btn-close-light.svg'
import BtnCloseDark from '../assets/btn-close-dark.svg'
import './frase.css'

const adviceUrl = "https://api.adviceslip.com/advice"

function Frase(props) {
    const [frase, setFrase] = useState("Recebendo a mensagem de hoje...")
    const [fraseOpen, setFraseOpen] = useState(false)
    const { data:phrase } = useFetch(adviceUrl)
    const translateUrl = `https://api.mymemory.translated.net/get?q=${phrase && phrase.slip.advice}!&langpair=en|pt`
    const { data:f } = useFetch(translateUrl)
    
    useEffect(() => {
        if(f && f.responseData.translatedText != "zero") setFrase(f.responseData.translatedText)
    }, [f])

    const openPhrase = () => {
        if(fraseOpen) setFraseOpen(false)
        else setFraseOpen(true)
    } 

    return(
        <>
            <MediaQuery maxWidth={1019}>
                <div className='phrase-popup flex-column' style={fraseOpen ? {display: "flex"} : {display: "none"}}>
                    <div className='frase-container' style={props.darkMode ? {backgroundColor: "#3D3D3D"} : {backgroundColor: "#FFFFFF"}}>
                        <div className='frase-title flex-row'>
                            <div className="flex-start" style={{width: "92%"}}>
                                <img className='bulb prevent-select' src={props.darkMode ? DarkBulb : LightBulb} style={{marginRight: "10px"}} />
                                <div className={props.darkMode ? "dark-text" : "light-text"}>Frase do Dia</div>
                            </div>
                            <div className='flex-end' style={{width: "8%"}}>
                                <button id='btn-close-frase' className='prevent-select' onClick={() => {setFraseOpen(false)}}>
                                    <img src={props.darkMode ? BtnCloseDark : BtnCloseLigth} style={{width: "25px"}}/>
                                </button>
                            </div>
                        </div>
                        <div id='phrase-div' className={props.darkMode ? "frase-dark-text" : "frase-light-text"}>{frase}</div>
                    </div>
                </div>
                <button className='btn-frase' style={props.darkMode ? {backgroundColor: "#3D3D3D"} : {backgroundColor: "#FFFFFF"}} onClick={openPhrase}>
                    <div className="box3 text-container">
                        <div className='frase-title flex-row'>
                            <img className='bulb prevent-select' src={props.darkMode ? DarkBulb : LightBulb} style={{marginRight: "10px"}} />
                            <div className={props.darkMode ? "dark-text" : "light-text"}>Frase do Dia</div>
                        </div>
                    </div>
                </button>
            </MediaQuery>
            <MediaQuery minWidth={1020}>
                <div className="frase-container flex-column" style={props.darkMode ? {backgroundColor: "#3D3D3D"} : {backgroundColor: "#FFFFFF"}}>
                    <div className="box3 text-container">
                        <div className='frase-title flex-row'>
                            <img className='bulb prevent-select' src={props.darkMode ? DarkBulb : LightBulb} style={{marginRight: "10px"}} />
                            <div className={props.darkMode ? "dark-text" : "light-text"}>Frase do Dia</div>
                        </div>
                        <div id='phrase-div' className={props.darkMode ? "frase-dark-text" : "frase-light-text"}>{frase}</div>
                    </div>
                </div>
            </MediaQuery>
        </>
    )
}

export default Frase