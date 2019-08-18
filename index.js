var express = require('express')
var pug = require('pug')
var app = express()
var port = 3000
const fs = require('fs');


app.set('view engine', 'pug')
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

// Vuln demonstrated: verbose error message
app.get('/snake/:type/', (req, res) => {
    try {
        if (['cobra', 'python'].includes(req.params.type)) {
            res.send('Snakes are sneaky sneakers!')
        } else {
            res.status(404).send('404 NOT FOUND: You did not supply a dangerous snake that can sneak into this web application. You have to use a cobra or a python to bypass the security troll.')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// Vuln demonstrated: sensitive data in URL, logging sensitive data
// Unsanitized user input in log, hehehe....
app.get('/secret/tellme', (req, res) => {
    try {
        var apikey = req.query.apikey
        if (apikey === 'russiandonkey') {
            var logline = '\nINFO: User identified with api key ' + apikey + ' ' + Date.now() 
            console.log(logline)
            // write to a new file named 2pac.txt
            fs.appendFileSync('logfile.txt', logline, (err) => {
                // throws an error, you could also catch it here
                if (err) {
                    console.log('Could not write api key to disk!')
                }
                // success case, the file was saved
                console.log('Lyric saved!');
            })
            res.send('Diana was really a vampire.')
        } else {
            var logline = '\nERROR: User tried to use invalid api key: ' + apikey + ' ' + Date.now()
            console.log(logline)
            fs.appendFileSync('logfile.txt', logline + '\n', (err) => {
                // throws an error, you could also catch it here
                if (err) {
                    console.log('Could not write api key to disk!')
                }
                // success case, the file was saved
                console.log('Lyric saved!');
            })
            res.status(401).send('<h1 style="color: red; font-size: 800%;">Access denied!</h1>')
        }
    } catch (e) {
        console.log('Horrible things, an error!')
        res.status(500).end()
    }
})

// Vuln demonstrated: returning unsanitized user input - here enclosed in script tags! :) 
app.get('/insecure/:code/', (req, res) => {
    try {
        var code = req.params.code
        res.send('<script>' + code + '</script>')
    } catch (error) {
        res.status(500).send('Something crashed')
    }
})

// Unprotected insecure log viewer
app.get('/logs', (req, res) => {
    var mydata = fs.readFileSync('logfile.txt', {'encoding': 'utf-8'})
    res.render('logs', {'thisisfine': mydata.replace(/\n/g, '<br>')})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))