import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserModel from './models/User.js';
import AdminModel from './models/Admin.js';
import cors from 'cors';
import Materie from './models/Materie.js';

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb+srv://ana:K9Wi9CNddY1iAl0x@cluster0.yivkgdq.mongodb.net/selectEDU?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err));

  app.listen(8080, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Server ok');
  });
  

app.post('/auth/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Utilizator inexistent',
      });
    }

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


app.post('/auth/admin-login', async (req, res) => {
  try {
    const admin = await AdminModel.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(404).json({
        message: 'Credentialele sunt gresite.',
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



app.get('/api/all-image-info', async (req, res) => {
  try {
    const allMaterie = await Materie.find();

    const materieInfoArray = allMaterie.map((materie) => ({
      id: materie._id.toString(),
      Nume_Materie: materie.Nume_Materie,
      Cod_Materie: materie.Cod_Materie,
      Profesor_Email: materie.Profesor_Email,
      Profesor_Nume: materie.Profesor_Nume,
      Profesor_Prenume: materie.Profesor_Prenume,
      Faculty: materie.Faculty,
      Poza_Materie: `data:image/png;base64,${materie.Poza_Materie.toString('base64')}`,
      Semestru: materie.Semestru,
    }));

    res.header('Content-Type', 'application/json');
    
    res.json(materieInfoArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
  
});



app.post('/api/add-materie',async (req, res) => {
  try {
    const newMaterie = new Materie(req.body); 
    await newMaterie.save();

    res.status(201).json({ message: 'Materie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }

});

app.delete('/api/delete-materie/:cod_materie', async (req, res) => {
  try {
    const codMaterie = req.params.cod_materie;

    const query = { Cod_Materie: parseInt(codMaterie, 10) };

    const materie = await Materie.findOne(query);

    if (!materie) {
      return res.status(404).json({ error: 'Materie not found' });
    }

    await Materie.findOneAndDelete(query);

    res.status(200).json({ message: 'Materie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});














