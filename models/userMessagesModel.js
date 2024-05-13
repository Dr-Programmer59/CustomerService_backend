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

// Define the schema for the employee data
const employeeSchema = new Schema({
    _id: String, // Assuming employeeId is a string
    customers: {
        type: Map,
        of: {
            customerName: String,
            messages: [messageSchema]
        }, // Array of messageSchema
        default: new Map(),
    }
});

// Method to add a message for a customer
employeeSchema.methods.addMessageToCustomer = async function(customerId, customerName, message) {
    if (!this.customers.has(customerId)) {
        this.customers.set(customerId, { customerName: customerName, messages: [] });
    }
    if(message!=""){


    const customer = this.customers.get(customerId);
    customer.messages.push(message);
    this.customers.set(customerId, customer);
}

    return this.save();
        
};

// Create a model for the Employee schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
