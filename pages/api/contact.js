export default function (req, res) {
    require('dotenv').config()

    if(!req.body.name || !req.body.email || !req.body.message) {
      res.send('No access to this page')
      return
    }

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: process.env.host,
         auth: {
              user: process.env.user,
              pass: process.env.password,
           },
      secure: true,
    });
    
    const mailData = {
        from: 'Portfolio Contactform <contact@jannismilz.com>',
        to: process.env.user,
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<p>Sent from: ${req.body.email}</p><div>${req.body.message}</div>`
    }
  
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log("Error: ", err)
        else
          console.log("Info: ", info);
    })

    res.send(200)
  }