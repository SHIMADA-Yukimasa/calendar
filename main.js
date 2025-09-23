const bc = document.getElementById('bc');
const wareki = document.getElementById('wareki');
const eto = document.getElementById('eto');

const taishou = document.getElementById('taishou');
const shouwa = document.getElementById('shouwa');
const heisei = document.getElementById('heisei');

import { createCalendar } from './calendar.js'

bc.value = parseInt(new Date().getFullYear(), 10) + 1;

bc.oninput = () => {
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
    m.appendChild(createCalendar(parseInt(bc.value), i));
    }
};


bc.oninput();