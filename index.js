import TelegramBot from "node-telegram-bot-api";
import { countries, description, wallet } from "./constants.js";
import {toTwoDimensionalArray} from "./helpers.js";

const TOKEN = '7097038338:AAF6cFvhqDuggzm78YX-_uqJxEJTpo6zin0'


const bot = new TelegramBot(TOKEN, {
    polling: true
});

bot.on('message', async (msg) => {
    const {id} = msg.chat
    const text = msg.text
    try {
        switch (text){
            case '/start':
                return await bot.sendMessage(id, 'Привет! Я бот, который нужен для защиты диплома',
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{text:'Посмотреть список стран', callback_data: 'show_country'}],
                            ]
                        }
                    });
        }
    } catch (e){
        console.log(e)
    }
})

bot.on('callback_query', async (msg) => {

    const {id} = msg.message.chat
    const command = msg.data

    const sp = command.split('_')

    console.log(msg)

    if (!sp || !sp[0] || !sp[1]) return ;

    switch (sp[0]){
        case 'show':
            return await bot.sendMessage(id, `Список стран: ${countries.map((item, inx) => `\n${inx + 1 + '. ' + item.text}`).join('')}
            \n\nВыберете страну, что посмотреть списко доступных купюр в этой стране`,
                {
                    reply_markup: {
                        inline_keyboard:toTwoDimensionalArray(countries, 5, 4)
                    }
                });
        case 'country':
            return await bot.sendMessage(id, `Список доступных валют: ${wallet[sp[1]].map(item => `\n${item.text}`)}
                 \n\nВыберете номинал, чтобы посмотреть информацию о купюре`,
                {
                    reply_markup: {
                        inline_keyboard: [wallet[sp[1]]]
                    }
                });
        case "wallet":
            const str = `${sp[1]}_${sp[2]}`
            return await bot.sendMessage(id, description[str],
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: 'Назад к списку купюр', callback_data: `country_${sp[1]}`}],
                            [{text: 'Назад к списку стран', callback_data: `show_country`}]
                        ]
                    }
                });
    }
})
