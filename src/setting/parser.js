const Setting = require('./setting');
const FuncKeywordsGetter = require('./setting_name_getter');
const prefix = '设置';
const onKeyword = '开启';
const offKeyword = '关闭';

const parser = (contactName, inputString) => {
    if (!inputString.startsWith(prefix)) return null;
    const reg = /\s+/;
    const splittedString = inputString.split(reg);
    if (splittedString.length !== 3 || splittedString[0] !== prefix) return null;
    if (!FuncKeywordsGetter().includes(splittedString[1])) return null;
    if (splittedString[2] !== onKeyword && splittedString[2] !== offKeyword) return null;
    return new Setting(splittedString[1], contactName, splittedString[2] === onKeyword);
}

module.exports = parser;