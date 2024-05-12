const app=require("./app")

const dotenv=require("dotenv")
const DB=require("./config/db")

const {Server}=require('socket.io')

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server on unhandled rejection")
    process.exit(1);
})


dotenv.config({path:"config/config.env"})

// connecting to databse
DB();

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is waiting on http://localhost:${process.env.PORT}`)
})





let online_employees={} //structure categories:[{name:"---","category":"----"}]
let online_customer=[]
let working_employees={}//structure  [{"name","socket",customers:[{name:"",socket=""}]}]
let waiting_customer=[]
let busy_customer={}
let maxCustomerHandleByEmployee=0

const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  const assignWorkTofreeEmployee = (person,socket) => {
    // Check if there are online employees
    if(!online_employees[person.category])
    {
        online_employees[person.category]=[]
    }


    if(!working_employees[person.category])
    {
        working_employees[person.category]=[]
    }

    if (online_employees[person.category].length === 0) {
        return false; // No online employees available
    }

    // Check if there are any working employees
   
    // Check if there are any employees available to take on the task
    const availableEmployee = online_employees[person.category].find(employee => {
        return !working_employees[person.category].some(wEmployee => wEmployee.socketId === employee.socketId);
    });
    console.log("these are available emplooyees ",availableEmployee)
    if (availableEmployee) {
        // Assign the task to the available employee
        working_employees[person.category].push({
            name: availableEmployee.name,
            socketId: availableEmployee.socketId,
            customers: [{ name: person.name, socketId: person.socketId }]
        });
        busy_customer[person.socketId]={category:person.category,talkingwith:availableEmployee.socketId}
        console.log("returing true")
        let required_employee=working_employees[person.category].find(employee=>employee.socketId==availableEmployee.socketId)

        io.to(availableEmployee.socketId).emit("new-customer",{customerIndex:required_employee.customers.length-1,socketId:person.socketId})
        return true; // Task assigned successfully
    } else {
        return false; // No available employees to take on the task
    }
};

const assignWorkToBusyEmployee=(person,socket)=>
{
    if (online_employees[person.category].length === 0 || working_employees[person.category]==0) {
        return false; // No online employees available
    }
    const maxCustomers = Math.max(...working_employees[person.category].map(employee => employee.customers.length));
console.log("max are ",maxCustomers)
    const areCustomersEqual = working_employees[person.category].every(employee => employee.customers.length === maxCustomers);
    if (areCustomersEqual) {
        console.log("customer are equal")
        // If all employees have equal customers, assign customers to any one employee
        const employee = working_employees[person.category][0]; // Choosing the first employee
      
        employee.customers.push({
            name: employee.name,
            socketId: employee.socketId,
            customers: [{ name: person.name, socketId: person.socketId }]
        });
        busy_customer[person.socketId]={category:person.category,talkingwith:employee.socketId}
        let required_employee=working_employees[person.category].find(employee=>employee.socketId==employee.socketId)
        console.log("working sending ",employee.socketId)
        io.to(employee.socketId).emit("new-customer",{customerIndex:required_employee.customers.length-1,socketId:person.socketId})

        return ; // Customers assigned successfully

    }
    const employeeWithMinCustomers = working_employees[person.category].reduce((minEmployee, employee) => {
        return employee.customers.length < minEmployee.customers.length ? employee : minEmployee;
    });
    console.log(employeeWithMinCustomers)
    employeeWithMinCustomers.customers.push({
        name: employeeWithMinCustomers.name,
        socketId: employeeWithMinCustomers.socketId,
        customers: [{ name: person.name, socketId: person.socketId }]
    });
    busy_customer[person.socketId]={category:person.category,talkingwith:employeeWithMinCustomers.socketId}
    let required_employee=working_employees[person.category].find(employee=>employee.socketId==employeeWithMinCustomers.socketId)

        io.to(employeeWithMinCustomers.socketId).emit("new-customer",{customerIndex:required_employee.customers.length-1,socketId:person.socketId})

    return;
    }



  
  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on("new-member",(person)=>{
        if(person.role=='customer'){
            console.log("customer ",person)
           if(assignWorkTofreeEmployee(person)){
            //assigning work to free employees
           // do any work u want to
           console.log("assigned some work to ")
           console.log(working_employees)
           console.log("customer is busy in talking  ",busy_customer)
            }
            else{
                assignWorkToBusyEmployee(person)
                console.log("in busy wala function so dekh li sahi se ")
                console.log(working_employees)
                console.log("customer is busy in talking  ",busy_customer)
            }
          
        }
        else if(person.role=='User'){
            if(!online_employees[person.category]){
                online_employees[person.category]=[]
            }
            online_employees[person.category].push({name:person.name,socketId:person.socketId})
            console.log("some employee is online")
            console.log(online_employees)
        }
    })
    // Listen for messages from the client
    socket.on('send-msg', (msgData) => {
        if(msgData.role=="customer"){
            let empSocket=busy_customer[msgData.socketId].talkingwith;
            console.log("employee socket id is ",empSocket)
            msgData['socketId']=socket.id
            io.to(empSocket).emit("recieve-msg",msgData)
        }
        else if (msgData.role=="employee"){
            console.log(msgData)
            io.to(msgData.customerSocket).emit("recieve-msg",msgData)


        }
        // Broadcast the message to all connected clients
      
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        for (let category in online_employees) {
            online_employees[category] = online_employees[category].filter(employee => employee.socketId !== socket.id);
        }
        if(busy_customer[socket.id]){
            delete busy_customer[socket.id];

        }
        console.log('User disconnected');
    });
});
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server on unhandled rejection")
    server.close(()=>{
        process.exit(1);
    })
})