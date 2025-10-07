//  祝日のcsvを二次元配列に
export async function nationalHoliday(year) {

    async function csvToMap() {
        try {
            const Response = await fetch('syukujitsu.csv');
            if (!Response.ok) {
                throw new Error(`csvファイルが読めませんでした: ${Response.status} ${Response.statusText}`);
            }
            const text = await Response.text();
            const map = new Map();
            const arr = text.split(/\r\n|\n/);
            arr.forEach((v, i) => {
                const value = v.split(',');
                map.set(value[0], value[1]);
            });
            return map;
        } catch (error) {
            console.error(`csvファイルが読めませんでした: ${error}`);
        }
    };

    const syukujitsu = await csvToMap();
    for (let i = 1; i <= 366; i++) {
        const date = new Date(year, 0, i);
        const dateText = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        if (syukujitsu.get(dateText)) {
            const day = document.querySelector(`.m${date.getMonth() + 1}.d${date.getDate()}`);
            day.style.color = "hsl(0, 50%, 40%)";
        }
    }
}