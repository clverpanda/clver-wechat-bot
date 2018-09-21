const { FileBox } = require('file-box');
const path = require('path');
const fs = require('fs');
const Parser = require('./parser');
const ExportParser = require('./export_parser');
const Save2Excel = require('./save2excel');

const AccountBookDo = async (msg, config) => {
    if (!config.account_book) return 0;
    const contact = msg.from();
    const text = msg.text();
    const room = msg.room();
    if (room) {
        const topic = await room.topic();
        if (!config.account_book_contact.includes(topic)) return 0;
        const exportItem = ExportParser(topic, text);
        if (exportItem) {
            const exportFileName = `${exportItem.Date}_${exportItem.ChatName}.xlsx`;
            const exportFilePath = path.join(__dirname, exportFileName);
            const exportFile = FileBox.fromFile(exportFilePath);
            if (fs.existsSync(exportFilePath)) {
                room.say(exportFile);
            } else {
                room.say(`找不到${exportItem.Date}的账单！`);
            }
            return 0;
        }
        const item = Parser(contact.name(), text);
        if (!item) return 0;
        Save2Excel(topic, item);
        room.say(`--已记录${item.Name}在${item.Time.format('YYYY-MM-DD HH:mm:ss')}${item.Use}，${item.Amount > 0 ? '获得' : '花掉'}${Math.abs(item.Amount)}元--`);
    } else {
        const name = contact.name();
        const toContact = msg.to();

        if (msg.self()) {
            if (!config.account_book_contact.includes(toContact.name())) return 0;
            const exportItem = ExportParser(toContact.name(), text);
            if (exportItem) {
                const exportFileName = `${exportItem.Date}_${exportItem.ChatName}.xlsx`;
                const exportFilePath = path.join(__dirname, exportFileName);
                const exportFile = FileBox.fromFile(exportFilePath);
                if (fs.existsSync(exportFilePath)) {
                    toContact.say(exportFile);
                } else {
                    toContact.say(`找不到${exportItem.Date}的账单！`);
                }
                return 0;
            }
            const item = Parser(name, text);
            if (!item) return 0;
            Save2Excel(toContact.name(), item);
            toContact.say(`--已记录${item.Name}在${item.Time.format('YYYY-MM-DD HH:mm:ss')}${item.Use}，${item.Amount > 0 ? '获得' : '花掉'}${Math.abs(item.Amount)}元--`);
        } else {
            if (!config.account_book_contact.includes(name)) return 0;
            const exportItem = ExportParser(name, text);
            if (exportItem) {
                const exportFileName = `${exportItem.Date}_${exportItem.ChatName}.xlsx`;
                const exportFilePath = path.join(__dirname, exportFileName);
                const exportFile = FileBox.fromFile(exportFilePath);
                if (fs.existsSync(exportFilePath)) {
                    contact.say(exportFile);
                } else {
                    contact.say(`找不到${exportItem.Date}的账单！`);
                }
                return 0;
            }
            const item = Parser(name, text);
            if (!item) return 0;
            Save2Excel(name, item);
            contact.say(`--已记录${item.Name}在${item.Time.format('YYYY-MM-DD HH:mm:ss')}${item.Use}，${item.Amount > 0 ? '获得' : '花掉'}${Math.abs(item.Amount)}元--`);
        }
    }
    return 1;
}

module.exports = AccountBookDo;