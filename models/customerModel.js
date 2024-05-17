const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for customer messages
const messageSchema = new Schema({
    msg: String,
    imageData: String,
    msgType: String,
    status: String,
    timestamp: { type: Date, default: Date.now }
});

// Define the schema for the Customer data
const CustomerSchema = new Schema({
    phone:{
        type:String,
        required:true
    },
    messages: [messageSchema]
});

// Method to add a message for a customer
CustomerSchema.methods.addMessageToCustomer = async function(message) {
    if(message !== ""){
        this.messages.push(message);
    }
    return this.save();   
};

// Create a model for the Customer schema
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
