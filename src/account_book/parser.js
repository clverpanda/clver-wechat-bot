const AccountBook = require('./account_book');

const prefix = '记账';

const parser = (userName, inputString) => {
    if (!inputString.startsWith(prefix)) return null;
    const reg = /\s+/;
    const splittedString = inputString.split(reg);
    if (splittedString.length !== 3 || splittedString[0] !== prefix) return null;
    const amount = parseFloat(splittedString[2]);
    if (isNaN(amount) || !isFinite(amount)) return null;
    return new AccountBook(userName, splittedString[1], amount);
}

module.exports = parser;