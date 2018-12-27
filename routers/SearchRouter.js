const express = require('express');
const SearchRouter = express.Router();
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);



SearchRouter.get('/keyword/:keyword', (req, res) => {
    const searchstring=req.params.keyword;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`select book.bookid,book.url,bookname , author.authorname
from book
inner join bookauthor on bookauthor.bookid =book.bookid
inner join author on author.authorid=bookauthor.authorid
where bookname ilike '%${searchstring}%' or authorname ilike '%${searchstring}%'`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, book: result.rows});
            });
        }
    });
});

SearchRouter.get('/tag/:keyword', (req, res) => {
    const searchstring=req.params.keyword;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`select book.bookid,book.bookname,book.url,author.authorname
                from tagbook
                inner join book on book.bookid=tagbook.bookid
                inner join bookauthor on bookauthor.bookid=tagbook.bookid
                inner join author on author.authorid=bookauthor.authorid
                where tagbook.tag ilike '${searchstring}'`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, book: result.rows});
            });
        }
    });
});

// SearchRouter.get('/', (req,res) => {
//     pool.connect((err, client, done) => {
//         if (err) res.status(500).json({ success: 0, error: err});
//         else {
//             client.query(`select * from "book"`, (err,result) => {
//                 done();
//                 if (err) res.status(500).json({ success: 2, error: err});
//                 else res.status(201).json({ success: 1, book: result.rows});
//                 // client.end();
//             });
//         }
//         // pool.end();
//     });
// });

module.exports = SearchRouter;