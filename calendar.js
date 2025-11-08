const weekName = ['sun', 'mon', 'tue', 'wed', "thu", "fri", "sat"];
const japaneseWeekName = '日月火水木金土'.split('');
const yotei = [
    [1, "元旦～３日　新春厄ばらい祈祷祭"],
    [1, "３日　毘沙門天福祭"],
    [1, "11日　初稲荷"],
    [1, "17日　初観音ご縁日"],
    [1, "17日　五穀豊穣祈願祭"],
    [1, "20日　権現祭"],
    [2, "３日　節分会（星祭り）"],
    [2, "15日　涅槃会"],
    [2, "18日　初薬師"],
    [3, "８日　霊山寺 大護摩火渡り祭"],
    [3, "20日　春の彼岸会"],
    [4, "８日　花まつり"],
    [4, "11日～17日　春お経会式"],
    [4, "　"],
    [4, "29日～　宝物館公開期間"],
    [4, "29日～　還誕祭"],
    [4, "29日～　ちびっこ厄ばらい祭"],
    [5, "～6日　宝物館公開期間"],
    [5, "～6日　還誕祭"],
    [5, "～6日　ちびっこ厄ばらい祭"],
    [6, "14日　のぼり旗奉納者合同祈願祭"],
    [7, "17日　御本尊開扉法要（大般若600巻転読）"],
    [7, "22日～24日　全山閉山日"],
    [8, "８日　霊山寺 十二天供養祭"],
    [8, "15日　施餓鬼法要"],
    [8, "17日　第28回 清水寺萬燈会"],
    [9, "23日　秋の彼岸会"],
    [10, "18日　光明真言会（諷誦）"],
    [11, "11日　清水稲荷大祭（もっこ祭り）"],
    [12, "17日　大梵焼祭"]
];

export function createCalendar (year, month)  {
    // 全体のdiv要素
    const result = document.createElement('div') ;
    result.classList.add("calendar", `Y${year}`, `M${month}`)

    // 月名のヘッダー部分
    const monthName = document.createElement("div");
    const getumei = document.createElement("div");
    const yoteiContainar = document.createElement("div");
    monthName.classList.add('month-name-containar');
    yoteiContainar.classList.add('yotei-containar');
    getumei.classList.add("month-name");
    getumei.innerText = month;
    yotei.forEach(v => {
         if (v[0] === month) {
             const div = document.createElement('div');
             div.classList.add('yotei');
             div.innerText = v[1];
             yoteiContainar.appendChild(div);
         }
    });
    monthName.appendChild(getumei);
    monthName.appendChild(yoteiContainar);
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