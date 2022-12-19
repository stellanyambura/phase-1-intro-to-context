// Your code here
function createEmployeeRecord(employee){
    const employeeRecord={
        firstName:employee[0],
        familyName:employee[1],
        title:employee[2],
        payPerHour:employee[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
    return employeeRecord;
}
function createEmployeeRecords(employees){
    const employeesRecords = []
    employees.map(employee=>employeesRecords.push(createEmployeeRecord(employee)))
    return employeesRecords
}   
createEmployeeRecords()
function createTimeInEvent(employeeRecord,dateStamp){
    employeeRecord.timeInEvents.push(
        {
            type:"TimeIn",
            hour:Number.parseInt(dateStamp.slice(11)),
            date:dateStamp.slice(0,10)

        }
    )
return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: Number.parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecord
}
function hoursWorkedOnDate(employeeRecord, date){
    for(let i in employeeRecord.timeInEvents){
        if(employeeRecord.timeInEvents[i].date === date){
            return (employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour)/100
        }
    }
}
function wagesEarnedOnDate(employeeRecord,date){
    const payOwed = hoursWorkedOnDate(employeeRecord,date) * employeeRecord.payPerHour;
    return payOwed;
}
function allWagesFor(employeeRecord){
    let total = employeeRecord.timeInEvents.reduce((accumulator,timeInElement) => {
        let total = wagesEarnedOnDate(employeeRecord,timeInElement.date)
        return accumulator += total;

    },0)
    return total;
    }

function  calculatePayroll(arrayOfEmployees){
    const reducer = (accumulator,employee) => {
        let totalWages = allWagesFor(employee);
        return accumulator += totalWages;
    }
    return arrayOfEmployees.reduce(reducer,0)
}