const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = new Schema(
{

  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  completed: { type: Boolean, default: false },
  datecreated: { type: Date, default: Date.now }, 
  datecompleted: { type: Date, default: null }
}
);
//Export model
module.exports = mongoose.model('Todo', TodoSchema);
