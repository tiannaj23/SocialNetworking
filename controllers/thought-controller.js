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
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: "Thought with this ID does not exist." });
  }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "User not found."});
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Thought has been created but no user with this id!" });
        }
        res.json({ message: "Thought deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // add a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
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
  // remove a reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },https://files.slack.com/files-pri/T051264C0JV-F0565K9V4KC/tianna-social-snip.png
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "Thought not found." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
  };

  

module.exports = thoughtController;