const weekName = ['sun', 'mon', 'tue', 'wed', "thu", "fri", "sat"];

export function createCalendar (year, month)  {
    // 全体のdiv要素
    const result = document.createElement('div') ;
    result.classList.add("calendar", `Y${year}`, `M${month}`)

    // 月名のヘッダー部分
    const monthName = document.createElement("div");
    monthName.classList.add("month-name");
    monthName.innerText = month;
    result.appendChild(monthName);

    // カレンダー部分
    const calendar = document.createElement('div');
    const firstSunday = new Date(year, month - 1, 1);
    firstSunday.setDate( - firstSunday.getDay() + 1);
    const lastDate = new Date(year, month, 0);

    // 日のオブジェクトを入れる配列を用意
    const dayArray = new Array( (lastDate.getTime() - firstSunday.getTime()) / 86400000);

    // 日を作る
    dayArray.map((_ ,i) => {
        const result = document.createElement('div');
        result.innerText = firstSunday.getMonth === month ? month : "";
        console.log(result);
        return result;
    });

    result.appendChild(calendar);
    return result;
}

