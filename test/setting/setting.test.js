const Setting = require('../../src/setting/setting');

test('setting is right', () => {
    const funcName = 'clver';
    const contactName = 'test';
    const isOn = false;
    const settingIns = new Setting(funcName, contactName, isOn);
    expect(settingIns.FuncName).toBe(funcName);
    expect(settingIns.ContactName).toBe(contactName);
    expect(settingIns.IsOn).toBe(isOn);
});