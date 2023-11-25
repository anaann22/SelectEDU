import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserModel from './models/User.js';
import AdminModel from './models/Admin.js';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());

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

// ... (other imports)

app.post('/auth/admin-login', async (req, res) => {
  try {
    const admin = await AdminModel.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(404).json({
        message: 'Admin inexistent',
      });
    }

    // Compare passwords
    if (req.body.password !== admin.password) {
      return res.status(404).json({
        message: 'Login sau parola incorecta',
      });
    }

    const token = jwt.sign(
      {
        _id: admin._id,
      },
      'secret',
      {
        expiresIn: '30d',
      },
    );

    const { password, ...adminData } = admin._doc;
    res.json({
      ...adminData,
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
