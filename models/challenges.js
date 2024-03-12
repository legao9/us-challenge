const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    task:{type:String},
    points: {type:Number},
    checkedBy:{type:Array},
    challengeId:{type: String},
    duedate: {type: Date}
    // Other todo properties
});

const challengeSchema = new mongoose.Schema({
	challengeName: {
		type : String,
		required : true
	},
	description: {
		type: String,
	},
	priceamount: {
		type: Number,
	},
	schedulechallenge: {
		from: {
		type: Date
		},
		to: {
		type: Date
		}
	},
	meetlink: {
		type: String
	},
	howtoplay: {
		type: String
	},
	rules: {
		type: [Object]
	},
	faqs: {
		type: [Object]
	},
	todos : [todoSchema],
	// todos: {
	// 	type: [Object]
	// },
	tags: {
		type: [Object]
	},
 	 is_deleted : {
    	type: Boolean,
    	default: false
  	},
	company_id: {
		type: String,
	},
  	avatar: {
    	type: String
  	},
  	startDate: {
    	type: Date,
    	default: Date.now
  	},
  	updated_at: {
    	type: Date,
    	default: Date.now
  	},
	join_charge: {
		type: Number,
		default: 0
	},
	winner: {
		type: Object
	},
	joiners:{type:Array}
	
})

const challenge = mongoose.model('challenges', challengeSchema)

module.exports = challenge