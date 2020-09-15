const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOption = {
    swaggerDefinition: {
        info: {
            title: 'Books API',
            description: 'Books API Information',
            contract:{
                name: 'Nonthakorn Taboonpong'
            },
            servers: ['http://localhost:3000']
        },
        definitions:{
            "book":{
                type: 'object',
                properties:{
                    "id" :{
                        type: 'integer'                       
                    },
                    "title" :{
                        type: 'string'
                    },
                    "author" :{
                        type: 'string'
                    }
                }
            }
        }
    },
    apis: ["Backend/server.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOption);
const app = express();

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
app.use(express.json());

var books = [{
    id: 123,
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
},{
    id: 2,
    title: "Arrow",
    author: "series",
}]

app.get('/', (req, res) => {
    res.send('<h1>your server is running .... i</h1>');
});

//list book
/**
 * @swagger
 * /list:
 *  get:
 *    description : Use to get all books 
 *    responses:
 *      '200':
 *         description: Succesful response 
 */
app.get('/list', (req,res) => {
    res.status(200).send(books)
});

//get book
/**
 * @swagger
 * /getbook:
 *  get:
 *    description : Use to get a book by ID 
 *    parameters: [
 *          {
 *          name: id,
 *          in: path,
 *          description: ID of the book to use,
 *          required: true 
 *          }
 *    ]
 *    responses:
 *      '200':
 *         description: Succesful response
 *      '400':
 *          description: Bad request
 *      '404':
 *         description: Unsuccesful response 
 *  
 */
app.get('/getbook/:id', (req,res) => {
    const book = books.find(m => m.id === parseInt(req.params.id))
    if (!book) {
        res.status(404).send('Dont find ID')
    } else {
        res.send(book)
    }
});

//insert book
/**
 * @swagger
 * /insert:
 *  post:
 *    description : Use to insert a new book 
 *    parameters: [
 *      {
 *          name: body,
 *          in: body,
 *          description: Book you want to add,
 *          require: true
 *      }
 *    ]
 *    responses:
 *      '200':
 *         description: Succesful response
 *      '400':
 *          description: Bad request
 *      '404':
 *         description: Unsuccesful response 
 *  
 */
app.post('/insert', (req,res) => {
    const book = {
        id: books.length + 1,
        title: req.body.name,
        author: req.body.author,
    }
    books.push(book);
    res.send(book);
});

//delete book
/**
 * @swagger
 * /delete:
 *  post:
 *    description : Use to delete a book by id 
 *    parameters: [
 *      {
 *          name: id,
 *          in: path,
 *          description: Id of book you want to delete,
 *          require: true
 *      }
 *    ]
 *    responses:
 *      '200':
 *         description: Succesful response
 *      '400':
 *          description: Bad request
 *      '404':
 *         description: Unsuccesful response 
 *  
 */
app.get('/delete/:id', (req,res) => {
    const book = books.find(m => m.id === parseInt(req.params.id));
    if(!book) {
        res.status(404).send('The book with the given ID was not found ')
    }else {
        const index = books.indexOf(book);
        books.splice(index, 1);
        res.send(book);
    }
});
//

const port = process.env.PORT || 3000
s = app.listen(port, () => console.log(`Listening on port${port}...`) );
var io = require("socket.io")(s);

io.on("connection .......", (socket) => {
    console.log("already connect to server");

    socket.on('insert',(book) => {
        io.sockets.emit('notify',book)
    })
  });
  