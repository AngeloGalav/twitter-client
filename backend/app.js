const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const sendEmail = require('./utils/sendEmail');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));

app.post("/api/contacts", async (req, res, next) => {
  const { message, email, name } = req.body;
  try {
    //mandiamo la mail
    await sendEmail({
      to: process.env.EMAIL_FROM,
      subject: `Richiesta di contatto da ${name}`,
      text: message + `<p><a href="mailto:${email}">Rispondi</a></p>`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
