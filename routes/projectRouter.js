const express = require('express');
const db = require('../data/helpers/projectModel')
const router = express.Router();
const { validateAll } = require("../middleware/validateAll")

// GET
router.get("/projects", (req, res) => {
    db.get()
    .then((projects) =>{
        res.json(projects)
    })
    .catch(() => {
        res.status(500).json({
            error: "The projects could not be retrieved."
        })
    })
  })

  // POSTS
router.post("/projects", validateAll(), (req, res) => {

    db.insert(req.body)
    .then((post) => {
        res.status(201).json(post)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
          error: "Posting not working"
      })
  })
  })

// PUT
router.put('/projects/:id', validateAll(), (req, res) => {
  
    db.update(req.params.id, req.body)
    .then((projects) => {
             res.status(200).json(projects)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "The post could not be modified."
        })
    })
    });

// DELETE
router.delete('/projects/:id', (req, res) => {

    db.remove(req.params.id)
          .then((count) => {
              if(count > 0) {
                  res.status(200).json({
                      message: "Deleted."
                  })
              } else {
                  res.status(404).json({
                      message: "The post with this ID does not exist."
                  })
              }
          })
          .catch((error) => {
              console.log(error)
              res.status(500).json({
                  error: "The post could not be removed"
              })
          })
  });



  
module.exports = router;