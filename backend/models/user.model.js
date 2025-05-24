import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
})

const User = mongoose.model("User", userSchema);

export default User;