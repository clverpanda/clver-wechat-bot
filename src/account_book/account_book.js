const moment = require('moment');

class AccountBook {
    constructor(name, use, amount) {
        this.Name = name;
        this.Use = use;
        this.Amount = amount;
        this.Time = moment();
    }
}

class AccountBookExportInfo {
    constructor(chatName, date) {
        this.ChatName = chatName;
        this.Date = date;
    }
}

module.exports = AccountBook;
module.exports.ExportInfo = AccountBookExportInfo;