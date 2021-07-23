import React from 'react';

import './styles.css';

function ProfItem(props){
    const{ prof}=props;
    
    return(
        <li  className = 'prof-item'>
        <header>
       
          <div className="user-info"> 
            <strong> {prof.nome}</strong>
            <h1>{prof.profissao}</h1>
            <span> {prof.especialidades.join(',')}</span>          
            </div>
        </header>
        <p>{prof.bio}</p>
       
        
      </li>
    );
}

export default ProfItem;