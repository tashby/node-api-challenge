const express = require('express');
const db = require('../data/helpers/actionModel')
const router = express.Router();
const { validateAll } = require("../middleware/validateAll")


router.get("/", (req, res) => {
	res.json({
		message: "Welcome to my API",
	})
})


// GET
router.get("/actions", (req, res) => {
    db.get()
    .then((actions) =>{
        res.json(actions)
    })
    .catch(() => {
        res.status(500).json({
            error: "The actions could not be retrieved."
        })
    })
  })


  // POSTS
router.post("/actions", validateAll(), (req, res) => {

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
router.put('/actions/:id', validateAll(), (req, res) => {
  
  db.update(req.params.id, req.body)
  .then((act) => {
           res.status(200).json(act)
  })
  .catch((error) => {
      console.log(error)
      res.status(500).json({
          error: "The post info could not be modified."
      })
  })
  });

// DELETE
router.delete('/actions/:id', (req, res) => {

    db.remove(req.params.id)
          .then((count) => {
              if(count > 0) {
                  res.status(200).json({
                      message: "Deleted"
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