const { Schema, model } = require('mongoose');
const { format_date } = require('../utils/date.js');
const reactionSchema = require('./Reaction.js');
// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      // Date.now uses type: Date to reference current timestamp on query
      default: Date.now,
      // get: is our getter method getting the value imported from the date.js file at the top of the page
      get: date => format_date(date)
    },
    username: {
      type: String,
      required: true
    },
    // this is how to include a sub-document schema 
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      // getters: true, allows for including getters, the additional methods such as getters, setters use format as, toJSON: {}, positioned within schema but outside of model array.
      getters: true,
      virtuals: true,
    },
     // id: false, excludes redundately generated id's
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
