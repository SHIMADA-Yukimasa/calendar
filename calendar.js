const weekName = ['sun', 'mon', 'tue', 'wed', "thu", "fri", "sat"];
const japaneseWeekName = '日月火水木金土'.split('');
import { eventAdd } from './yotei.js';

export async function createCalendar (year, month)  {
    // 全体のdiv要素
    const result = document.createElement('div') ;
    result.classList.add("calendar", `Y${year}`, `M${month}`)

    // 月名のヘッダー部分
    const monthHead = document.createElement('div');
    const monthData = document.createElement('div');
    const monthName = document.createElement("div");
    monthHead.classList.add('month-head');
    monthData.classList.add('month-data');
    monthName.classList.add("month-name");
    monthName.innerText = month;
    const [eventData, yoteiData] = await eventAdd(year, month);
    monthData.appendChild(eventData);
    monthHead.appendChild(monthName);
    monthHead.appendChild(monthData);
    result.appendChild(monthHead);

    // 曜日部分
    const weekname = document.createElement('div');
    weekname.classList.add("weekname");
    for (let i = 0; i < 7; i++) {
        const japaneseWeekname = document.createElement('div');
        japaneseWeekname.classList.add(weekName[i]);
        japaneseWeekname.innerText = japaneseWeekName[i];
        weekname.appendChild(japaneseWeekname);
    }
    result.appendChild(weekname);

    // Date オブジェクトの配列を作る
    const firstDay = new Date(new Date(year, month - 1, 1).setDate(-new Date(year, month - 1, 1).getDay() + 1));
    const calendarLength =  Math.ceil((((new Date(year, month, 0) - new Date(year, month - 1, 1)) / 86400000) + new Date(year, month - 1, 1).getDay()) / 7) * 7;
    const dateArray = new Array(calendarLength);
    // 最初の日の曜日を引いた日から配列いっぱいまで
    for (let i = 0; i < calendarLength; i++) {
        const someDate = new Date(firstDay);
        const result = new Date(someDate.setDate(someDate.getDate() + i));
        result.weekNumber = Math.floor(i / 7);
        dateArray[i] = result;
    }

    // カレンダー作成
    const calendar = document.createElement('div');
    calendar.classList.add('calendarContainar');
    for (let i = 0; i < dateArray.length; i++){
        const div = document.createElement('div');
        if (dateArray[i].getMonth() == month - 1) {
            div.innerText = dateArray[i].getDate();
        } else {
            div.innerText = " ";
        }
        const style = document.createAttribute('style');
        style.value += `grid-row: ${Math.floor((i + 7) / 7)};`
                    + `grid-column: ${dateArray[i].getDay() + 1};`
        div.setAttributeNode(style);
        div.classList.add('y' + year, 'm' + month, 'd' + dateArray[i].getDate(),weekName[dateArray[i].getDay()],'w' + dateArray[i].weekNumber )
        calendar.appendChild(div);
    }
    result.appendChild(calendar);
    yoteiData.forEach((v, i) => {
        yoteiLine(i + 1, v[4], v[2], v[3]).forEach(v =>{
            calendar.appendChild(v);
        });
    });
    return result;
}

function yoteiLine(index, r, _start, _end) {
    const __start = _start.split('/');
    const __end = _end.split('/');
    console.log(new Date(__start[0], __start[1] - 1, __start[2]))
    const firstDay = new Date(__start[0], __start[1] - 1, 1 - new Date(__start[0], __start[1] - 1,1).getDay());
    if (_start === _end) {
        const result = document.createElement('div');
        result.classList.add(`line-${index}`)
        const style = document.createAttribute('style');
        const row = Math.floor((new Date(__start[0], __start[1] - 1, __start[2]) - firstDay) / (1000 * 60 * 60 * 24 * 7)) + 1;
        const column = new Date(__start[0], __start[1] - 1, __start[2]).getDay() + 1;
        console.log(new Date(__start[0], __start[1] -1 , __start[2]), column)
    style.value = `height: 5px; position: relative; top: ${35 + 5 * r}px;`
                + `grid-row: ${row}; grid-column: ${column};`;  
        result.setAttributeNode(style);
        return [result];
    } else {
        // TODO 期間のある予定
        return [document.createElement('div')];
    }
};