const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios'],
        trim: true,
        minlength: [2, 'Los apellidos deben tener al menos 2 caracteres']
    },
    documento: {
        type: String,
        required: [true, 'El documento es obligatorio'],
        unique: true,
        trim: true,
        match: [/^[0-9]{8,10}$/, 'El documento debe contener entre 8 y 10 dígitos']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Correo inválido']
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true,
        match: [/^[0-9]{8,15}$/, 'El teléfono debe contener entre 8 y 15 dígitos']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
        trim: true,
        minlength: [5, 'La dirección debe tener al menos 5 caracteres']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', clientSchema);