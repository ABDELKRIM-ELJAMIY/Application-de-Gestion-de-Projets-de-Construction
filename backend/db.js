const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DB_URI,)
        .then(() => console.log('Base de données connectée'))
        .catch((error) => console.log('Erreur de connexion:', error));
};

module.exports = { connectDB };
