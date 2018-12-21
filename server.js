const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use( (req, res, next) => {
    let now = new Date().toString();

    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log("unable to append file to server.log")
        }
    });

    console.log(log);


   next();
})

// app.use( (req, res, next) => {
//   res.render('maintenence.hbs'), {

//   }
// })

app.use(express.static(__dirname + '/public') );


 
hbs.registerHelper('getCurrentYear',  () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})



app.get('/', (req, res) => {
    res.render('home.hbs', {
        content: "New and interesting info!",
       
    })
 })

 app.get('/about', (req, res) => {
    res.render('about.hbs', {
       
    })
 })

 app.get('/news', (req, res) => {
    res.render('news.hbs', {
       
    })
 })
 

app.get('/bad', (req, res) => {
    res.send({
        message: "Failed to load the page",
       
    });
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});


