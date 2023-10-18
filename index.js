// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const app = express();
// const port = process.env.PORT || 3001;

// // Подключение к MongoDB
// mongoose.connect('mongodb+srv://admin:zuzjKxEG7hFj8MjB@cluster0.padny.mongodb.net/article?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
// db.once('open', () => {
//     console.log('Успешное подключение к MongoDB');
// });

// // Модель для записей
// const RecordSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     uniqueAddress: String,
// });

// const Record = mongoose.model('Record', RecordSchema);

// app.use(bodyParser.json());

// // Разрешение CORS (если вы разрабатываете клиентскую часть на другом домене)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

// // Маршрут для добавления записи
// app.post('/api/records', (req, res) => {
//     const { title, content, uniqueAddress } = req.body;
//     const newRecord = new Record({ title, content, uniqueAddress });
//     newRecord.save().then((result) => {
//         console.log("Message has been saved successfully in the database");
//         res.sendStatus(200);
//     }).catch((err) => {
//         console.log("There was an error saving the msg object to the database");
//         console.log('Error is:', err)
//         res.sendStatus(500);

//     });
// });

// // Маршрут для получения всех записей
// app.get('/api/records', (req, res) => {
//     Record.find().then((result) => {
//         console.log("Вся база записей успешно получена");
//         res.json(result)
//     }).catch((err) => {
//         console.log("Ошибка в получении всех записей");
//         console.log('Ошибка:', err)
//         res.sendStatus(500);
//     });
// });

// // Маршрут для получения отдельной записи по уникальному адресу
// app.get('/api/records/:uniqueAddress', (req, res) => {
//     const uniqueAddress = req.params.uniqueAddress;
//     Record.findOne({ "_id": uniqueAddress }).then((result) => {
//         console.log("Запись успешно получена");
//         res.json(result)
//     }).catch((err) => {
//         console.log("Ошибка в получении одной записи");
//         console.log('Ошибка:', err)
//         res.sendStatus(500);
//     });
// });

// // Запуск сервера
// app.listen(port, () => {
//     console.log(`Сервер запущен на порту ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

// Подключение к MongoDB
mongoose.connect('mongodb+srv://admin:zuzjKxEG7hFj8MjB@cluster0.padny.mongodb.net/article?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Успешное подключение к MongoDB');
    })
    .catch((err) => {
        console.error('Ошибка подключения к MongoDB:', err);
    });

// Модель для записей
const Record = mongoose.model('Record', {
    title: String,
    content: String,
    date: String,
});

app.use(bodyParser.json());

// Разрешение CORS (если вы разрабатываете клиентскую часть на другом домене)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Маршрут для добавления записи
app.post('/api/records', (req, res) => {
    const { title, content, date } = req.body;
    const newRecord = new Record({ title, content, date });

    newRecord.save()
        .then((record) => {
            res.json(record);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// Маршрут для получения всех записей
app.get('/api/records', (req, res) => {
    Record.find().then((records) => {
        res.json(records);
    })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// app.get('/api/records', (req, res) => {
//     Record.find().then((result) => {
//         console.log("Вся база записей успешно получена");
//         res.json(result)
//     }).catch((err) => {
//         console.log("Ошибка в получении всех записей");
//         console.log('Ошибка:', err)
//         res.sendStatus(500);
//     });
// });

// Маршрут для получения отдельной записи по уникальному адресу
app.get('/api/records/:uniqueAddress', (req, res) => {
    const uniqueAddress = req.params.uniqueAddress;

    Record.findOne({ "_id": uniqueAddress })
        .then((record) => {
            res.json(record);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
