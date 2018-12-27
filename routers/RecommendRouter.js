//done
const express = require('express');
const RecommendRouter = express.Router();
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);

RecommendRouter.get('/', (req,res) => {
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`select bookcomment.bookid,book.bookname,book.url,cast(avg(rating) as decimal(10,1)) 
from bookcomment
inner join book on book.bookid=bookcomment.bookid

group by bookcomment.bookid,book.bookid
order by bookid`, (err,result) => {
                done();
                if (err) res.status(500).json({ success: 2, error: err});
                else res.status(201).json({ success: 1, book: result.rows});
                // client.end();
            });
        }
        // pool.end();
    });
});

module.exports = RecommendRouter;