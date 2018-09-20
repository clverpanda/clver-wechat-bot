const AccountBook = require('../../src/account_book/account_book');

test('account book is right', () => {
    const name = 'clver';
    const use = 'test';
    const amount = -5;
    const bookIns = new AccountBook(name, use, amount);
    expect(bookIns.Name).toBe(name);
    expect(bookIns.Use).toBe(use);
    expect(bookIns.Amount).toBe(amount);
});