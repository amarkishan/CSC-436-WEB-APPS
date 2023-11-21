const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../model/Todo");
const mongoose= require('mongoose');
const privateKey = ``;

router.use(function (req, res, next) {
  // console.log("In todo router");
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.post("/", async function (req, res)
 {
  const todo = new Todo({

    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    completed: req.body.completed || false, 
    datecreated: req.body.datecreated || Date.now(), 
    datecompleted: req.body.datecompleted || null, 
  });
  todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({

      id: savedTodo._id,
      title: savedTodo.title,
      description: savedTodo.description,
      author: savedTodo.author,
      completed: savedTodo.completed,
      datecreated: savedTodo.datecreated,
      datecompleted: savedTodo.datecompleted,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {
  //console.log("In GET /post handler");
  Todo.find()
    .where("author")
    .equals(req.payload.id)
    .then((todos) => {
      return res.status(200).json(todos);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

// router.put

// router.delete("/:id", async function (req, res) {}
// //   //console.log("In DELETE /post handler");
// //   Post.findByIdAndDelete(req.params.id)
// //     .where("author")
// //     .equals(req.payload.id)
// //     .then((post) => {
// //       if (post) {
// //         return res.status(200).json({
// //           id: post._id,
// //           title: post.title,
// //           content: post.content,});
// //         }}).catch((error) => 


//delete

  router.delete("/:id", async function (req, res) 
  {
    const todoId = req.params.id;
  
    
    if (!mongoose.Types.ObjectId.isValid(todoId)) 
    {
      return res.status(400).json({ error: "Invalid Todo ID" });
    }
  
    try 
    {
      
      const todo = await Todo.findById(todoId);
  
      
      if (!todo) 
      {
        return res.status(404).json({ error: "Todo not found" });
      }
  
      
      if (todo.author.toString() !== req.payload.id) 
      {
        return res.status(403).json({ error: "You don't have permission to delete this todo" });
      }
  
      
      await todo.deleteOne();
  
      return res.status(200).json({ message: "Todo deleted successfully" ,id:todoId});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  //patch 

  router.patch("/:id", async function (req, res) {
    const todoId = req.params.id;
  
    
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({ error: "Invalid Todo ID" });
    }
  
    try {
      
      const todo = await Todo.findById(todoId);
  
      
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
  
      
      if (todo.author.toString() !== req.payload.id) {
        return res.status(403).json({ error: "You don't have permission to update this todo" });
      }
  
      
      todo.completed = !todo.completed;
  
     
      await todo.save();
  
      return res.status(200).json({
        id: todo._id,
        title: todo.title,
        description: todo.description,
        author: todo.author,
        completed: todo.completed,
        datecreated: todo.datecreated,
        datecompleted: todo.datecompleted,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  
module.exports = router;