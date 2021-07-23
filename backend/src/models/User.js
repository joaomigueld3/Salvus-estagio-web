const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome : {
       type: String,
      // require: true,
    },
    email : {
     type:  String,
    //unique:true,
    //required: true,
    //lowercase:true,
    },
    celular: {
        type: Number,
     //   required: true,
    },
    sexo: {
        type:String,
    },
    senha: {
        type: String,
      //  required: true,
      //  select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },

    //dataNascimento: 14/09/1996
    //receber imagem
    
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha=hash;
    next();
});

    module.exports = mongoose.model('User', UserSchema);