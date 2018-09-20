const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const save2excel = (chatName, item) => {
    const targetFileName = `${item.Time.format('YYYY-MM')}_${chatName}.xlsx`;
    const targetFilePath = path.join(__dirname, targetFileName);
    if (fs.existsSync(targetFilePath)) {
        const wb = XLSX.readFile(targetFilePath);
        const first_sheet_name = wb.SheetNames[0];
        const worksheet = wb.Sheets[first_sheet_name];
        const ws_data = [
            [item.Time.format('YYYY-MM-DD HH:mm:ss'), item.Name, item.Use, item.Amount]
        ];
        XLSX.utils.sheet_add_aoa(worksheet, ws_data, {origin: -1});
        XLSX.writeFile(wb, targetFilePath);
    } else {
        const wb = XLSX.utils.book_new();
        const new_ws_name = "记账单";
        const ws_data = [
            ["时间", "姓名", "用途", "花费"],
            [item.Time.format('YYYY-MM-DD HH:mm:ss'), item.Name, item.Use, item.Amount]
        ];
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, new_ws_name);
        XLSX.writeFile(wb, targetFilePath);
    }
};

module.exports = save2excel;