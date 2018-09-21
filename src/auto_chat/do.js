const KeyConfig = require('../key.json');
const PS = require('../util/qq_api');
const { commonParams } = require('../util/util');

const QQ_APP_KEY = KeyConfig.QQ_APP_KEY;
const QQ_APP_ID = KeyConfig.QQ_APP_ID;

const SESSION_IDS = {};

const getNextId = (i => () => i++)(10000);

const getSessionId = contactName => {
    if (SESSION_IDS[contactName]) {
        return SESSION_IDS[contactName];
    } else {
        const id = getNextId();
        SESSION_IDS[contactName] = id;
        return id;
    }
}

const getChatResult = async (contactName, text) => {
    const result = await PS('/fcgi-bin/nlp/nlp_textchat', QQ_APP_KEY, Object.assign({}, commonParams(), {
        app_id: QQ_APP_ID,
        session: getSessionId(contactName),
        question: text
    }));
    console.log(result);
    if (result.ret === 0) {
        const d = result.data || {};
        room.say(d.answer || 'shit!');
    } else {
        return null;
    }
}

const AutoChatDo = async (msg, config) => {
    if (!config.auto_chat || msg.self()) return 0;

    const contact = msg.from();
    const text = msg.text();
    const room = msg.room();
    if (room) {
      const topic = await room.topic();
      if (!config.auto_chat_contact.includes(topic)) return 0;
      if (text.includes('哥') || text.includes('爸') || text.includes('弟')) {
          room.say('我是你哥！');
      } else {
        const res = await getChatResult(topic, text);
        if (res) room.say(res);
      }
    } else {
      const name = contact.name();
      if (!config.auto_chat_contact.includes(name)) return 0;
      const res = await getChatResult(name, text);
      if (res) contact.say(res);
    }
    return 1;
};

module.exports = AutoChatDo;