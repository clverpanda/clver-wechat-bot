const InitialConfig = require('../initial_config.json');

const getter = () => {
    const result = [];
    Object.getOwnPropertyNames(InitialConfig.config_name).forEach(key => {
        result.push(key);
    });
    return result;
}

module.exports = getter;