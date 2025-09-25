const weekName = ['sun', 'mon', 'tue', 'wed', "thu", "fri", "sat"];
const japaneseWeekName = '日月火水木金土'.split('');


// メイン
export function createCalendar (year, month, scheduleData)  {

// 今年のスケジュールだけ取り出す
const scheduleArray = scheduleData.map(v => {
    const data = v.split(",");
    if (data[2].split("-")[0] != year) return;
    return [data[3].split('-')[1], ...data];
});

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
        // その月のn段目
        result.weekRow = Math.floor(i / 7);
        // 第〇週 を作る
        result.weekNumber = Math.floor((i - new Date(year, month - 1 , 1).getDay() + 7) / 7);
        dateArray[i] = result;
    }

    // カレンダー作成
    const calendar = document.createElement('div');
    calendar.classList.add('calendarContainar');
    for (let i = 0; i < dateArray.length; i++){
        const div = document.createElement('div');
        div.classList.add('day-class');
        const day = document.createElement('div');
        day.classList.add('day');
        if (dateArray[i].getMonth() == month - 1) {
            day.innerText = dateArray[i].getDate();
        } else {
            day.innerHTML = "&nbsp;";
        }
        day.classList.add('y' + year, 'm' + month, 'd' + dateArray[i].getDate(),weekName[dateArray[i].getDay()],'w' + dateArray[i].weekNumber )
        div.appendChild(day);
        // 予定を表示するスペース
        const sche = document.createElement('div');
        const someDate = new Date(firstDay);
        const result = new Date(someDate.setDate(someDate.getDate() + i));
        scheduleArray.map(v => {
            const start = new Date(v[3].split('-')[0], parseInt(v[3].split('-')[1],10) - 1, v[3].split('-')[2]);
            const   end = new Date(v[4].split('-')[0], parseInt(v[4].split('-')[1],10) - 1, v[4].split('-')[2]);
            const color = v[1] === "清水寺" ? 0
                        : v[1] === "霊山寺" ? 60
                        : v[1] === "蓮乗院" ? 120
                        : 180;

            if (start.getTime() <= result.getTime() && result.getTime() <= end.getTime()){
                sche.classList.add('yotei');
                sche.style.backgroundColor = `hsla(${color}, 50%, 50%, 0.3`;
                sche.style.color = `hsl(${color}, 50%, 20%)`;

            if (result.toDateString() === start.toDateString()) {
                sche.innerHTML = v[2];
                sche.classList.add('start');
            }

            if (result.toDateString() === end.toDateString()){
                // 終了
                sche.classList.add('end');

            }

            }
        });
        div.appendChild(sche);

        calendar.appendChild(div);
    }
    result.appendChild(calendar);
    return result;
}



