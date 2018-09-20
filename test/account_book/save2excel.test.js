const fs = require('fs');
const path = require('path');
const AccountBook = require('../../src/account_book/account_book');
const Save2Excel = require('../../src/account_book/save2excel');

test('parser normal', () => {
    const chatName = 'clver-chat';
    const name = 'clver';
    const use = 'test';
    const amount = -5;
    const bookIns = new AccountBook(name, use, amount);
    Save2Excel(chatName, bookIns);
    const targetFileName = `${bookIns.Time.format('YYYY-MM')}_${chatName}.xlsx`;
    expect(fs.existsSync(path.join('../../src/account_book', targetFileName))).toBe(true);
});
