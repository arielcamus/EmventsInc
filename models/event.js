let Event = null;
const mongoose = require('mongoose');
const connString = 'mongodb://localhost:27017/events';
mongoose.connect(connString);

mongoose.connection.on('connected',  () => {
  console.log('Mongoose default connection open to ' + connString);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

const Schema = mongoose.Schema;
const eventSchema = new Schema(
  {
    _id: { type: Number, required: true },
    title: { type: String, required: true, index: true},
    description: { type: String, required: true },
    date: { type: Date },
    organizer: { type: Schema.Types.ObjectId, required: true, index: true, ref: 'User'},
    signedUpUsers: {type: Array, required: false, index: true, ref: 'User'}
  }
);

Event = mongoose.model('Event', eventSchema);

module.exports = Event;
