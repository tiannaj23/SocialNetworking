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
        .then((dbUserData) => {
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
      // update a user
      updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({message: "User not found"});
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
      
      // delete a user
      // add a friend
      // delete a friend

}





module.exports = userController;