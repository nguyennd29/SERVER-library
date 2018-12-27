const express = require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);

// UserRouter.post('/', (req,res) => {
//     const {username, password, name, avatarUrl, gender} = req.body || {};
//     pool.connect((err, client, done) => {
//         if (err) res.status(500).json({ success: 0, error: err});
//         else {
//             client.query(`INSERT INTO "user"(username,password,name,"avatarUrl",gender)
//                             VALUES('${username}','${password}','${name}','${avatarUrl}','${gender}');`, (err,result) => {
//                 done();
//                 if (err) res.status(500).json({ success: 2, error: err});
//                 else res.status(201).json({ success: 1, user: result});
//                 client.end();
//             });
//         }
//         // pool.end();
//     });
// });


UserRouter.get('/', (req, res) => {
    console.log(req.session);
        if (req.session.user) {
        var currentid = req.session.user.userid;
            pool.connect((err, client, done) => {
            client.query(`select * from "user1" where userid=${currentid}`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result.rows});
            });
        });
        }
        else res.status(201).json({success: 0,message: 'no session found'});
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

// UserRouter.put('/:id', (req, res) => {
//     const {password, name, avatarUrl, gender} = req.body || {};
//     const userId = req.params.id;
//
//     pool.connect((err, client, done) => {
//         if (err) res.status(500).json({ success: 0, error: err});
//         else {
//             client.query(``, (err,result) => {
//                 done();
//                 if (err) res.status(500).json({ success: 2, error: err});
//                 else res.status(201).json({ success: 1, user: result.rows});
//                 client.end();
//             });
//         }
//         // pool.end();
//     });
//     // UserModel.findById(
//     //     userId,
//     //     (err, userFound) => {
//     //         if (err) res.status(500).json({ success: 0, error: err });
//     //         else if(!userFound) res.status(404).json({ success: 0, error: "No such user"});
//     //         else {
//     //             const userChange = {password, name};
//     //             for(key in userChange) {
//     //                 if(userChange[key] !== null && userChange[key] !== undefined)
//     //                     userFound[key] = userChange[key];
//     //             }
//     //             userFound.save((err, userUpdated) =>{
//     //                 if (err) res.status(500).json({ success: 0, error: err });
//     //                 else res.send({ success: 1, user: userUpdated });
//     //             });
//     //         }
//     //     });
// });

UserRouter.delete('/id/:id', (req,res) => {
    UserModel.findByIdAndRemove({ _id: req.params.id }).then(userDeleted=>{
        res.status(200).json({ success: 1, user: userDeleted })
    });
});



module.exports = UserRouter;