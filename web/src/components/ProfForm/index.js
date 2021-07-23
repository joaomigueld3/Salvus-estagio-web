/*import React,{useState} from 'react';



function ProfForm(){

const [profs, setProfs]=useState([]);

  const [lattes_link, setLattes_link]=useState('');
  const [nome, setNome]= useState('');
  const [email, setEmail]= useState('');
  const [celular, setCelular]= useState('');
  const [sexo, setSexo]=useState('');
  const [profissao, setProfissao]=useState('');
  const [especialidades, setEspecialidades]=useState('');
  const [bio, setBio]=useState('');

    return(
    
    <form onSubmit ={handleAddProf}>
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

  <div className = "input-block">
  <label htmlFor = "celular"> Celular </label>
  <input name = "celular" id="celular" required
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
  <input name = "profissao" id="profissao" required 
  value = {profissao}
  onChange = {e => setProfissao(e.target.value)}
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
  <label htmlFor = "lattes_link"> Link do Lattes </label>
  <input name = "lattes_link" id="lattes_link" required 
  value = {lattes_link}
  onChange = {e => setLattes_link(e.target.value)}
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
);
}
export default ProfForm;*/