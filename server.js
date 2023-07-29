require('dotenv').config()
const express = require('express') //express to add
const corsOptions = require('./config/corsOptions')
const app = express() //app is using express 
const { logger } = require('./middleware/logger')
const path = require('path')
const PORT = process.env.PORT || 3500 // setting the server port
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.listen(PORT, ()=> {console.log(`Server Started on ${PORT}`)}) // app is listening to port 3500
console.log(process.env.NODE_ENV)

//middleware for static file that server should listen 
app.use('/', express.static(path.join(__dirname, 'public'))) // the server search for static file.
app.use(logger)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', require('./routes/root'))

app.all('*', (req, res)=>{
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))

    }else if(req.accepts('json')){
        res.json({message: "404 not found"})

    }else{
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)