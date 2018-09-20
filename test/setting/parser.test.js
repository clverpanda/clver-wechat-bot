const Parser = require('../../src/setting/parser');

test('parser fail', () => {
    const user = 'clverpanda';
    const testStr = '设置 第三方大师傅爱迪生发生大 啊是打发斯蒂芬 阿斯蒂芬撒';
    const result = Parser(user, testStr);
    expect(result).toBe(null);
});

test('parser fail1', () => {
    const user = 'clverpanda';
    const testStr = '设置 第三大 啊是打发斯蒂芬';
    const result = Parser(user, testStr);
    expect(result).toBe(null);
});

test('parser fail2', () => {
    const user = 'clverpanda';
    const testStr = 'adsf设置 第三方大师傅爱迪生发生大 啊是打发斯蒂芬 阿斯蒂芬撒';
    const result = Parser(user, testStr);
    expect(result).toBe(null);
});

test('parser fail3', () => {
    const user = 'clverpanda';
    const testStr = '设置 沙雕 开启';
    const result = Parser(user, testStr);
    expect(result).toBe(null);
});

test('parser normal', () => {
    const user = 'clverpanda';
    const testStr = '设置   记账             开启';
    const result = Parser(user, testStr);
    expect(result.FuncName).toBe('记账');
    expect(result.ContactName).toBe(user);
    expect(result.IsOn).toBe(true);
});

test('parser normal1', () => {
    const user = 'clverpanda';
    const testStr = '设置   记账           关闭';
    const result = Parser(user, testStr);
    expect(result.FuncName).toBe('记账');
    expect(result.ContactName).toBe(user);
    expect(result.IsOn).toBe(false);
});

test('parser normal2', () => {
    const user = 'clverpanda';
    const testStr = '设置   反驳             开启';
    const result = Parser(user, testStr);
    expect(result.FuncName).toBe('反驳');
    expect(result.ContactName).toBe(user);
    expect(result.IsOn).toBe(true);
});
