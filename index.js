const TelegramApi = require('node-telegram-bot-api')
    //const moment = require('moment')
const token = "5451541949:AAHsC7OB0ocpbYcsbXFbXGRLP0XcwCAkkvk"
const bot = new TelegramApi(token, { polling: true })
const { startKeyboard, catalog, subcatalog, keyboard3, doneKeyboard, backToCatalog, backToMain, yesOrNo1, yesOrNo2, startKeyboard1 } = require('./options')
var CronJob = require('cron').CronJob;
const fs = require('fs')
var fetch = require("cross-fetch")
const nodemailer = require('nodemailer')
const creds = require('./winter-alliance-357412-853d34b20690.json'); // the file saved above
const { GoogleSpreadsheet } = require('google-spreadsheet');
const startmsg = fs.readFileSync("messages/startmsg.txt", "utf8")
const whatis = fs.readFileSync("messages/whatis.txt", "utf8")
const wheretobuy = fs.readFileSync("messages/wheretobuy.txt", "utf8")
const logo = fs.readFileSync("messages/lavkalavka.png")
const feedback = fs.readFileSync("messages/feedback.txt", "utf8")
const trouble = fs.readFileSync("messages/trouble.txt", "utf8")
const thankyou = fs.readFileSync("messages/thankyou.txt", "utf8")
const doyouwant = fs.readFileSync("messages/doUWant.txt", "utf8")
const describe = fs.readFileSync("messages/describe.txt", "utf8")
const doc = new GoogleSpreadsheet('14MTCNlVJnKILjrFh1BkH_t5AJneYbKPgAtiMT_bRsA0');
var result;
var usernametr;
var flag1 = false;
var flag2 = false;
var flag3 = false;


const flow = require('nimble');
const { setTimeout } = require('timers/promises')
var b22 = ''
var g;
var a;
var b;
var c;
var d;
var e;

const feedBack = (chatId) => {

    bot.sendMessage(chatId, feedback, {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: '+', callback_data: '+' }],
                [{ text: '-', callback_data: '-' }]
            ],
        }),
        parse_mode: 'Markdown'

    })

}
let getData = async(fileId) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(`https://api.telegram.org/bot5451541949:AAHsC7OB0ocpbYcsbXFbXGRLP0XcwCAkkvk/getFile?file_id=${fileId}`, requestOptions);
    result = await response.json();

};


const transporter = nodemailer.createTransport({
    service: 'Mail.ru',
    auth: {
        user: 'lavkafeedback@mail.ru',
        pass: 'NBPae9mhaCXs3ZPFpxqk'
    }
});


const sendEmail = (userrname, whatisit, feed, url) => {

    var mailOptions = {
        from: 'lavkafeedback@mail.ru',
        to: 'aybormotov343@gmail.com',
        subject: `Новый в ${whatisit}  телеграм-боте`,
        text: `Новый ${whatisit}  в телеграм-боте от t.me/${userrname}: \n \n " ${feed} "  \n \n  ${url} `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const start = async() => {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    bot.setMyCommands([
        { command: '/start', description: 'Начало работы с ботом (возврат в главное меню)' },
        { command: '/catalog', description: 'Каталог продукции' }

    ])
    bot.on('message', msg => {
        const text = msg.text
        const chatId = msg.chat.id
        const firstname = msg.chat.first_name
        const lastname = msg.chat.last_name
        const username = msg.chat.username
        const msg_id = msg.message_id
        console.log(msg)

        if (text === '/start') {

            return bot.sendMessage(chatId, startmsg, startKeyboard)
                // getFullCatalog()
                //console.log(startmsg)
                //getCatalog()
        }

        if (text === '/help') {


        }
        if (text === '/getConfig') {

            //if (user.vpnconfig != '') { bot.sendDocument(chatId, requeest(user.vpnconfig), { caption: 'Ваш конфиг' }) }
            return bot.sendMessage(chatId, 'Что-то я не вижу вас в своей базе данных =( Скорее всего вы еще не получили конфиг.')
        }
        if (text === '/catalog') {


            return bot.sendMessage(chatId, 'Каталог продукции:', catalog)

        }
        // return bot.sendMessage(chatId, 'Я вас не понимаю')


    })


    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === 'main') {
            return bot.sendMessage(chatId, startmsg, startKeyboard)
        }
        if (data === '+') {
            // getFullCatalog()
            await bot.sendMessage(chatId, 'Благодарим за выбор и доверие!')

        }
        if (data === '-') {
            // getFullCatalog()
            bot.sendMessage(chatId, trouble)

            if (!flag1) {
                bot.on('message', async(msgg) => {

                    const text = msgg.text
                    const username = msgg.chat.username

                    if (msgg.caption === '' || msgg.caption === undefined) { bot.sendMessage(chatId, 'Отзыв обязательно должен быть в формате "Фотография + описание к ней", а не просто текст!') } else {
                        const fileId = msgg.photo[3].file_id
                        const firstname = msgg.chat.first_name
                        const lastname = msgg.chat.last_name

                        const msg_id = msgg.message_id
                        const caption = msgg.caption
                        console.log(msg)
                        await getData(fileId)
                        let filePath = await result.result.file_path
                        var fileLink = await `https://api.telegram.org/file/bot${token}/${filePath}`
                        await console.log(fileLink)
                        await sendEmail(username, 'отрицательный отзыв в', caption, fileLink)
                        await bot.sendMessage(chatId, thankyou, startKeyboard1)

                    }
                    flag1 = await true

                    // if (text != '' && flag === true) {
                    //     console.log(msg)
                    //     return bot.sendMessage(chatId, thankyou, startKeyboard1)
                    // } // return sendEmail(username, msgg.caption) } //bot.sendMessage(5219343362, `Отрицательный отзыв от t.me/${username}: \n \n "${msgg.caption}"`) }

                })
            }

        }
        if (data === 'Yes1') {
            bot.sendMessage(chatId, doyouwant, yesOrNo2)
        }
        if (data === '1') {
            // getFullCatalog()
            await bot.sendPhoto(chatId, logo, { caption: whatis })

        }

        if (data === '2') {
            //await getFullCatalog()
            //await bot.sendMessage(chatId, 'Обновляем каталог...')
            bot.sendMessage(chatId, 'Каталог продукции:', catalog)
        }
        if (data === '3') {
            return bot.sendMessage(chatId, wheretobuy)
        }
        if (data === '4') {
            return feedBack(chatId)
        }
        if (data === '5') {
            return bot.sendMessage(chatId, 'Вы хотите стать участником проекта LavkaLavka?', yesOrNo1)
        }
        if (data === '6') {
            bot.sendMessage(chatId, 'Если остались какие-то вопросы, напишите нам и мы обязательно ответим! 🙂')
            if (!flag2) {
                bot.on('message', async(msggg) => {
                    const text = msggg.text
                        //const fileId = msggg.photo[3].file_id
                    const firstname = msggg.chat.first_name
                    const lastname = msggg.chat.last_name
                    const username = msggg.chat.username
                    const msg_id = msggg.message_id

                    if (text != '') {
                        await sendEmail(username, 'вопрос от клиента', text, '');
                        await bot.sendMessage(chatId, 'Благодарим! Чем я могу Вам помочь? ', startKeyboard1)
                    }
                    flag2 = true
                })
            }
        }
        if (data === 'No1' || data === 'No2') {
            return bot.sendMessage(chatId, 'Чем я могу Вам помочь?', startKeyboard1)
        }

        if (data === 'Yes2') {
            bot.sendMessage(chatId, describe)
            if (!flag3) {
                bot.on('message', async(msggg) => {
                    const text = msggg.text
                        //const fileId = msggg.photo[3].file_id
                    const firstname = msggg.chat.first_name
                    const lastname = msggg.chat.last_name
                    const username = msggg.chat.username
                    const msg_id = msggg.message_id
                    if (text != '') {
                        await sendEmail(username, 'тикет на сотрудничество', text, '');
                        await bot.sendMessage(chatId, 'Спасибо за обратную связь, Ваш запрос передан специалисту.', backToMain)
                    }
                    flag3 = true
                })
            }
        }
        if (data === 'back') {
            return bot.sendMessage(chatId, 'Каталог продукции:', catalog)
        }
        if (data === '2_1') {
            var sheet = doc.sheetsByTitle['Сыры']
            await sheet.loadCells("A1:Z3")
            for (let i = 2; i <= 26; i++) {
                if (sheet.getCell(0, i).value === null) { break }
                g = i;
            }

            for (let i = 2; i <= g; i++) {
                let str = sheet.getCell(1, i).value + '' + '\n' + '' + '\n' + sheet.getCell(2, i).value
                    //bot.sendMessage(chatId, str, { parse_mode: 'Markdown' })
                await bot.sendPhoto(chatId, sheet.getCell(0, i).value, {
                        caption: str,
                        parse_mode: 'markdown',
                        reply_markup: JSON.stringify({
                            inline_keyboard: [
                                [{ text: '◀️', callback_data: 'back' }]

                            ]
                        }),
                    })
                    // await bot.sendMessage(chatId, 'Назад в каталог', backToCatalog)
            }

            //return bot.sendMessage(chatId, `sfd ${cheesenames[1]}`)

        }

        if (data === '2_2') {
            var sheet = doc.sheetsByTitle['Творог, творожный крем']
            await sheet.loadCells("A1:Z3")
            for (let i = 2; i <= 26; i++) {
                if (sheet.getCell(0, i).value === null) { break }
                a = i;
            }
            for (let i = 2; i <= a; i++) {
                let str = sheet.getCell(1, i).value + '' + '\n' + '' + '\n' + sheet.getCell(2, i).value
                    //bot.sendMessage(chatId, str, { parse_mode: 'Markdown' })
                await bot.sendPhoto(chatId, sheet.getCell(0, i).value, {
                    caption: str,
                    parse_mode: 'markdown',
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{ text: '◀️', callback_data: 'back' }]

                        ]
                    }),
                })
            }

        }
        if (data === '2_3') {
            return bot.sendMessage(chatId, 'Готовая еда:', subcatalog)
        }
        if (data === '3_1') {
            var sheet = doc.sheetsByTitle['Готовая еда']
            await sheet.loadCells("A1:Z3")
            for (let i = 2; i <= 26; i++) {
                if (sheet.getCell(0, i).value === null) { break }
                b = i;
            }
            for (let i = 2; i <= b; i++) {
                let str = sheet.getCell(1, i).value + '' + '\n' + '' + '\n' + sheet.getCell(2, i).value
                await bot.sendPhoto(chatId, sheet.getCell(0, i).value, {
                    caption: str,
                    parse_mode: 'markdown',
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{ text: '◀️', callback_data: 'back' }]

                        ]
                    }),
                })
            }
        }
        if (data === '3_2') {
            var sheet = doc.sheetsByTitle['Готовая еда']
            await sheet.loadCells("A4:Z6")
            for (let i = 2; i <= 26; i++) {
                if (sheet.getCell(3, i).value === null) { break }
                с = i;
            }
            for (let i = 2; i <= с; i++) {
                let str = sheet.getCell(4, i).value + '' + '\n' + '' + '\n' + sheet.getCell(5, i).value
                await bot.sendPhoto(chatId, sheet.getCell(3, i).value, {
                    caption: str,
                    parse_mode: 'markdown',
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{ text: '◀️', callback_data: 'back' }]

                        ]
                    }),
                })
            }
        }
        if (data === '3_3') {

            var sheet = doc.sheetsByTitle['Готовая еда']
            await sheet.loadCells("A7:Z9")
            for (let i = 3; i <= 26; i++) {
                if (sheet.getCell(6, i).value === null) { break }
                d = i;
            }
            console.log(d)
            for (let i = 3; i <= d; i++) {
                let str = sheet.getCell(7, i).value + '' + '\n' + '' + '\n' + sheet.getCell(8, i).value

                await bot.sendPhoto(chatId, sheet.getCell(6, i).value, {
                    caption: str,
                    parse_mode: 'markdown',
                    contentType: 'multipart/form-data',
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{ text: '◀️', callback_data: 'back' }]

                        ]
                    }),
                })
            }
        }
    })
}

// const getCatalogCheese = async() => {

//     await doc.useServiceAccountAuth(creds);
//     await doc.loadInfo();
//     var sheet = doc.sheetsByTitle['Сыры']; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
//     //   const rows = sheet.getRows();
//     await sheet.loadCells('A1:Z3'); // loads range of cells into local cache - DOES NOT RETURN THE CELLS

//     for (let i = 2; i <= 26; i++) {

//         if (sheet.getCell(0, i).value === null) { break }
//         g = i;
//     }

//     for (let i = 2; i <= g; i++) {
//         cheesephotos[i] = await sheet.getCell(0, i).value
//         cheesenames[i] = await sheet.getCell(1, i).value
//         cheesecapts[i] = await sheet.getCell(2, i).value
//             // console.log(sheet.getCell(0, i).value)
//     }
//     console.log(g)
//     console.log(cheesenames)

// }

// const getCatalogTvorog = async() => {

//     await doc.useServiceAccountAuth(creds);
//     await doc.loadInfo();
//     var sheet = doc.sheetsByTitle['Творог, творожный крем']
//     await sheet.loadCells('A1:Z3')

//     for (let i = 2; i <= 26; i++) {

//         if (sheet.getCell(0, i).value === null) { break }
//         b = i;
//     }

//     for (let i = 2; i <= b; i++) {
//         tvorogphotos[i] = await sheet.getCell(0, i).value
//         tvorognames[i] = await sheet.getCell(1, i).value
//         tvorogcapts[i] = await sheet.getCell(2, i).value
//             // console.log(sheet.getCell(0, i).value)
//     }
//     console.log(tvorognames)
// }
// const getCatalogSoup = async() => {

//     await doc.useServiceAccountAuth(creds);
//     await doc.loadInfo();
//     var sheet = doc.sheetsByTitle['Готовая еда']
//     await sheet.loadCells('A1:Z3')

//     for (let i = 2; i <= 10; i++) {

//         if (sheet.getCell(0, i).value === null) { break }
//         c = i;
//     }

//     for (let i = 2; i <= c; i++) {
//         soupphotos[i] = await sheet.getCell(0, i).value
//         soupnames[i] = await sheet.getCell(1, i).value
//         soupcapts[i] = await sheet.getCell(2, i).value
//             // console.log(sheet.getCell(0, i).value)
//     }
//     console.log(c)
//     console.log(soupnames)
// }
// const getCatalogSecond = async() => {

//     await doc.useServiceAccountAuth(creds);
//     await doc.loadInfo();
//     var sheet = sheet = doc.sheetsByTitle['Готовая еда']
//     await sheet.loadCells('A4:Z6')

//     for (let i = 2; i <= 10; i++) {

//         if (sheet.getCell(3, i).value === null) { break }
//         d = i;
//     }
//     console.log(d)
//     for (let i = 2; i <= d; i++) {
//         secondphotos[i] = await sheet.getCell(3, i).value
//         secondnames[i] = await sheet.getCell(4, i).value
//         secondcapts[i] = await sheet.getCell(5, i).value
//             // console.log(sheet.getCell(0, i).value)
//     }
//     // console.log(d)
//     // console.log(secondphotos)
//     console.log(secondnames)
// }
// const getCatalogPorridge = async() => {

//     await doc.useServiceAccountAuth(creds);
//     await doc.loadInfo();
//     var sheet = doc.sheetsByTitle['Готовая еда']
//     await sheet.loadCells('A6:Z9')

//     for (let i = 2; i <= 10; i++) {

//         if (sheet.getCell(6, i).value === null) { break }
//         e = i;
//     }

//     for (let i = 2; i <= e; i++) {
//         porridgephotos[i] = await sheet.getCell(6, i).value
//         porridgenames[i] = await sheet.getCell(7, i).value
//         porridgecapts[i] = await sheet.getCell(8, i).value
//             // console.log(sheet.getCell(0, i).value)
//     }
//     console.log(porridgenames)
// }

// const getFullCatalog = async() => {

//         await getCatalogSoup()
//         await getCatalogSecond()
//         await getCatalogPorridge()
//         await getCatalogCheese()
//         await getCatalogTvorog()


//     }
//     // getFullCatalog()

// const job = new CronJob('0 */10 * * * *', function() {
//     const d = new Date();
//     console.log('Every Tenth Minute:', d);
//     getFullCatalog()
// });
// console.log('After job instantiation');
// job.start();

start()

// setInterval(() => {
//     getFullCatalog()
//     console.log("Done!")
// }, 1000)