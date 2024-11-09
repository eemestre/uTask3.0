import LightBulb from '../assets/light-bulb.svg'
import DarkBulb from '../assets/dark-bulb.svg'
import './frase.css'

function Frase(props) {
    return(
        <>
            <div className="frase-container flex-column" style={props.darkMode ? {backgroundColor: "#3D3D3D"} : {backgroundColor: "#FFFFFF"}}>
                <div className="box3 text-container">
                    <div className='frase-title flex-row'>
                        <img className='bulb prevent-select' src={props.darkMode ? DarkBulb : LightBulb} style={{marginRight: "10px"}} />
                        <div className={props.darkMode ? "dark-text" : "light-text"}>Frase do Dia</div>
                    </div>
                    <div className={props.darkMode ? "dark-text" : "light-text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a condimentum mi, tempus blandit dui. Nam sodales ut est eu ullamcorper. In id ex accumsan, pulvinar neque sit amet, scelerisque.</div>
                </div>
            </div>
        </>
    )
}

export default Frase