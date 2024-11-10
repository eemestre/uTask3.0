import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import CadastroImg from "../assets/images/cadastro-img.png"
import EyeClosed from "../assets/eyeClosed.svg"
import EyeOpen from "../assets/eyeOpen.svg"
import Tick from "../assets/tick.svg"
import './login-register.css'

const url = "http://localhost:3000/cadastros"

function Cadastro() {
  const [eyeOpen1, setEyeOpen1] = useState(false)
  const [eyeOpen2, setEyeOpen2] = useState(false)
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmaSenha, setConfirmaSenha] = useState("")
  const [tentou, setTentou] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailUsado, setEmailUsado] = useState(false)

  const { data:users, httpConfig} = useFetch(url)
  const navigate = useNavigate()

  document.body.style.backgroundColor = "#FAFAFA";

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const cadastrar = async (e) => {
    setTentou(true)
    if(nome === "") {
      return
    }
    if(email === "") {
      return
    }
    if(senha === "") {
      return
    }
    if(senha != confirmaSenha) {
      return
    }
    const u = users.filter((u) => u.email === email)
    if(u.length > 0) {
      setEmailUsado(true)
      return
    }
    
    setLoading(true)

    const user = {
      "nome": nome,
      "email": email,
      "senha": senha,
      "darkMode": false,
      "currentTaskId": 0,
      "tasks": [
        {
          "id": 0,
          "title": "Sua primeira task!",
          "descr": "A task mais legal e importante de todas! B)",
          "status": "todo"
        }
      ]
    }

    httpConfig(user, "POST")
    await timeout(3000);
    navigate("/")
  }

  return (
    <>
      <div className='redirecionando flex-column' style={loading ? {display: "flex"} : {display: "none"}}>
        <div className='cadastro-sucesso flex-column'>
          <div className='box flex-column'>
            <div>
              <div className='flex-row'>
                <img className='prevent-select' src={Tick} style={{width: "35px", height: "auto"}}/>
                <div style={{fontSize: "32px", fontWeight: "bold", marginLeft: "7px"}}>
                  Conta criada com sucesso!
                </div>
              </div>
            </div>
            <div style={{fontSize: "20px"}}>
              Um instante, iremos te redirecionar ao login!
            </div>
          </div>
        </div>
      </div>
      <header></header>
      <div className="box flex-row">
        <div className="half flex-column">
          <div className='box2 flex-column'>
            <h1 className='title-uTask'>uTask 3.0</h1>
            <h2 className='crie-uma-conta'>Crie uma conta</h2>
            <div className='text-div'>
              <label htmlFor ='nome'>Nome de usuário:</label>
              <div className='input-box flex-row' style={nome === "" && tentou? {border: "2px solid #820000", backgroundColor: "#FFE5E5"} : {border: "2px solid #002D6C"}}>
                <div className='box3 flex-row'>
                  <input value={nome} name='nome' className='text-input' type='text' placeholder='Seu nome de usuário' onChange={(e) => setNome(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className='text-div'>
              <label htmlFor ='email'>E-mail:</label>
              <div className='input-box flex-row' style={email === "" && tentou || emailUsado ? {border: "2px solid #820000", backgroundColor: "#FFE5E5"} : {border: "2px solid #002D6C"}}>
                <div className='box3 flex-row'>
                  <input value={email} name='email' className='text-input' type='text' placeholder='Endereço de e-mail' onChange={(e) => setEmail(e.target.value) & setEmailUsado(false)}/>
                </div>
              </div>
              <div style={emailUsado ? {display: "block", fontSize: "12px", color: "#820000"} : {display: "none"}}>Esse e-mail já esta em uso.</div>
            </div>
            <div className='text-div'>
              <label htmlFor ='senha'>Senha:</label>
              <div className='input-box flex-row' style={senha === "" && tentou ? {border: "2px solid #820000", backgroundColor: "#FFE5E5"} : {border: "2px solid #002D6C"}}>
                <div className='box3 flex-row'>
                  <div className='left'>
                    <input value={senha} name='senha' className='text-input' type={eyeOpen1 ? "text" : "password"} placeholder='Senha secreta' onChange={(e) => setSenha(e.target.value)}/>
                  </div>
                  <div className='right flex-row'>
                    <button className='btn-eye flex-column' onClick={() => setEyeOpen1(eyeOpen1 ? false : true)}>
                      <img className='img-eye' src={eyeOpen1 ? EyeOpen : EyeClosed} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-div'>
              <label htmlFor ='confirma-senha'>Confirme a senha:</label>
              <div className='input-box flex-row' style={senha != confirmaSenha ? {border: "2px solid #820000", backgroundColor: "#FFE5E5"} : {border: "2px solid #002D6C"}}>
                <div className='box3 flex-row'>
                  <div className='left'>
                    <input value={confirmaSenha} name='confirma-senha' className='text-input' type={eyeOpen2 ? "text" : "password"} placeholder='Senha secreta' onChange={(e) => setConfirmaSenha(e.target.value)}/>
                  </div>
                  <div className='right flex-row'>
                    <button className='btn-eye flex-column' onClick={() => setEyeOpen2(eyeOpen2 ? false : true)}>
                      <img className='img-eye' src={eyeOpen2 ? EyeOpen : EyeClosed} />
                    </button>
                  </div>
                </div>
              </div>
              <div style={senha != confirmaSenha ? {display: "block", fontSize: "12px", color: "#820000"} : {display: "none"}}>Senhas não combinam, tente novamente.</div>
            </div>
            <button id='btn1' onClick={cadastrar}>Criar Cadastro</button>
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