
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
const yoteiArr = [];
yotei.forEach((v, i) => {
    const data = v.split(',');
    const date = data[2].split('/');
    if (year === parseInt(date[0]) && month === parseInt(date[1])) {
        yoteiArr.push(data[1]);
    }
});
const result = yoteiArr.join('<br>');
console.log(result)
return result;
}