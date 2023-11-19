// schema is the class and model is the "method"-function format is from on mongoose
// defining first the schema and then the model allows for communicating with schemas in routes
const { Schema, model } = require('mongoose');


// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    // array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
    ],
    // including array of _id values referencing the User model (self-reference)
    friends: [
      {
      // friends will hold unique user objectId from User model 
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
  },
  // position virtuals at the end of the array within the schema using format as, toJSON {}
  {
    toJSON: {
      virtuals: true
    },
     // id: false, excludes redundately generated id's
    id: false
  }
);
// this allows for the virtuals above to retrieve length of friends for a specefic user defining thier "friend count". This must be called outside of the schema to allow for virtuals within the schema to run.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length
})

const User = model('User', userSchema);

module.exports = User;
