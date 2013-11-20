var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkoutLog = Schema ({
	user : [{ type: Schema.Types.ObjectId, ref: 'User' }],
	weightLifting: [{duration: Number, date: Date, default: Date.now }],
	tennis: [{duration: Number, date: Date, default: Date.now }],
	basketball: [{duration: Number, date: Date, default: Date.now }],
	swimming: [{duration: Number, date: Date, default: Date.now }],
	cardio: [{duration: Number, date: Date, default: Date.now }],
	groupExercise: [{duration: Number, date: Date, default: Date.now }],
	other: [{duration: Number, date: Date, default: Date.now }]
	},
  	{ _id: false }); ///do this????

WorkoutLog.set('autoIndex', false);

module.exports = WorkoutLog;