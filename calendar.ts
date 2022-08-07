/*
Return a representation of the current Month.
Each day are returned as an instance of Date.

exampleResult = [
  ["T", "W", "T", "F", "S", "S", "M"],
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, 1, 2, 3, 4],
]
*/
const calendar = class Calendar {

  DAYS_INITIALS: string[] = ["S", "M", "T", "W", "T", "F", "S"]
  #NUMBER_OF_DAYS_RETURNED = 35
  #date: Date

  constructor(date = new Date()) {
    this.#date = date
  }

  getCurrentMonth(): Array<Array<string | Date>> {
    let daysOfMonthPerWeek = this.#getDaysOfMonthPerWeek()
    let orderedDayInitial: string[] = this.#getOrderedDayInitial(daysOfMonthPerWeek)
    let currentMonth: Array<Array<string | Date>> = []

    currentMonth.push(orderedDayInitial)
    daysOfMonthPerWeek.forEach(week => {
      currentMonth.push(week)
    })
    return currentMonth
  }

  #getOrderedDayInitial(daysInMonthPerWeek: Array<Array<Date>>): string[] {
    let orderedDayInitial: string[] = []
    let [firstWeek, _] = daysInMonthPerWeek

    for (let day of firstWeek) {
      let dayNumber = day.getDay()
      orderedDayInitial.push(
        this.DAYS_INITIALS[dayNumber]
      )
    }
    return orderedDayInitial
  }

  #getDaysOfMonthPerWeek(): Array<Array<Date>> {
    let currentYear = this.#date.getFullYear()
    let currentMonth = this.#date.getMonth()
    let daysInMonthPerWeek: Array<Array<Date>> = []
    let daysInWeek: Date[] = []

    for (let day = 1; day <= this.#NUMBER_OF_DAYS_RETURNED; day++) {
      let currentDate: Date = new Date(currentYear, currentMonth, day)
      let isFirstDayOfAWeek = day % 7 === 0

      daysInWeek.push(currentDate)
      if (isFirstDayOfAWeek) {
        daysInMonthPerWeek.push(daysInWeek)
        daysInWeek = []
      }
    }
    return daysInMonthPerWeek
  }

  increaseMonth(): void {
    this.#date = new Date(
      this.#date.setMonth(this.#date.getMonth() + 1))
  }

  decreaseMonth(): void {
    this.#date = new Date(
      this.#date.setMonth(this.#date.getMonth() - 1))
  }
}

module.exports = calendar
export default calendar