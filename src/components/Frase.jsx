import { useFetch } from '../hooks/useFetch'
import { useState, useEffect } from 'react'
import LightBulb from '../assets/light-bulb.svg'
import DarkBulb from '../assets/dark-bulb.svg'
import './frase.css'

const adviceUrl = "https://api.adviceslip.com/advice"

function Frase(props) {
    const [frase, setFrase] = useState("Recebendo a mensagem de hoje...")
    const { data:phrase } = useFetch(adviceUrl)
    const translateUrl = `https://api.mymemory.translated.net/get?q=${phrase && phrase.slip.advice}!&langpair=en|pt`
    const { data:f } = useFetch(translateUrl)
    
    useEffect(() => {
        if(f && f.responseData.translatedText != "zero") setFrase(f.responseData.translatedText)
    }, [f])


    return(
        <>
            <div className="frase-container flex-column" style={props.darkMode ? {backgroundColor: "#3D3D3D"} : {backgroundColor: "#FFFFFF"}}>
                <div className="box3 text-container">
                    <div className='frase-title flex-row'>
                        <img className='bulb prevent-select' src={props.darkMode ? DarkBulb : LightBulb} style={{marginRight: "10px"}} />
                        <div className={props.darkMode ? "dark-text" : "light-text"}>Frase do Dia</div>
                    </div>
                    <div id='phrase-div' className={props.darkMode ? "frase-dark-text" : "frase-light-text"}>{frase}</div>
                </div>
            </div>
        </>
    )
}

export default Frase