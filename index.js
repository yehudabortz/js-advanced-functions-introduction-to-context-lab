// Your code here

function createEmployeeRecord(array) {

    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}


function createEmployeeRecords(arrays) {
    return arrays.map(function (employee) {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

function hoursWorkedOnDate(employee, dateOfForm) {
    let inDate = employee.timeInEvents.find(function(d) {
        return d.date === dateOfForm
    })

    let outDate = employee.timeOutEvents.find(function(d) {
        return d.date === dateOfForm
    })

    return (outDate.hour - inDate.hour) / 100
}

function wagesEarnedOnDate(employee, dateOfForm) {
    let hours = hoursWorkedOnDate(employee, dateOfForm)
    return employee.payPerHour * hours
}

function allWagesFor(employee) {
    let wages = employee.timeOutEvents.map(function (e) {
        return wagesEarnedOnDate(employee, e.date)
    })

    return wages.reduce((total, amount) => total + amount)
}

function findEmployeeByFirstName(scrArray, firstName) {
    let employee = scrArray.find(function(e) {
        if (e.firstName === firstName) {
            return e
        }
    })
    return employee
}

function calculatePayroll(employeeRecords) {
    let total = 0
    let allPay = employeeRecords.forEach(function (e) {
    total += allWagesFor(e)
    })
    return total
}