function createEmployeeRecord(createEmployeeRecordArray) {
    let employeeInfo = {
        firstName: createEmployeeRecordArray[0],
        familyName: createEmployeeRecordArray[1],
        title: createEmployeeRecordArray[2],
        payPerHour: createEmployeeRecordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeInfo;
};

function createEmployeeRecords(employeeRecordsArray) {
    return employeeRecordsArray.map(createEmployeeRecord);
};

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let timeInEvent = {
        type: "TimeIn",
        date: date,       
        hour: parseInt(hour)
    };
    this.timeInEvents.push(timeInEvent);
    return this;
};

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
};

function hoursWorkedOnDate(date) {
    let dateTimeIn = this.timeInEvents.find (event => event.date === date)
    let dateTimeOut = this.timeOutEvents.find (event => event.date === date)
    return (dateTimeOut.hour - dateTimeIn.hour) / 100;
};

function wagesEarnedOnDate(date) {
    let dateHoursWorked = hoursWorkedOnDate.call(this, date)
    let dateWages = this.payPerHour;
    return dateHoursWorked * dateWages;
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((record => record.firstName === firstName));
}

function calculatePayroll(employeeRecords) {
    let totalPayroll = employeeRecords.map((employee) => allWagesFor.call(employee));
    return totalPayroll.reduce((inst1, inst2) => inst1 + inst2);
};