const Prof = require('../models/Prof'); //como tava tudo dentro da models eu iniciava a procura lá, agora ta tudo em src
const parseStringAsArray = require('../utils/parseStringAsArray');
const axios = require('axios');
const cheerio = require('cheerio');

// index: listar, show: mostrar um único, store: criar um dev
// update: editar, destroy: deletar


module.exports = {

    async index(request, response){
        const profs = await Prof.find();
        
        return response.json(profs);
    },

async store(request, response) {        //async deixou de ser uma arrow function e firou uma name (store) function


    const{ nomeUsuario,email,senha, nome, dataNascimento, celular, sexo,profissao, numeroRegistro, bio, especialidades} = request.body;
    //console.log(request.body);

    const danyel  = await Prof.findOne({email}); // eu poderia usar let prof, pois let pode ser sobreposta
    if(!danyel){

        const especialidadesArray = parseStringAsArray(especialidades);


    //const especialidadesArray = especialidades.split(',').map(tech => tech.trim());
    //map percorre um array e faz algo, nesse caso o trim(), que remove espaçoes antes e depois da string
        

     prof = await Prof.create({
        nomeUsuario,
        email,
        senha,
        nome,
        dataNascimento,
        celular,
        sexo,
        profissao,
        numeroRegistro,
        especialidades: especialidadesArray,
        bio,
    })
   //console.log(request.body);
    return response.json(prof);
    //json retorna um objeto, nesse caso uma message^
    } /**fim if */
    else{
        mensagem: String,
        mensagem = "ERRO, email já cadastrado!",
        console.log(mensagem);
        return response.json({message:"email já cadastrado!"});
    }
}
};