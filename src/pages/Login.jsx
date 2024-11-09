import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { Link, useNavigate } from 'react-router-dom'
import LoginImg from "../assets/images/login-img.png"
import EyeClosed from "../assets/eyeClosed.svg"
import EyeOpen from "../assets/eyeOpen.svg"
import './login-register.css'

const url = "http://localhost:3000/cadastros"

function Login() {
  const [eyeOpen, setEyeOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [senhaCorreta, setSenhaCorreta] = useState(true)

  const { data:users } = useFetch(url)
  const navigate = useNavigate()

  document.body.style.backgroundColor = "#FAFAFA";

  const logar = () => {
    //search email
    const u = users.filter((u) => u.email === email)

    if(u.length > 0 && u[0].senha === senha) {
      navigate("home/"+u[0].id)
    } else {
      setSenhaCorreta(false)
    }
  }

  return (
    <>
      <header/>
      <div className="box flex-row">
        <div className="half flex-column">
          <img src={LoginImg} className='img-home' />
        </div>
        <hr className='linha1'/>
        <div className="half flex-column">
          <div className='box2 flex-column'>
            <h1 className='title-uTask'>uTask 3.0</h1>
            <div className='text-div'>
              <label htmlFor ='email'>E-mail:</label>
              <div className='input-box flex-row'>
                <div className='box3 flex-row'>
                  <input value={email} name='email' className='text-input' type='text' placeholder='Endereço de e-mail' onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className='text-div'>
              <label htmlFor ='senha'>Senha:</label>
              <div className='input-box flex-row' style={!senhaCorreta ? {border: "2px solid #820000", backgroundColor: "#FFE5E5"} : {border: "2px solid #002D6C"}}>
                <div className='box3 flex-row'>
                  <div className='left'>
                    <input value={senha} name='senha' className='text-input' type={eyeOpen ? 'text' : 'password'} placeholder='Senha secreta' onChange={(e) => setSenha(e.target.value) & setSenhaCorreta(true)}/>
                  </div>
                  <div className='right flex-row'>
                    <button onClick={() => setEyeOpen(eyeOpen ? false : true)} className='btn-eye flex-column'>
                      <img class='img-eye' src={eyeOpen ? EyeOpen : EyeClosed} />
                    </button>
                  </div>
                </div>
              </div>
              <div style={!senhaCorreta ? {display: "block", fontSize: "12px", color: "#820000"} : {display: "none"}}>Senha incorreta, tente novamente..</div>
              <div id='esqueceu-senha'>Esqueceu a senha?</div>
            </div>
            <button id='btn1' onClick={logar}>Entrar</button>
            <div>
              <hr className='linha2'/>
              <Link className='nao-tem-cadastro' to="/cadastro">Não tem cadastro? Crie uma conta</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login