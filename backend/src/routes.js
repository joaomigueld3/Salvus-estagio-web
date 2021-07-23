require("dotenv").config();
const { Router } = require('express');
const routes = Router();


const ProfController = require('./controllers/ProfController');
const SearchController = require('./controllers/SearchController');



const multer = require('multer');
const multerConfig = require("./config/multer");
const Post = require('./models/Post');

routes.get("/posts",async(req,res)=>{
    const posts = await Post.find();
    return res.json(posts);
});
routes.get("/posts/:id",async(req,res)=>{
    const post=await Post.findById(req.params.id);
    return res.json(post);
})

routes.post("/posts",multer(multerConfig).single("file"), async(req,res)=>{
    const {location:url="",key}=req.file;
    const post = await Post.create({
        name: req.file.originalname,
        size:req.file.size,
        key,
        url,
    })
    console.log(post.key);
    return res.json(post);
});

routes.delete('/posts/:id',async(req,res)=>{
    const post=await Post.findById(req.params.id);
    if(!post){
        console.log({message:"Não é possível deletar um usuário não cadastrado!"});
        return res.status(400).json({message:"O usuário não pode ser deletado, pois ele não existe!"});
        }else{
            await post.remove();
            return res.send({message: "item deleted"});
        }
    
})
/*
routes.delete('/posts/:name', async(req,res)=>{
    const {name12} = req.params;

    const joao = await Post.findOne({name12});
    await joao.remove();
    return res.send(); 
    /*if(!joao){
        console.log({message:"Não é possível deletar um usuário não cadastrado!"});
        return res.status(400).json({message:"O usuário não pode ser deletado, pois ele não existe!"});
    }
    else{
      const joao2 =await  Post.deleteOne({name:req.params.name12});
        
      return res.json(joao2);
}
})*/

routes.get('/profs', ProfController.index);
routes.post('/profs', ProfController.store);
routes.get('/search',SearchController.index );
routes.get('/profs/:profissao',SearchController.get);
routes.patch('/profs/:email',SearchController.update);
routes.delete('/profs/:email',SearchController.destroy);
// /profs e /search são apenas o nome da url


module.exports = routes;   