const Parser = require('./parser');
const InitialConfig = require('../initial_config.json');

const doFunc = async (msg, config) => {
    const text = msg.text();
    const room = msg.room();
    const configName = InitialConfig.config_name;
    if (room) {
      const topic = await room.topic();
      const setting = Parser(topic, text);
      if (!setting) return config;
      config[configName[setting.FuncName]] = setting.IsOn;
      const settingContactName = `${configName[setting.FuncName]}_contact`;
      if (setting.IsOn) {
          if (!config[settingContactName].includes(setting.ContactName)) {
            config[settingContactName].push(setting.ContactName);
          }
      } else {
        config[settingContactName] = config[settingContactName].filter(s => s !== setting.ContactName);
      }
      room.say(`-----${setting.FuncName}功能已${setting.IsOn ? '开启' : '关闭'}-----`);
      return config;
    } else {
        const toContact = msg.to();
        const setting = Parser(toContact.name(), text);
        if (!setting) return config;
        config[configName[setting.FuncName]] = setting.IsOn;
        const settingContactName = `${configName[setting.FuncName]}_contact`;
        if (setting.IsOn) {
            if (!config[settingContactName].includes(setting.ContactName)) {
              config[settingContactName].push(setting.ContactName);
            }
        } else {
          config[settingContactName] = config[settingContactName].filter(s => s === setting.ContactName);
        }
        toContact.say(`-----${setting.FuncName}功能已${setting.IsOn ? '开启' : '关闭'}-----`);
        return config;
    }
}

module.exports = doFunc;