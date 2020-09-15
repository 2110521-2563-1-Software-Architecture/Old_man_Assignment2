const axios = require('axios');
const io = require("socket.io-client");
const plotlib = require('nodeplotlib');
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
    var start = Date.now()/1000;
    for ( i = 0; i < 100; i++){
        listBooks()
    }
    var stop = Date.now()/1000;
    console.log(stop-start);
}

//Use this command to insert a book in ข้อa)
else if (command == "insert"){
    var TimeToInsertOne =[]
    var StartTimeForInsertOne = Date.now();
    insertBook('a', 'b');
    var EndTimeForInsertOne = Date.now();
    TimeToInsertOne.push((EndTimeForInsertOne-StartTimeForInsertOne)/1000)
    console.log(TimeToInsertOne);
}

//Use this command to insert many books in ข้อa)
else if (command == "listinsert") {
    var TimeToInsertList = [];
    var StartTimeForInsertList = Date.now();
    for (i = 0; i < 100; i++){
        insertBook('a', 'b');
    }
    var EndTimeForInsertList = Date.now();
    TimeToInsertList.push((EndTimeForInsertList-StartTimeForInsertList)/1000)
    console.log(TimeToInsertList); 
}

//Use this command to list 4096 rounds in ข้อb)
//Call this in terminal1
else if (command == "dolist4096") {
    var TimeToDoList4096 = [];
    var IndexOfDoList4096 = [];
    for (i = 0; i < 4096; i++){
        listBooks();
        TimeToDoList4096.push(Date.now()/1000);
        IndexOfDoList4096.push(i);
    }
}

//Use this command to insert 4096 rounds in ข้อb)
//Call this in terminal2
else if (command == "doinsert4096") {
    var TimeToDoInsert4096 = [];
    var IndexOfDoInsert4096 = [];
    for (i = 0; i < 4096; i++){
        insertBook('a','b');
        TimeToDoInsert4096.push(Date.now()/1000);
        IndexOfDoInsert4096.push(i);
    }
}

//Use this command to get 4096 rounds in ข้อb)
//Call this in terminal3
else if (command == "doget4096") {
    var TimeToDoGet4096 = [];
    var IndexOfDoGet4096 = [];
    for (i = 0; i < 4096; i++){
        getBook(i);
        TimeToDoGet4096.push(Date.now()/1000);
        IndexOfDoGet4096.push(i);
    }
}

// else if (command == "checktime"){
//     for (i = 0; i < 10; i++) {
//         console.log(TimeToDoGet4096[i]);
//     } 
// }

else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);
else if (command == "watch") watchBooks();

else if (command == "plot") {                                           //HowToPlotGraph
    data = [{x: [1, 3, 4, 5], y: [3, 12, 1, 4], type: 'line'}];
    plotlib.plot(data);
}