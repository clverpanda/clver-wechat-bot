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
        if (msg.room() && !msg.self()) {
            const room = msg.room();
            const topic = await room.topic();
            if (topic === '[红包]爱国聪明牛逼屌青年群') {
                const result = await PS('/fcgi-bin/nlp/nlp_textchat', QQ_APP_KEY, Object.assign({}, commonParams(), {
                    app_id: QQ_APP_ID,
                    session: '[红包]爱国聪明牛逼屌青年群',
                    question: msg.text()
                }));
                if (result.ret === 0) {
                    room.say(result.answer);
                }
            }
        }
    } else if (msg.type() === bot.Message.Type.Image && msg.room()) {
        const imageBox = await msg.toFileBox();
        const image = await imageBox.toBase64();
        const room = msg.room();
        const topic = await room.topic();
        if (topic !== '[红包]爱国聪明牛逼屌青年群') {
            return;
        }
        const result = await PS('/fcgi-bin/face/face_faceidentify', QQ_APP_KEY, Object.assign({}, commonParams(), {
            app_id: QQ_APP_ID,
            image: image,
            group_id: 'group0',
            topn: 3,
        }));
        console.log(result);
        if (result.ret === 0) {
            const d = result.data || {};
            const cans = d.candidates || [];
            const cansorted = cans.sort((a,b) => b.confidence - a.confidence);
            const man = cansorted[0] || {};
            const id = man.person_id;
            const confidence = man.confidence;
            let name = '';
            switch (id) {
                case 'person0':
                    name = '陆猩';
                    break;
                case 'person1':
                    name = '傻屌哲';
                    break;
                case 'person2':
                    name = '菜鸡岩';
                    break;
            }
            let resultVerified = false;
            const verifyResult = await PS('/fcgi-bin/face/face_faceverify', QQ_APP_KEY, Object.assign({}, commonParams(), {
                app_id: QQ_APP_ID,
                image: image,
                person_id: id,
            }));
            console.log(verifyResult);
            if (verifyResult.ret === 0) {
                const data = verifyResult.data || {};
                if (data.ismatch && data.ismatch > 0) {
                    resultVerified = true;
                }
            }
            room.say(resultVerified ? `这傻脸，一看就是${name}！` : `${Math.floor(confidence / 10)}成是${name}`);
        }
    }
});
bot.start();