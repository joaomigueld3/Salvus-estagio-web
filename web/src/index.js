import React from 'react';  //existe em todas as aplicações
import ReactDOM from 'react-dom'; //no HTML o react se comunica à árvore de elementos
import './index.css';             //ReactNative pra mobile, ReactTV pra TV
import App from './App';
import Dropzone from 'react-dropzone';

ReactDOM.render(  
    <App />, document.getElementById('root')
  /*<React.StrictMode></React.StrictMode>,*/
  
);  //<App /> JSX = JavaScript + XML

