const weekName = ['sun', 'mon', 'tue', 'wed', "thu", "fri", "sat"];
const japaneseWeekName = '日月火水木金土'.split('');

export function createCalendar (year, month)  {
    // 全体のdiv要素
    const result = document.createElement('div') ;
    result.classList.add("calendar", `Y${year}`, `M${month}`)

    // 月名のヘッダー部分
    const monthName = document.createElement("div");
    monthName.classList.add("month-name");
    monthName.innerText = month;
    result.appendChild(monthName);

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

    // TODO Date オブジェクトの配列を作る
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

    // TODO カレンダー作成
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
        style.value = `grid-row: ${Math.floor((i + 7) / 7)};`
                    + `grid-column: ${dateArray[i].getDay() + 1};`
        div.setAttributeNode(style);
        div.classList.add('y' + year, 'm' + month, 'd' + dateArray[i].getDate(),weekName[dateArray[i].getDay()],'w' + dateArray[i].weekNumber )
        calendar.appendChild(div);
    }
    result.appendChild(calendar);
    return result;
}

async function isEvent(year, month) {

async function csvToMap() {
    try {
        const Response = await fetch('yotei.csv');
        if (!Response.ok) {
            throw new Error(`csvファイルが読めませんでした: ${Response.status} ${Response.statusText}`);
        }
            const text = await Response.text();
            const map = new Map();
            const arr = text.split(/\r\n|\n/);
            arr.forEach((v,i) => {
                const value = v.split(',');
                map.set(value[0], value[1]);
            });
            return map;
    } catch(error) {
        console.error(`csvファイルが読めませんでした: ${error}`);
    }
};

const yotei = await csvToMap();
}