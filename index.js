const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.static('docs'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet())

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'drsunnylaiwebsite@gmail.com',
    pass: 'mypassword235?!'
  }
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/docs/index.html');
});

app.post('/submit-form', (req, res) => {
  console.log(req.body);

  let mailOptions = {
    from: 'drsunnylaiwebsite@gmail.com',
    to: 'thereceiverofjunkmail@gmail.com',
    subject: 'Sending Email using Node.js',
    text: req.body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.end();
})

app.listen(port, () => console.log(`listening at http://localhost:${port}`));