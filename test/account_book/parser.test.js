const Parser = require('../../src/account_book/parser');

test('parser normal', () => {
    const user = 'clverpanda';
    const testStr = '记账 第三方大师傅爱迪生发生大 -10元';
    const result = Parser(user, testStr);
    expect(result.Amount).toBe(-10);
    expect(result.Name).toBe(user);
    expect(result.Use).toBe('第三方大师傅爱迪生发生大');
});

test('parser other', () => {
    const user = null;
    const testStr = '记账                     第三方大师傅爱迪生发生大                      11010元';
    const result = Parser(user, testStr);
    expect(result.Amount).toBe(11010);
    expect(result.Name).toBe(user);
    expect(result.Use).toBe('第三方大师傅爱迪生发生大');
});

test('parser other1', () => {
    const user = null;
    const testStr = '记账                     第三方大师傅爱迪生发生大                      11010';
    const result = Parser(user, testStr);
    expect(result.Amount).toBe(11010);
    expect(result.Name).toBe(user);
    expect(result.Use).toBe('第三方大师傅爱迪生发生大');
});

test('parser fail', () => {
    const user = 'clverpanda';
    const testStr = '暗示法法师记账 第三方大师傅爱迪生发生大 -10元';
    const result = Parser(user, testStr);
    expect(result).toBe(null);
});

test('parser fail1', () => {
    const user = 'clverpanda';
    const testStr = '记账 第三方大师傅爱迪生发生大 沙雕';
    const result = Parser(user, testStr);
    expect(result).toBe(null);
});

test('parser fail2', () => {
    const user = 'clverpanda';
    const testStr = '记账 第三方大师傅爱迪生发生大 沙雕 -10元';
    const result = Parser(user, testStr);
    expect(result).toBe(null);
});