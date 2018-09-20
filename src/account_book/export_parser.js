const { ExportInfo } = require('./account_book');
const moment = require('moment');

const prefix = '记账';
const midContent = '导出';

const parser = (chatName, inputString) => {
    if (!inputString.startsWith(prefix)) return null;
    const reg = /\s+/;
    const splittedString = inputString.split(reg);
    if (splittedString.length !== 3 || splittedString[0] !== prefix || splittedString[1] !== midContent) return null;
    const date = moment(splittedString[2]);
    if (!date.isValid()) return null;
    return new ExportInfo(chatName, date.format('YYYY-MM'));
}

module.exports = parser;