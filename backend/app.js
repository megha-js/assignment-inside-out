const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
app.use(cors({
    origin: ['https://assignment-inside-out-qfq4.vercel.app/', 'http://localhost:3000', 'http://127.0.0.1:3000','*'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

require('dotenv').config()


const PORT = process.env.PORT

//middlewares
app.use(express.json())


//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
