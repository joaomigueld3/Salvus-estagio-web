const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ProfSchema = new mongoose.Schema({
    //CRUD usuário
    nomeUsuario : String,
    email : String,
    senha:String,
//CRUD dados cadastrais
    nome:String,
    dataNascimento:Date,
    //emial
    celular: String,
    sexo: String,

    profissao: String,
    numeroRegistro:String,
    
    //link CONFEF/CFN/CRP(válido)
    //receber curriculo (txt e pdf)
    //receber imagem
    especialidades: [String],
    bio: String,
});
ProfSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha=hash;
    next();
});

    module.exports = mongoose.model('Prof', ProfSchema);