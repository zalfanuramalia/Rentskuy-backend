const express = require ('express');

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(require('./src/routes'));

app.listen(3000, ()=>{
    console.log('App running on port 3000');
});