const {User, Thought} = require ('../models')
const userController = {
    // get all users
    getUsers(req, res) {
        User.find()
          .select('-__v')
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // create a user
      createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // get a single user
      getSingleUser(req, res) {
        User.findOne({_id: req.params.id})
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({message: "User not found."});
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
      // update a user
      updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, {$set: req.body,}, { new: true, runValidators:true, })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({message: "User not found."});
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
      // delete a user and associated thoughts
      deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({message: "User not found."});
          }
          return Thought.deleteMany({_id: { $in: dbUserData.thoughts } });
        })
          .then(() => {
            res.status(200).json({
              message: "User and associated deleted successfully"
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
      },
      // add a friend
      addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { friends: req.params.friendId } }, { new: true})
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'User does not exist.' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
        },
      // delete a friend
        
}





module.exports = userController;