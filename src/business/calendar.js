export class Calendar {
    constructor() {
        this.months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        this.days = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
    }

    getDays(fromDate, size) {
        const dayList = [];
        if (fromDate instanceof Date) {
            
            for(let i=0; i < size; i++) {
                if (i > 0) {
                    fromDate.setDate(fromDate.getDate() + 1);
                }
                dayList.push({
                    _d: new Date(fromDate),
                    date: fromDate.getDate(),
                    month: this.months[fromDate.getMonth()],
                    day: this.days[fromDate.getDay()],
                    key: `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${(fromDate.getDate() < 10 ? '0': '')}${fromDate.getDate()}`
                })
            }
        }
        return dayList;
    }
}

export default Calendar;

/**
 * Hello WOrld
 * I am good
 * Hello world
 * helloworld
 */