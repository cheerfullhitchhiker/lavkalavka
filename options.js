module.exports = {

    startKeyboard: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Что такое "LavkaLavka"?', callback_data: '1' }],
                [{ text: 'Каталог продукции', callback_data: '2' }],
                [{ text: 'Где купить', callback_data: '3' }],
                [{ text: 'Отзывы', callback_data: '4' }],
                [{ text: 'Сотрудничество', callback_data: '5' }],
                [{ text: 'Задайте вопрос', callback_data: '6' }]
            ],
        }),
        parse_mode: 'Markdown'
    },
    catalog: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Сыры', callback_data: '2_1' }],
                [{ text: 'Творог, творожный крем', callback_data: '2_2' }],
                [{ text: 'Готовая еда', callback_data: '2_3' }]

            ],
        }),
        parse_mode: 'Markdown'
    },
    subcatalog: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Супы', callback_data: '3_1' }],
                [{ text: 'Вторые блюда', callback_data: '3_2' }],
                [{ text: 'Каши', callback_data: '3_3' }]
            ],
        }),
        parse_mode: 'Markdown'
    },
    keyboard3: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Все получилось', callback_data: '6' }],
                [{ text: 'Нужна помощь', callback_data: 'ask' }]
            ],
        }),
        parse_mode: 'Markdown'
    },
    doneKeyboard: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Подробная инструкция', callback_data: 'instruction' }],
                [{ text: 'Получить еще конфиг', callback_data: 'getconfig' }]
                [{ text: 'Задать вопрос', callback_data: 'ask' }]
            ],
        }),
        parse_mode: 'Markdown'
    },
    backToCatalog: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: '◀️ В каталог', callback_data: 'back' }]

            ]
        }),
        parse_mode: 'Markdown'
    },

    backToMain: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: '◀️ В главное меню', callback_data: 'main' }]

            ]
        }),
        parse_mode: 'Markdown'
    },
    yesOrNo1: {
        reply_markup: JSON.stringify({
            inline_keyboard: [

                [{ text: 'Да', callback_data: 'Yes1' }],
                [{ text: 'Нет', callback_data: 'No1' }]



            ]
        }),
    },
    yesOrNo2: {
        reply_markup: JSON.stringify({
            inline_keyboard: [

                [{ text: 'Да', callback_data: 'Yes2' }],
                [{ text: 'Нет', callback_data: 'No2' }]



            ]
        }),
    },

    startKeyboard1: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Что такое "LavkaLavka"?', callback_data: '1' }],
                [{ text: 'Каталог продукции', callback_data: '2' }],
                [{ text: 'Где купить', callback_data: '3' }],
                [{ text: 'Отзывы', callback_data: '4' }],
                [{ text: 'Сотрудничество', callback_data: '5' }],
                [{ text: 'Задайте вопрос', callback_data: '6' }]
            ],
        }),
        parse_mode: 'Markdown'
    }

}