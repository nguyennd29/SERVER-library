//done 1/2
const express = require('express');
const BookRouter = express.Router();
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);


BookRouter.get('/:id', (req, res) => {
    const bookid=req.params.id;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`select * from "book" where bookid=${bookid}`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, book: result.rows});
            });
        }
    });
});

BookRouter.get('/comment/:id', (req, res) => {
    const bookid=req.params.id;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`select * from "book" where bookid=${bookid}`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, book: result.rows});
            });
        }
    });
});


//U
// bookRouter.put('/:id', (req, res) => {
//     const {mail, mailContent, receiverLocation, timeReceive} = req.body || {};
//     const userId = req.params.id;
//     bookModel.findById(
//         userId,
//         (err, flirtUserFound) => {
//             if (err) res.status(500).json({success: 0, error: err});
//             else if (!flirtUserFound) res.status(404).json({success: 0, error: "No such user"});
//             else {
//                 const flirtChange = {mailContent, mail, receiverLocation, timeReceive};
//                 for (key in flirtChange) {
//                     if (flirtChange[key] !== null && flirtChange[key] !== undefined)
//                         flirtUserFound.receiver[key] = flirtChange[key];
//                 }
//                 flirtUserFound.save((err, flirtUserUpdated) => {
//                     if (err) res.status(500).json({success: 0, error: err});
//                     else res.send({success: 1, user: flirtUserUpdated});
//                 });
//             }
//         });
// });

//D
// BookRouter.delete('/:id/:num', (req, res) => {
//     uid = req.params.id;
//     fid = req.params.num;
//     BookModel.findOne({_id: uid}, (err, bookUserDeleted) => {
//         if (err) res.status(500).json({success: 0, error: err});
//         else {
//             // res.status(200).json({success: 1, user: userFound});
//             bookUserDeleted.receiver = bookUserDeleted.receiver.filter(item => item !== bookUserDeleted.receiver[fid]);
//             // [1,2,3].filter(item => item != 2);
//             bookUserDeleted.save((err, callback) => {
//                 if (err) res.status(500).json({success: 0, error: err});
//                 else res.send({success: 1, user: callback});
//             });
//         }
//     });
// });

module.exports = BookRouter;