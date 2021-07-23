const multer =require('multer');
const path = require('path');
const crypto=require('crypto');
const multerS3 = require('multer-S3');
const aws = require('aws-sdk');
//SEMPRE QUE ATUALIZA OS ARQUIVOS .ENV REINICIAR O SERVIDOR
const storageTypes ={
    local:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null, path.resolve(__dirname,"..","tmp","uploads") )
        },
        filename: (req,file,cb) => {
        crypto.randomBytes(16,(err,hash)=>{
            if(err) { //se cair no erro chama o callback do multer 
                    //pra ser jogado no controler
                cb(err);
            }
            //caso o nome do arquivo tenha espaço
            if(file.originalname.includes(" ")){
                var a=" ";
                file.originalname=file.originalname.replace(/ /g,"-");
                //console.log(file.originalname)
            }
             file.key = `${hash.toString('hex')}-${file.originalname}`;
        
            cb(null,file.key);
        });
        },
        }),

    s3:multerS3({
        s3:new aws.S3(),//variavel obrigatoria
        bucket:'uploadimagenshealth',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req,file,cb) => {
            crypto.randomBytes(16,(err,hash)=>{
                if(err) { //se cair no erro chama o callback do multer 
                    cb(err);       //pra ser jogado no controler
               }
               
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
            
                cb(null,fileName);
            });
            },
            }),

           };

module.exports ={
dest: path.resolve(__dirname,"..","tmp","uploads"),
storage: storageTypes[process.env.STORAGE_TYPE],

limits:{
    fileSize: 2*1024*1024,
},
fileFilter: (req,file,cb)=>{
const allowedMimes =[
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif'
];

if (allowedMimes.includes(file.mimetype)){
    cb(null,true);
} else{
    cb(new Error("Invalid file type."));
}
},

};