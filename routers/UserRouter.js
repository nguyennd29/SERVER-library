const express = require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);

UserRouter.post('/', (req,res) => {
    const {username, password,email, age,address} = req.body || {};
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`INSERT INTO "user1"(username,password,email,age,city) 
                            VALUES('${username}','${password}','${email}','${age}','${address}');`, (err,result) => {
                done();
                if (err) res.status(500).json({ success: 2, error: err});
                else res.status(201).json({ success: 1, user: result});
                // client.end();
            });
        }
        // pool.end();
    });
});

UserRouter.get('/id/:id', (req, res) => {
    const userid=req.params.id;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`select * from "user1" where userid=${userid}`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result.rows});
            });
        }
    });
});
UserRouter.get('/username/:username', (req, res) => {
    const userName=req.params.username;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`select * from "user1" where username like '${userName}'`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result.rows});
            });
        }
    });
});

UserRouter.delete('/id/:id', (req,res) => {
    UserModel.findByIdAndRemove({ _id: req.params.id }).then(userDeleted=>{
        res.status(200).json({ success: 1, user: userDeleted })
    });
});



module.exports = UserRouter;