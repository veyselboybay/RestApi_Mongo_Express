const express = require('express')
const PostModel = require('../models/post');

const router = express.Router();

// GET every posts
router.get('/', async(req,res)=>{
    try{
        const posts = await PostModel.find();
        return res.json(posts);

    }catch(err){
       return res.json(err);
    }
});

// POST a new post
router.post('/',async (req,res)=>{
    const newPost = new PostModel({
        title: req.body.title,
        description: req.body.description
    });

    try{
        let savedPost = await newPost.save();
        res.status(200).send(savedPost);
    }catch(err){
        res.status(400).send(err);
    }
});

// GET a post by its :id
router.get('/:id',async (req,res) => {
    const _id = req.params.id;
    try{
        let retreivedPost = await PostModel.findById(_id);
        return res.json(retreivedPost);
    }catch(err){
        return res.json(err);
    }
})

// DELETE a post by its :id
router.delete('/:id', async(req,res)=>{
    let id = req.params.id;
    try{
        let deletedPost = await PostModel.remove({_id:id});
        return res.status(200).send(`
            Successfully deleted: 
                    ${deletedPost}
        `)
    }catch(err){
        return res.json(err);
    }
})

// UPDATE a post by its :id
router.patch('/:id', async (req,res)=>{
    let id = req.params.id;
    try{
        const updatedPost = await PostModel.updateOne(
            {_id:id},
            {
                $set: {title: req.body.title}
            }
        );
        return res.status(200).json(updatedPost);
    }catch(err){
        return res.json(err);
    }
})

module.exports = router;