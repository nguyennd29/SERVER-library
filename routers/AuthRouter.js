const express = require('express');
const AuthRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);

AuthRouter.post('/login', (req,res) => {
    const { username, password } = req.body;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`SELECT * FROM "user1"
                            WHERE "username" = '${username}'`, (err,result) => {
                done();
                if (err) res.status(500).json({ success: 2, error: err});
                else if(!result.rows[0]) res.status(404).json({ success: 3, error: `User not found`});
                else {
                    if (password === result.rows[0].password) {
                        var sessionid=result.rows[0].userid;
                        res.json({success: 1, userid: sessionid, redirect: `http://localhost:8080/index.html`});
                    } else res.status(401).json({ success: 0, error: "Wrong password"});
                }
            });
        }
    });

});

AuthRouter.delete('/logout', (req,res) => {
    req.session.destroy();
    // pool.end();
    res.send({ success: 1, message:"Logout successfully",redirect: `http://localhost:8080/index.html`});
});

module.exports = AuthRouter;
