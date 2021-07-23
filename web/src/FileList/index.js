import React from 'react';
import {CircularProgressbar}  from 'react-circular-progressbar';
import {MdCheckCircle, MdError, MdLink} from 'react-icons/md'
import App from '../App'
import {Container, FileInfo, Preview} from './styles';

const FileList =({files}) => (
    <Container>
    {files.map(uploadedFile =>(
        <li>
        <FileInfo>
          <Preview src={ uploadedFile.preview}/>
      <div>
    <strong>{uploadedFile.name}</strong>
    <span>{uploadedFile.readableSize}  <button onClick={ () => {}}>Excluir</button>   </span>
      </div>
        </FileInfo>
  
      <div>
          {!uploadedFile.uploaded && !uploadedFile.error && (
               <CircularProgressbar
               styles={{
                   root:{width: 24},
                   path:{stroke: '#065343'}  //cor verde
               }}
               strokeWidth ={10}//largura da progressbar
               value={uploadedFile.progress}// pode ser percentage ou value de 0 a 100
               />
          )}
          {uploadedFile.url &&(
               <a href="https://uploadimagenshealth.s3.amazonaws.com/b12a804b4b3e77f2baf0029b0691e2e4-joao%20discord.jpg"
               target="_blank"//abrir o link em nova aba
               rel="noopener noreferrer"
               >
                    <MdLink style = {{ marginRight: 8}} size={24} color ="#222"/>
          </a>
          )}

        {uploadedFile.uploaded && <MdCheckCircle size={24} color="#065343"/>}
        {uploadedFile.error && <MdError size={24} color="#e57878"/>}
             
          </div>
          </li>
    )) }
    </Container>
);

export default FileList;