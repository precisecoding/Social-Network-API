const { User, Thought } = require('../models');

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      // include .populate('friends) renders data of "friends" field from user/s
      .populate('friends')
      
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user + by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      // "-/+__v"Specifies which document fields to include or exclude (also known as the query "projection")
// When using string syntax, prefixing a path with - will flag that path as excluded. When a path does not have the - prefix, it is included. Lastly, if a path is prefixed with +, it forces inclusion of the path, which is useful for paths excluded at the schema level.
// A projection must be either inclusive or exclusive. In other words, you must either list the fields to include (which excludes all others), or list the fields to exclude (which implies all other fields are included).
// .select('-__v') as used below selects that field to be excluded from the if () condition.
      // using these to remove extra data similar to what would be required when returning only the relevant data for the front end user.
      .select('-__v -_id')
      .populate({
        path: 'friends',
        select: '-__v -_id'
      })
      .populate('thoughts');
      

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user, Route triggers the controller controller triggers the model
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

      // const user = await User.findOneAndUpdate(
      //   { users: req.params.userId },
      //   { $pull: { users: req.params.userId } },
      //   { new: true }
      // );

      // if (!user) {
      //   return res.status(404).json({
      //     message: 'Users deleted, but no courses found',
      //   });
      // }


  // Add a friend to a user
  async addFriend(req, res) {
    console.log(req.body)
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // $addToSet: {} enables adding data to fields
        { $addToSet: { friends: req.params.friendId } },
        // using new: true, findOneAndUpdate will return the object after the update, otherwise the findOneAndUpdate will return the document as it was before.
        // runValidators: true, to enable "updateValidators".
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }
      const newresponse = {
        user, 
        message: "Added friend successfully"
      }
      res.status(201).json(newresponse);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // $pull: {}  enables removing data from fields
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }
      const newresponsetwo = {
        user,
        message: "Deleted friend successfully"
      }
      res.status(200).json(newresponsetwo);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
