const { readdirSync } = require('fs');
const { count } = require('console');
const ascii = require('ascii-table');
let table = new ascii("Commands");
table.setHeading('COMMAND', ' Tình Trạng ');

module.exports = (client) => {
    let count = 0
    readdirSync('./Commands').forEach(dir => {
        const commands = readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith('.js'))
        for (let file of commands) {
            let pull = require(`../Commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '🔹 Hoạt động')
                count++
            } else {
                table.addRow(file, '🔸 Chưa chạy')
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());
    console.log(`Đã load ${count} commands! ✅`)
}