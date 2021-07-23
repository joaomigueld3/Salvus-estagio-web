const User = require('../models/User');


module.exports ={
    async index(request, response){
        const users = await User.find();
        
        return response.json(users);
    },
    
    async store(request, response){

        const{nome, email, celular, sexo,senha}=request.body;

        const joao = await User.findOne({email});

        //se o findOne retornar false, cria o User(objeto,entidade)
        if(!joao){

            user = await User.create({
                nome, 
                email,
                celular,
                sexo,
                senha,
            })
            console.log(request.body);
            return response.json(user);
        }
        else{
            
            mensagemErro = "Erro, email já cadastrado!";
            console.log(mensagemErro);
            return response.json({message:"email já cadastrado!"});

        }
        
    }
};
