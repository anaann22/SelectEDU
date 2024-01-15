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
      numarMaximUtilizatori: materie.numarMaximUtilizatori,
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

app.post('/api/alegere-materie/:cod_materie', async (req, res) => {
  try {
    const codMaterie = req.params.cod_materie;

    const query = { Cod_Materie: parseInt(codMaterie, 10) };

    const materie = await Materie.findOne(query);

    if (!materie) {
      return res.status(404).json({ error: 'Materie not found' });
    }

    
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }

});

app.post('/api/alegere-materie/:userId/:cod_materie', async (req, res) => {
  try {
    const userId = req.params.userId;
    const codMaterie = req.params.cod_materie;

    const user = await UserModel.findById(userId);
    const materie = await Materie.findOne({ Cod_Materie: parseInt(codMaterie, 10) });

    if (!user || !materie) {
      return res.status(404).json({ error: 'Utilizator sau materie nu există' });
    }

    // Verificați dacă numărul total de alegeri pentru materie este sub limita specificată
    if (materie.numarAlegeri < materie.numarMaximUtilizatori) {
      // Dacă da, permiteți alegerea și actualizați numărul de alegeri pentru materie
      await Materie.findByIdAndUpdate(materie._id, { numarAlegeri: materie.numarAlegeri + 1 });
      await UserModel.findByIdAndUpdate(userId, { materie1: codMaterie });
      res.status(200).json({ message: 'Alegere materie reușită' });
    } else {
      // Dacă nu, refuzați alegerea
      res.status(403).json({ error: 'Numărul maxim de alegeri pentru materie a fost atins' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// POST pentru a adăuga un nou tabel
app.post('/add-tabel', async (req, res) => {
  try {
    const newTabelData = req.body;

    // Verificăm dacă există deja un tabel pentru aceeași facultate
    const existingTabel = await Tabel.findOne({ 'facultati.nume': newTabelData.facultati[0].nume });

    if (existingTabel) {
      return res.status(409).json({
        message: 'Există deja un tabel pentru această facultate',
      });
    }

    // Adăugăm noul tabel în baza de date
    const createdTabel = await Tabel.create(newTabelData);

    res.status(201).json({
      id: createdTabel._id.toString(),
      message: 'Tabel creat cu succes',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.get('/all-tabel-info', async (req, res) => {
  try {
    const allTabelInfo = await Tabel.find();

    const tabelInfoArray = allTabelInfo.map((tabel) => ({
      id: tabel._id.toString(),
      facultati: tabel.facultati.map((facultate) => ({
        nume: facultate.nume,
        specialitati: facultate.specialitati.map((specialitate) => ({
          nume: specialitate.nume,
          semestre: specialitate.semestre
        }))
      }))
    }));

    res.header('Content-Type', 'application/json');
    res.json(tabelInfoArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});


// nu preia datele utilizatorului logat
  app.get('/api/user-materii', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, 'your-secret-key');

        const userId = decodedToken.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'ID utilizator invalid' });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilizatorul nu a fost găsit' });
        }

        res.status(200).json({
            userId: user._id,
            Nume: user.Nume,
            Prenume: user.Prenume,
            materie1: user.materie1,
            materie2: user.materie2,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});


//ar trebui sa dea automat datele utilozatorului logat in functie de token
app.get('/api/user-materii/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Verifică dacă userId este un ObjectId valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'ID utilizator invalid' });
    }

    // Găsește utilizatorul după ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilizatorul nu a fost găsit' });
    }

    // Returnează materiile asociate utilizatorului, inclusiv numele corect
    res.status(200).json({
      userId: user._id,
      Nume: user.Nume,  
      Prenume: user.Prenume,
      materie1: user.materie1,
      materie2: user.materie2,
      // Alte informații despre materii, dacă sunt disponibile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.post('/api/add-materie', async (req, res) => {
  try {
    // Creează o nouă instanță a schemei Materie folosind datele din corpul cererii
    const newMaterie = new Materie(req.body);

    // Salvează noul document în baza de date
    await newMaterie.save();

    // Răspunde cu un mesaj de succes
    res.status(201).json({ message: 'Materie added successfully' });
  } catch (error) {
    console.error(error);
    // Răspunde cu un mesaj de eroare și un cod de stare adecvat
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

  
  
  