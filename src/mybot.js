const {
    Wechaty
} = require('wechaty');
const Qrcode = require('qrcode-terminal');
const {
    FileBox
} = require('file-box');
const InitialConfig = require('./initial_config.json');
const KeyConfig = require('./key.json');
const SettingDo = require('./setting/do');
const ConfuteDo = require('./confute/do');
const AccountBookDo = require('./account_book/do');
const PS = require('./util/qq_api');
const { commonParams } = require('./util/util');

const QQ_APP_KEY = KeyConfig.QQ_APP_KEY;
const QQ_APP_ID = KeyConfig.QQ_APP_ID;

const bot = new Wechaty();
let config = InitialConfig;
bot.on('scan', (qrcode, status) => {
    console.log(`Scan QR Code to login: ${status}\n`);
    console.log(Qrcode.generate(qrcode, {
        small: true
    }));
});
bot.on('login', user => console.log(`User ${user} logined!`));
bot.on('message', async msg => {
    if (msg.type() === bot.Message.Type.Text) {
        if (msg.self()) {
            config = await SettingDo(msg, config);
            console.log(config);
        }

        const confuteRes = await ConfuteDo(msg, config);
        if (confuteRes) return;
        const accountRes = await AccountBookDo(msg, config);
        if (accountRes) return;
        
    } else if (msg.type() === bot.Message.Type.Image && msg.room()) {
        const imageBox = await msg.toFileBox();
        const image = await imageBox.toBase64();
        const room = msg.room();
        const topic = await room.topic();
        if (topic !== '[红包]爱国聪明牛逼屌青年群') {
            return;
        }
        const result = await PS('/fcgi-bin/ptu/ptu_facemerge', QQ_APP_KEY, Object.assign({}, commonParams(), {
            app_id: QQ_APP_ID,
            model: Math.round(Math.random() * 9 + 1),
            image: image,
        }));
        console.log(`图片结果：${result.ret}`);
        console.log(`图片结果：${result.msg}`);
        if (result.ret === 0) {
            const d = result.data;
            room.say(FileBox.fromBase64(d.image));
        }
    }
});
bot.start();