import {useState} from 'react'
import CadastroImg from "./assets/cadastro-img.png"
import EyeClosed from "./assets/eyeClosed.png"
import EyeOpen from "./assets/eyeOpen.png"

function Cadastro() { 
  const [eyeOpen1, setEyeOpen1] = useState(false)
  const [eyeOpen2, setEyeOpen2] = useState(false)

  const updateEye1 = () => {
    let eye = document.getElementById('img-eye1')
    let senha = document.getElementById('senha')
    if(eyeOpen1) {
      setEyeOpen1(false)
      eye.src = EyeClosed
      senha.type = 'password'
    } else {
      setEyeOpen1(true)
      eye.src = EyeOpen
      senha.type = 'text'
    }
  }

  const updateEye2 = () => {
    let eye = document.getElementById('img-eye2')
    let senha = document.getElementById('confirma-senha')
    if(eyeOpen2) {
      setEyeOpen2(false)
      eye.src = EyeClosed
      senha.type = 'password'
    } else {
      setEyeOpen2(true)
      eye.src = EyeOpen
      senha.type = 'text'
    }
  }

  const cadastrar = () => {
    let senha = document.getElementById('senha')
    let confimaSenha = document.getElementById('confirma-senha')
    let nome = document.getElementById('nome')
    let email = document.getElementById('email')
    let a = [nome.value, email.value, senha.value, confimaSenha.value]
    console.log(a)
  }

  return (
    <>
      <header></header>
      <div className="box flex-row">
        <div className="half flex-column">
          <div className='box2 flex-column'>
            <h1 className='title-uTask'>uTask 3.0</h1>
            <h2 className='crie-uma-conta'>Crie uma conta</h2>
            <div className='text-div'>
              <label>Nome:</label>
              <div className='text-input flex-row'>
                <div className='box3 flex-row'>
                  <input id='nome' type='text' placeholder='Seu nome de usuário'/>
                </div>
              </div>
            </div>
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
                    <button className='btn-eye flex-column' onClick={updateEye1}>
                      <img id='img-eye1' src={EyeClosed} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-div'>
              <label>Confirme a senha:</label>
              <div className='text-input flex-row'>
                <div className='box3 flex-row'>
                  <div className='left'>
                    <input id='confirma-senha' type="password" placeholder='Senha secreta'/>
                  </div>
                  <div className='right flex-row'>
                    <button className='btn-eye flex-column' onClick={updateEye2}>
                      <img id='img-eye2' src={EyeClosed} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button id='btn1' onClick={cadastrar}>Entrar</button>
          </div>
        </div>
        <hr className='linha1'/>
        <div className="half flex-column">
          <img src={CadastroImg} className='img-home' />
        </div>
      </div>
    </>
  )
}

export default Cadastro