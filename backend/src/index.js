const express = require ('express');
//const bodyParser = require('body-parser');
const morgan =require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const axios = require('axios');
const app = express(); 
const path = require('path');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());/**roda todo tipo de aplicacao
posso passar um argumento {origin: http://localhost:3000} */
app.use(express.json()); //tem que vir antes das rotas
app.use(routes);

app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use('/files',express.static(path.resolve(__dirname,"tmp","uploads")));



app.listen(3333);

// metodos http: get post put delete
// tipos de parametros
//query params: request.query (filtros, ordenação, paginação...)
//route params: request.params PUT E DELETE(identificar um recurso na alteração ou remoção)
//body: request.body (dados para criação ou alteração de um registro)