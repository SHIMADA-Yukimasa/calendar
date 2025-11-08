
// Dateオブジェクトを受け取っての日数の差を返すポリフィル
Date.prototype.diffDays = function (otherDate) {
        // 入力がDateオブジェクトか確認
        if (!(otherDate instanceof Date) || isNaN(otherDate)) {
            throw new TypeError('引数は有効なDateオブジェクトである必要があります');
        }

        // 自身が有効な値を持つか確認
        if (isNaN(this)) {
            throw new TypeError('自身は有効な値をもつ必要があります');
        }

        const diffms = Math.abs(this - otherDate);
        const result = Math.floor(diffms / (1000 * 60 * 60 * 24));

        return result;
    }

export async function eventAdd(year, month) {
    const monthData = document.getElementById('month-data');

async function csvToArr() {
    try {
        const Response = await fetch('yotei.csv');
        if (!Response.ok) {
            throw new Error(`csvファイルが読めませんでした: ${Response.status} ${Response.statusText}`);
        }
            const text = await Response.text();
            const arr = text.split(/\r\n|\n/);
            arr.forEach((v,i) => {
                const value = v.split(',');
            });
            return arr;
    } catch(error) {
        console.error(`csvファイルが読めませんでした: ${error}`);
    }
};

const  tmp = await csvToArr();
const yotei = tmp.filter(v => Boolean(v));
const yoteiDiv = document.createElement('div');
let yoteiData = [];
let yoteiID = 1;
yoteiDiv.classList.add('yotei-containar');
yotei.forEach((v, i) => {
    const value = document.createElement('div');
    const data = v.split(',');
    const start = data[2].split('/');
    const end = data[3].split('/');
    if ((year === parseInt(start[0]) && month === parseInt(start[1]))
      || year === parseInt(end[0]) && month === parseInt(end[1])) {
        value.classList.add(`yotei-${yoteiID++}`);
        yoteiData.push(data);
        value.innerText = data[1];
        yoteiDiv.appendChild(value);
    } });
return [yoteiDiv, yoteiData];
}