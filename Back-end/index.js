import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserModel from './models/User.js';

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb+srv://ana:K9Wi9CNddY1iAl0x@cluster0.yivkgdq.mongodb.net/selectEDU?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err));

app.post('/auth/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Utilizator inexistent',
      });
    }

    // Compară parola direct
    if (req.body.password !== user.password) {
      return res.status(404).json({
        message: 'Login sau parola incorecta',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      {
        expiresIn: '30d',
      },
    );

    const { password, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Logare esuata',
    });
  }
});

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server ok');
});
