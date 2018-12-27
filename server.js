const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
const apiRouter = require('./routers/apiRouter');
const session = require('express-session');


// const  pg  = require('pg');


let app = express();

app.set('trust proxy', 1);
app.use(session({
    secret: 'minatoboy',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        maxAge: 7*24*60*60*1000
    }
}));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.use(cors());
app.options('*', cors());


app.use('/api', apiRouter);

app.get('/', (req,res) => {
    res.send("HEDSPI Library");
});

const port = process.env.PORT || 6969;
app.listen(process.env.PORT || 6969, (err) => {
    if(err) console.log(err);
    else console.log("Server is running at "+port+"");
});

