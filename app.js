const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

function randomData() {
    return 'woah a lot of data..'
}

//here is a change

app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/node_modules/angular`));

app.set('view engine', 'hbs');

hbs.registerPartials(`${__dirname}/views/partials`);

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
    return `${text} Lerma`.toUpperCase();
});

app.use((req, res, next) => {
    let now = new Date().toString();
    let myLog = `${now}: ${req.method} - ${req.url}`;
    console.log(myLog);
    fs.appendFile('requests.log', myLog + '\n', (error) => {
        console.log("error callback?");
    });
    next();
})

app.get('/', (req, res) => {
    // res.send('<h1>Tags!</h1>');
    // let myJson = [{"Name": "Joshuaaa"}];
    res.send(__dirname);
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('/contact', (req, res) => {
    res.render('contact.hbs');
})

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        name: "Joshua",
        customReturn: randomData()
    })
});

app.listen(3000, () => {
    console.log('Your express app is being served on port 3000!');
});