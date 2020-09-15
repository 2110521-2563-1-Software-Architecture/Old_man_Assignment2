const axios = require('axios');
const io = require("socket.io-client");
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

else if (command == "insert") {
    var xaxis = [];
    var time = [];
    for (i = 0; i < 100; i++){
        insertBook('a', 'b');
        xaxis.push(i);
        time.push(Date.now());
    }
    console.log(xaxis);
    console.log(time); 
}
else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);
else if (command == "watch") watchBooks();