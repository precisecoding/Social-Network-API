const { Schema, Types } = require('mongoose');
const { format_date } = require('../utils/date.js')

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: date => format_date(date)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    // id: false, excludes redundately generated id's
    id: false,
  }
);

module.exports = reactionSchema;
