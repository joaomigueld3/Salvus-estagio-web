const User = require('../models/User');
var mongo = require ('mongodb');
const { db } = require('../models/User');
const { get } = require('mongoose');
module.exports ={
    async index(request,response){
        const {sexo}=request.query;

        const users = await User.find({
            sexo:{
                $eq:sexo,
                //$in é um filtro do mongo(mongo operators)

            }
        })
    return response.json({users});
    },
    async get(request,response){
        const {email}=request.params;
        const joao = await User.findOne({email});
        
        if(!joao){
            return response.status(204).json({message: "Usuário não existe"});
        }
        else{
            console.log(joao);
            return response.json(joao);
        }
    },
    
            async update(request, response){
                const { email2 }=request.params;
                
                const joao = await User.findOne({email2});

                if(!joao){
                    console.log({message:"Não é possível deletar um usuário não cadastrado!"});
                    return response.status(204).json({message:"O usuário não pode ser deletado, pois ele não existe!"});
                    
                }
                else{
                    //const { nome2, email2 }=request.body;
                    
                     const updatedUser =await User.updateOne(
                        {email:request.params.email}, 
                        {$set:{nome:request.body.nome,email:request.body.email}}
                        );
                        
                        return response.json(updatedUser);

                }
                
            },

            async destroy(request, response){   //delete
                const {email2} = request.params;

                const joao = await User.findOne({email2});
                
                if(!joao){
                    console.log({message:"Não é possível deletar um usuário não cadastrado!"});
                    return response.status(400).json({message:"O usuário não pode ser deletado, pois ele não existe!"});
                    
                }
                else{
                  const joao2 =await  User.deleteOne({email:request.params.email});
                    
                  return response.json(joao2);
                }
                
            },
}