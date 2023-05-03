const { Thought, User } = require('../models');
const thoughtController = {
   // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }, 
  // create a thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((dbThoughtData) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if(!dbUserData) {
        return res.status(404).json({ message: "Thought has been created but no user with this id!" 
      });
    }
    res.json({
      message: "Thought created!"});
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
  },

  // get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  
  // update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate()
  }
  // delete a thought
  // add a reaction
  // delete a reaction


}




module.exports = thoughtController;