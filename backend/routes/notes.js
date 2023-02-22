const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error ocurred");
    }

})
router.post('/addnote',fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid desc').isLength({ min: 5 }),
    body('tag','some').isLength({ min: 3 })
], async (req, res) => {
    const { title, description, tag } = req.body;
    //console.log(req.body)
    const errors = validationResult(req);
    //console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const notes = new Notes({
            title: req.body.title,
             description:req.body.description, 
             tag:req.body.tag ,
             user: req.user.id
        })
        const saveNote = await notes.save()
        res.json(saveNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error ocurred");
    }

})
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  
  try {
  const {title,description,tag} = req.body;
  const newNote ={};
  if(title){newNote.title=title};
  if(description){newNote.description=description};
  if(tag){newNote.tag=tag};

  let note = await Notes.findById(req.params.id)
  if(!note){return res.status(404).send("not found")}
  if(note.user.toString() != req.user.id){
    return res.status(401).send("not found")
  }
  note= await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new : true})
  res.json({note})
  }
  catch (error) {
    
  }
})
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   
    try {
    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("not found")}
    if(note.user.toString() != req.user.id){
      return res.status(401).send("not found")
    }
    note= await Notes.findByIdAndDelete(req.params.id)
    res.json("sucess")
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("some error ocurred");
    }
  })

module.exports = router;