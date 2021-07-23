const Prof = require('../models/Prof');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { get } = require('../routes');
const User = require('../models/User');
//const { update } = require('../models/Prof');
//const { delete } = require('../routes');

module.exports = {
    async index(request, response){
//buscar profissionais pela profissão 
//filtrar pela especialização
//filtrar pelo sexo
    const { profissao, especialidades, sexo } = request.query;
    //recebe do insomnia e armazena nas consts
    const especialidadesArray = parseStringAsArray(especialidades);
        //console.log(request.query); vê o query pedido no insomnia
        //console.log(especialidadesArray); mostra as especialidades como array
        const profs = await Prof.find({
            especialidades:{
                $in: especialidadesArray,
                //$in é um filtro do mongo(mongo operators)
            },
            profissao:{
                $eq: profissao,
            },
            sexo:{
                $eq:sexo,
            }
        })
        return response.json({ profs });
            },

        async get(request, response){
            const {profissao}=request.params;

            const joao = await Prof.findOne({profissao});
            if(!joao){
                return response.status(204).json({message: "Não existem profissionais de "+profissao});
            }
            else{
                const foundProfs =await Prof.find({
                    profissao:{
                        $eq:profissao,
                    }
                } );
                    
                    return response.json(foundProfs);
                
            }
            },
            
        async update(request, response){
                const { email2 }=request.params;
                
                const joao = await Prof.findOne({email2});
                const joao2=Prof.find();
                if(joao2){
                    console.log(joao2.nome);
                }

                if(!joao){
                    console.log({message:"Não é possível modificar um usuário não cadastrado!"});
                    return response.status(204).json({message:"O usuário não pode ser deletado, pois ele não existe!"});
                    
                }
                else{
                    //const { nome2, email2 }=request.body;
                    const prevNome=Prof.nome;
                    const prevEmail=Prof.email;
                    const prevProfissao=Prof.profissao;

                    const updatedProf =await Prof.updateOne(
                         
                        {email:request.params.email},
                        
                        {$set:{nome:request.body.nome,
                            email:request.body.email,
                            profissao:request.body.profissao}}
                               
                        );/*
                        if(Prof.nome.$eq(null)){
                             updatedProf=await Prof.updateOne(
                                {email:request.params.email},
                                {$set:{nome:prevNome}}
                            );
                        }
                        if(Prof.email.$eq(null)){
                             updatedProf=await Prof.updateOne(
                                {email:request.params.email},
                                {$set:{email:prevEmail}}
                            );
                        }*/
                        
                        return response.json(updatedProf);

                }
                
            },

            async destroy(request, response){   //delete
                const {email2} = request.params;

                const joao = await Prof.findOne({email2});
                
                if(!joao){
                    console.log({message:"Não é possível deletar um usuário não cadastrado!"});
                    return response.status(400).json({message:"O usuário não pode ser deletado, pois ele não existe!"});
                    
                }
                else{
                  const joao2 =await  Prof.deleteOne({email:request.params.email});
                    
                  return response.json(joao2);
                }
                
            },
}
    