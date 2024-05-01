import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({

    firstname: { type: String, default: '', required: true },
    lastname: { type: String, default: '', required: true },
    email:{ type: String, default: '', required: true, unique: true },
    password:{ type: String, default: '', required: true },
    address:{ type: String, default: '' },
    phonenr:{ type: String, default: '' },
    role:{ type: String, enum: ['user', 'admin'], default: 'user' },
    createdDate:{ type: Date, default: Date.now},
    createdBy:{ type: String, default: ''},
    editedDate:{ type: Date, default: Date.now},
    editedBy:{ type: String, default: ''},
    deletedDate:{ type: Date, default: Date.now},
    deletedBy:{ type: String, default: ''},
    deleted:{type:Boolean,default:false}

});

// create mongoose-model for user
const User = mongoose.model('User', userSchema);

// export user-model to use it in other files in nodejs-app
module.exports = User;