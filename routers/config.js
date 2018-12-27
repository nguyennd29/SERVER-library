const connectionString = 'postgres://ehhrsexj:mstkcbMIuN51S5lt2iwh3EXcTBmZlnO2@packy.db.elephantsql.com:5432/ehhrsexj';
const parse = require('pg-connection-string').parse;
const config = parse(connectionString);

module.exports = config;