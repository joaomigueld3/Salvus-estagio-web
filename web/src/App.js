import React, { Component, useState, useEffect } from 'react';
import './App.css';
import './global.css';
import './Sidebar.css';
import './Main.css';
import './services/api';
import api from './services/api';

import ProfItem from './components/ProfItem';
import { render } from '@testing-library/react';
import Dropzone from 'react-dropzone';
import {DropContainer, UploadMessage, Container, Content} from './Upload/styles.js';
import Upload from './Upload';
import 'react-circular-progressbar/dist/styles.css'; //para usar o css do progress bar em mais lugares
import FileList from './FileList';
import {uniqueId} from 'lodash';
import filesize from 'filesize';
// Componente: função que retorna um html,css ou JS. Não afeta o layout, nem os anuncios, nem o chat.
//      ex: time line do FB, cada um dos posts é um componente. ex: App, sempre maiúsculo
//      um componente por arquivo, sempre que usar html dentro do JS importar o react
//      componente é um bloco isolado de HTML, CSS e JS, o qual não interfe no resto da aplicação

// Estado: Informações mantidas pela componente (Lembrar: imutabilidade)

// Propriedade: informações que um componente PAI passa para o componente FILHO
//      não precisa ser apenas string, pode ser variável, func ...(objetos ?)

//import Header from './Header';

/*function App2() {      //html dentro do javaScript
  const [counter, setCounter] = useState(1); //pode ser var

  function incrementCounter(){//como é uma funcao do componente, fica dentro do mesmo
  
     setCounter(counter +1);
     
  }
  
  return (
  <div>
     <h1>Contador: {counter}</h1>
     <button onClick = {incrementCounter} >IncreaseHealth</button>

    </div>
  //por critérios de organização, div pode ser apagado
  );
  
}
*/

/*strong=negrito
se for usar uma classe usar className, pois class é palavra reservada
similarmente: hmtlFor, for é reservada.
*/
/*<br/> (break) quebra de linha*/
/*<ul/> unordered list, <li/> list item*/
/*className= "user-info, significa que estou criando a class user-info, que vai guardas as infos do user*/
function App(){
  //em caso de querer utilizar coordenadas, rever useEffect
  const [profs, setProfs]=useState([]);

  const [nomeUsuario,setNomeUsuario]=useState('');
  const [senha,setSenha]=useState('');
  const [dataNascimento,setDataNascimento]=useState('');
  const [nome, setNome]= useState('');
  const [email, setEmail]= useState('');
  const [celular, setCelular]= useState('');
  const [sexo, setSexo]=useState('');
  const [profissao, setProfissao]=useState('');
  const [numeroRegistro,setNumeroRegistro]=useState('');
  const [especialidades, setEspecialidades]=useState('');
  const [bio, setBio]=useState('');

  
  /* state = {
   uploadedFiles:[],
 };
*/
    /**busca dos profs na api, array vazio para executar apenas uma vez */
    /*2 parametros(funcao,[var]), executa sempre que var tiver seu valor alterado */
    useEffect(() => {
      /*async function loadProfs(){
        const response = await api.get('./profs');
        /**criar um novo estado para poder mostrar os profs em tela */

/*        setProfs(response.data);
      }   
      loadProfs();/*chama depois de executar o useEffect*/
    },[]);

    useEffect(() => {

      
      //loadProfsProfissao();/*chama depois de executar o useEffect*/
    },[]);


  async function handleAddProf(e){ /* função disparada quando o 
    usuário clicar em submit 'e' é o evento, vulgo o que é recebido do usuário
    */
    e.preventDefault();/*o comportamento padrão é redirecionar para outra pagina*/
    /*chamdada api pra adiciona o prof a listagem*/  
    const response = await api.post('./profs',{
      nomeUsuario,
      senha,
      dataNascimento,
      numeroRegistro,

      nome,
      email,
      celular,
      sexo,
      profissao,
      especialidades,
      bio,
    })
    /*console.log(response.data);/**aparece no inspecionar elemento */

    /**deixar os campos vazios depois do cadastro */
    setNomeUsuario('');
    setSenha('');
    setDataNascimento('');
    setNumeroRegistro('');

    setNome('');
    setProfissao('');
    setSexo('');
    setBio('');
    setEmail('');
    setCelular('');
    setEspecialidades('');

    setProfs([...profs,response.data]);
  }


  async function loadProfissao(prNutri){
    const response = await api.get('./profs/'+prNutri);
    /**criar um novo estado para poder mostrar os profs em tela */
    setProfs(response.data)
    //setProfsProfissao(response.data);
  }

  async function handleMedico(e){
    e.preventDefault();
    //console.log(e.target.value)
    const medico="Médico";
    loadProfissao(medico);
  }

  async function handleEnfermeiro(e){
  e.preventDefault();
  const enfermeiro = "Enfermeiro";
  loadProfissao(enfermeiro);
  }
  async function handleFonoaudiologia(e){
    e.preventDefault();
    const fonoaudiologia="Fonoaudiologia";
    loadProfissao(fonoaudiologia);
}
  async function handleTecEnfermagem(e){
  e.preventDefault();
  const tecEnfermagem="Técnico de enfermagem";
  loadProfissao(tecEnfermagem);
}

 function handleUpload (files){
const uploadedFiles = files.map(file => ({
  file,
  id: uniqueId(),
  name: file.name,
  readableSize: filesize(file.size),
  preview: URL.createObjectURL(file),
  progress: 0,      
  uploaded: false, //estado inicial
  error: false,     //estado inicial
  url: null,      //pro user clicar e chegar ao link da img
}))
this.setState({
  uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
});

};
/*const {uploadedFiles} = this.state;*/
function getSelectedValue(){
  var selectedValue=document.getElementById("list").value;
  return selectedValue;
}
  return (
    <div id ="app">
      
<aside>
<strong>Cadastrar</strong>   
<form onSubmit ={handleAddProf}>
  <div >
    <label>Dados Cadastrais</label>
  </div>

  <div className="input-block">
    <label htmlFor="nomeUsuario"> Nome de Usuário</label>
    <input 
  name = "nomeUsuario" 
  id="nomeUsuario" 
  required 
  value = {nomeUsuario}
  onChange = {e => setNomeUsuario(e.target.value)} 
  />
  </div>

  <div className = "input-block">
  <label htmlFor = "email"> Email </label>
  <input 
  name = "email" 
  id="email" 
  required 
  value = {email}
  onChange = {e => setEmail(e.target.value)}
  />
  </div>

  <div className="input-block">
    <label htmlFor="senha"> Senha</label>
    <input type="password"
  name = "senha" 
  id="senha" 
  required 
  
  value = {senha}
  onChange = {e => setSenha(e.target.value)} 
  />
  </div>

  <div >
    <label>Dados Pessoais</label>
  </div>
  
  <div className = "input-block">
  <label htmlFor = "nome"> Nome </label>
  <input 
  name = "nome" 
  id="nome" 
  required 
  value = {nome}
  onChange = {e => setNome(e.target.value)} 
  />
  </div>
  
  <div className ="input-block">
    <label htmlFor="dataNascimento"> Data de Nascimento</label>
    <input type="date"
    name="dataNascimento"
    id="dataNascimento"
    required
    value={dataNascimento}
    onChange ={e=>setDataNascimento(e.target.value)}
    />
  </div>
  

  <div className = "input-block">
  <label htmlFor = "celular"> Celular </label>
  <input type="number" name = "celular" id="celular" required
  value = {celular}
  onChange = {e => setCelular(e.target.value)} 
  />
  </div>

  <div className = "input-block">
  <label htmlFor = "sexo"> Sexo </label>
  <input name = "sexo" id="sexo" required
  value = {sexo}
  onChange = {e => setSexo(e.target.value)}
  />
  </div>

  <div className = "input-block">
  <label htmlFor = "profissao"> Profissão </label>
  <select id="list" name="profissao" value={profissao} onChange = {e => setProfissao(e.target.value)}
    required>
    <option >Selecione uma profissão</option>
    <option value="Médico">Médico</option>
    <option value="Enfermeiro">Enfermeiro</option>
    <option value="Fonoaudiologia">Fonoaudiologia</option>
    <option value="Técnico de enfermagem">Técnico de enfermagem</option>
  </select>
  
  
  
  </div>

  <div className = "input-block">
  <label htmlFor = "numeroRegistro"> Número de Registro </label>
  <input type="number" name = "numeroRegistro" id="numeroRegistro" required 
  value = {numeroRegistro}
  onChange = {e => setNumeroRegistro(e.target.value)}
  />
  </div>


  <div className = "input-block">
  <label htmlFor = "especialidades"> Especialidades </label>
  <input name = "especialidades" id="especialidades" required 
  value = {especialidades}
  onChange = {e => setEspecialidades(e.target.value)}
  />
  </div>


  <div className = "input-block">
  <label htmlFor = "bio"> Bio </label>
  <input name = "bio" id="bio" required 
  value = {bio}
  onChange = {e => setBio(e.target.value)}
  />
  </div>


  
  <div>
    <button type= "submit"> Salvar</button>
      </div>
    </form>
  </aside>

  <main>
    <div className = "search-form">
      <form >
    <strong>Qual profissional de saúde você precisa?</strong>
  {/*<input name="searchBox" value={searchProf}
  onChange = {e =>setSearchProf(e.target.value)}>
  </input>*/}
  <div >
    <ul className="button-list">
      <li > <button onClick={handleMedico} type="submit">Médico</button> </li>
      <li > <button onClick={handleEnfermeiro} type="submit">Enfermeiro</button> </li>
      <li > <button onClick={handleFonoaudiologia} type="submit">Fonoaudiologia</button> </li>
      <li > <button onClick={handleTecEnfermagem} type="submit">Técnico de Enfermagem</button> </li>

    </ul>
</div>
  </form>
    </div>
 
  
  

  <ul>
      {profs.map(prof => (  /**dentro de {} é o corpo da função
      de () é o retorno */
        <ProfItem key={prof._id} prof = {prof} />
      ))}
    </ul>

   

  </main>

    </div>

  );
}
export default App;

