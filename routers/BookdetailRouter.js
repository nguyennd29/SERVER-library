const express = require('express');
const BookdetailRouter = express.Router();
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);


BookdetailRouter.get('/info/:id', (req, res) => {
    const bookid=req.params.id;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`select book.bookid,bookname,authorname,url,publishername,release_time,update_time,lang,tag
from book
inner join publisher on book.publisherid= publisher.publisherid
inner join bookauthor on bookauthor.bookid =book.bookid
inner join author on author.authorid = bookauthor.authorid
inner join tagbook on book.bookid= tagbook.bookid
where book.bookid = ${bookid}`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, book: result.rows});
            });
        }
    });
});

BookdetailRouter.get('/comment/:id', (req, res) => {
    const queryid=req.params.id;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`select bookcomment.bookid,bookname,username,comment,rating
from bookcomment
inner join user1 on bookcomment.userid = user1.userid
inner join book on bookcomment.bookid = book.bookid

where comment <> 'null' and book.bookid = ${queryid}`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, book: result.rows});
            });
        }
    });
});


module.exports = BookdetailRouter;