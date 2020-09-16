const axios = require('axios');
const io = require("socket.io-client");
const plotlib = require('nodeplotlib');
const fs = require('fs');
const URL = 'http://localhost:3000';

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

const listBooks = async () => {
    const res = await axios.get(`${URL}/list`);
    const books = res.data;
    console.log(books);
};

const insertBook = async (name, author) => {
    var book = { name: name, author: author };
    let res = await axios.post(`${URL}/insert`,book);
    console.log(res.data);
}

const getBook = async (id) => {
    await axios.get(`${URL}/getbook/${id}`)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error.response.data); //Logs a string: Error: Request failed with status code 404
    })
};

const deleteBook = async (id) => {
    await axios.get(`${URL}/delete/${id}`)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error.response.data); //Logs a string: Error: Request failed with status code 404
    })
}

const watchBooks = async () => {
    /*let socket = io.connect(URL);
    socket.on("notify", (book) => { console.log(book); });*/
    console.log("Unavailable in REST API");
}

if (command == "list") listBooks();

//try doing loop 
else if (command == "looplist"){
    let start = Date.now();
    for ( i = 0; i < 100; i++){
        listBooks();
    }
    fs.writeFile('LoopList.txt', (Date.now() - start).toString(), function (err) {
        if (err) throw err;
        console.log('LoopList saved');
    });
}

//Use this command to insert a book in ข้อa)
else if (command == "insert"){
    let start = Date.now();
    insertBook('a', 'b');
    fs.writeFile('InsertOne.txt', (Date.now() - start).toString(), function (err) {
        if (err) throw err;
        console.log('InsertOne saved');
    });
}

//Use this command to insert many books in ข้อa)
else if (command == "listinsert") {
    let start = Date.now();
    for (i = 0; i < 100; i++){
        insertBook('a', 'b');
    }
    fs.writeFile('ListInsert.txt', (Date.now() - start).toString(), function (err) {
        if (err) throw err;
        console.log('ListInsert saved');
    });
}

//Use this command to list 4096 rounds in ข้อb)
//Call this in terminal1
else if (command == "dolist4096") {  
    let data = '';
    let start = Date.now()
    for (i = 0; i < 4096; i++){
        listBooks();
        data += (Date.now() - start).toString() + '\n';
    }
    fs.writeFile('list4096.txt', data, function (err) {
        if (err) throw err;
        console.log('List4096 saved');
    });
}

//Use this command to insert 4096 rounds in ข้อb)
//Call this in terminal2
else if (command == "doinsert4096") {
    let data = '';
    let start = Date.now()
    for (i = 0; i < 4096; i++){
        insertBook('a','b');
        data += (Date.now() - start).toString() + '\n';
    }
    fs.writeFile('insert4096.txt', data, function (err) {
        if (err) throw err;
        console.log('Insert4096 saved');
    });
}

//Use this command to get 4096 rounds in ข้อb)
//Call this in terminal3
else if (command == "doget4096") {
    let data = '';
    let start = Date.now()
    for (i = 0; i < 4096; i++){
        getBook(i);
        data += (Date.now() - start).toString() + '\n';
    }
    fs.writeFile('get4096.txt', data, function (err) {
        if (err) throw err;
        console.log('Get4096 saved');
    });
}

// else if (command == "checktime"){
//     for (i = 0; i < 10; i++) {
//         console.log(TimeToDoGet4096[i]);
//     } 
// }

else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);
else if (command == "watch") watchBooks();