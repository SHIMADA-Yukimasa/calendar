const bc = document.getElementById('bc');
const wareki = document.getElementById('wareki');
const eto = document.getElementById('eto');

const taishou = document.getElementById('taishou');
const shouwa = document.getElementById('shouwa');
const heisei = document.getElementById('heisei');
import { createCalendar } from './calendar.js'
import { nationalHoliday } from './nationalHoliday.js'

// Dateオブジェクトを受け取っての日数の差を返すポリフィル
if(Date.prototype.diffDays) {
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
}

bc.value = parseInt(new Date().getFullYear(), 10) + 1;

bc.oninput = async () => {
    const thisYear = parseInt(bc.value, 10);
    // 令和の計算
    wareki.innerText = `令和${thisYear - 2018}年`; 
    // 平成の計算
    heisei.innerText = `平成${thisYear - 1988}年`;
    // 昭和の計算
    shouwa.innerText = `昭和${thisYear - 1925}年`;
    // 大正の計算
    taishou.innerText = `大正${thisYear - 1911}年`;
    // 十干十二支
    const kan = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'];
    const kanKana = ['かのえ', 'かのと', 'みずのえ', 'みずのと', 'きのえ', 'きのと', 'ひのえ','ひのと', 'つちのえ', 'つちのと']
    const shi = [ '申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'];
    const shiKana = ["さる", "とり", "いぬ", "い", "ね", "うし", "とら", "う", "たつ", "み", "うま", "ひつじ"]
    eto.innerHTML = `<ruby>${kan[thisYear % 10]}<rp>(</rp><rt>${kanKana[thisYear % 10]}</rt><rp>)</rp><ruby> <ruby>${shi[thisYear % 12]}<rp>(</rp><rt>${shiKana[thisYear % 12]}</rt><rp>)</rp><ruby>`;

    // TODO カレンダー作成
    for (let i = 1; i <= 12 ; i++) {
        const m = document.getElementById(`m${i}`);
        while(m.firstChild) {
            m.removeChild(m.firstChild);
        }
    m.appendChild(await createCalendar(parseInt(bc.value), i));
    }

    // 祝日の処理
    nationalHoliday(thisYear);
};


bc.oninput();