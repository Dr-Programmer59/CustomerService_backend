const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for customer messages
const messageSchema = new Schema({
    message: String,
    imageData:String,
    msgType:String,
    status:String,

    timestamp: { type: Date, default: Date.now }
});

// Define the schema for the employee data
const employeeSchema = new Schema({
    _id: String, // Assuming employeeId is a string
    customers: {
        type: Object,
        default: {}
    }
});

// Create a model for the Employee schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
