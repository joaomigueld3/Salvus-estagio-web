const mongoose = require('mongoose');
const aws= require('aws-sdk');
const fs =require('fs');
const path = require('path');
const { promisify } = require('util');


const s3=new aws.S3();

const PostSchema = new mongoose.Schema({
    name: String, //salvar o nome original na img
    size: Number,
    key: String,  //nome complento da img com hash  
    url: String,
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

//middleware
//antes de salvar no banco verificar se a url está vazia, 
//se estiver vazia preencher com a url do app.use('/files',express.static)
PostSchema.pre('save',function(){ //nao uso arrow funciton pois irei acessar o valro atraves do this e a rrow function n pega valor de this

if(!this.url){ /*se a url tiver vazia*/
    this.url=`${process.env.APP_URL}/files/${this.key}`;
}
});

PostSchema.pre('remove',function(){
    if(process.env.STORAGE_TYPE == 's3'){
        return s3.deleteObject({
            Bucket: 'uploadimagenshealth',
            Key: this.key,//nome do arquivo
        }).promise()//para retornar no formato de promise, 
                    //o padrao do aws é callback
    }
    else{ //deletar do disco local
        return promisify(fs.unlink)(
            path.resolve(__dirname,"..","tmp","uploads",this.key)
            );

    }
})




module.exports = mongoose.model("Post", PostSchema);