const expect = require('chai').expect;
const Calendar = require('../dist/calendar')
const sinon = require('sinon');

var expectedResultForFebruary22 = [
  ["T", "W", "T", "F", "S", "S", "M"],
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [1, 2, 3, 4, 5, 6, 7],
]

var expectedResultForJanuary22 = [
  ["S", "S", "M", "T", "W", "T", "F"],
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, 1, 2, 3, 4],
]

var expectedResultForMarch22 = [
  ["T", "W", "T", "F", "S", "S", "M"],
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, 1, 2, 3, 4],
]

function getCurrentMonthToDay(currentMonth) {
  /* As calendar module returns an instance of date for each day,
    we are converting them to day number for better readability.
  */
  let [daysInital, ...daysOfMonth] = currentMonth
  let currentMonthToDay = []
  currentMonthToDay.push(daysInital)
  daysOfMonth.forEach(week => {
    let w = week.map(day => day.getDate())
    currentMonthToDay.push(w)
  })
  return currentMonthToDay
}

describe('test suite for calendar', function () {

  before(function () {
    // set current time to february 2022
    var clock = sinon.useFakeTimers({
      now: new Date(2022, 1, 1)
    });

  })

  it('Verify that for a given month we have the correct output.',
    function () {
      let c = new Calendar
      let currentMonth = c.getCurrentMonth()
      let currentMonthToDay = getCurrentMonthToDay(currentMonth)
      expect(currentMonthToDay).to.eql(expectedResultForFebruary22)
    });

  it('test increase Month function',
    function () {
      let c = new Calendar
      c.increaseMonth()
      let currentMonth = c.getCurrentMonth()
      let currentMonthToDay = getCurrentMonthToDay(currentMonth)
      expect(currentMonthToDay).to.eql(expectedResultForMarch22)
    }
  );

  it('test decrease Month function',
    function () {
      let c = new Calendar
      c.decreaseMonth()
      let currentMonth = c.getCurrentMonth()
      let currentMonthToDay = getCurrentMonthToDay(currentMonth)
      expect(currentMonthToDay).to.eql(expectedResultForJanuary22)
    }
  );

  it('testing with a date argument given to the constructor',
    function () {
      let d = new Date(2022, 2, 1)
      let c = new Calendar(d)
      let currentMonth = c.getCurrentMonth()
      let currentMonthToDay = getCurrentMonthToDay(currentMonth)
      expect(currentMonthToDay).to.eql(expectedResultForMarch22)
    });

  it('testing getCurrentMonthToDay',
    function () {
      let dates = []
      for (let i = 1; i <= 7; i++) {
        dates.push(new Date(2022, 1, i))
      }
      //inserting an empty array first as this should contains days inital.
      let mockedData = [[]]
      mockedData.push(dates)
      let expectedResult = [[], [1, 2, 3, 4, 5, 6, 7]]
      let result = getCurrentMonthToDay(mockedData)
      expect(result).to.eql(expectedResult)
    })
});
