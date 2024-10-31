import {useState} from 'react'
import LoginImg from "./assets/login-img.png"
import EyeClosed from "./assets/eyeClosed.png"
import EyeOpen from "./assets/eyeOpen.png"

function Login() {
  const [eyeOpen, setEyeOpen] = useState(false)

  const updateEye = () => {
    let eye = document.getElementById('img-eye');
    if(eyeOpen) {
      setEyeOpen(false)
      eye.src = EyeClosed
      senha.type = 'password'
    } else {
      setEyeOpen(true)
      eye.src = EyeOpen
      senha.type = 'text'
    }
  }

  const logar = () => {
    let senha = document.getElementById('senha')
    let email = document.getElementById('email')
    let a = [email.value, senha.value]
    console.log(a)
  }

  return (
    <>
      <header></header>
      <div className="box flex-row">
        <div className="half flex-column">
          <img src={LoginImg} className='img-home' />
        </div>
        <hr className='linha1'/>
        <div className="half flex-column">
          <div className='box2 flex-column'>
            <h1 className='title-uTask'>uTask 3.0</h1>
            <div className='text-div'>
              <label>E-mail:</label>
              <div className='text-input flex-row'>
                <div className='box3 flex-row'>
                  <input id='email' type='text' placeholder='Endereço de e-mail'/>
                </div>
              </div>
            </div>
            <div className='text-div'>
              <label>Senha:</label>
              <div className='text-input flex-row'>
                <div className='box3 flex-row'>
                  <div className='left'>
                    <input id='senha' type="password" placeholder='Senha secreta'/>
                  </div>
                  <div className='right flex-row'>
                    <button onClick={updateEye} className=' btn-eye flex-column'>
                      <img id='img-eye' src={EyeClosed} />
                    </button>
                  </div>
                </div>
              </div>
              <div id='esqueceu-senha'>Esqueceu a senha?</div>
            </div>
            <button id='btn1' onClick={logar}>Entrar</button>
            <div className='nao-tem-cadastro'>
              <hr className='linha2'/>
                Não tem cadastro? Crie uma conta
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login