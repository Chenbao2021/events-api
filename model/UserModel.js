const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    userCode: {
        type: String,
        require: true,
    },
})
const User = mongoose.model('User', userSchema)
userSchema.statics.findUser = async (email, password) => {
    const user = User.findOne({email}) ;
    if (!user) throw new Error("Erreur, pas possible de se connecter !");
    const isPasswordValid = password === user.userCode;
    if(!isPasswordValid) throw new Error("Erreur, pas possible de se connecter ! ");
    return user;
}

module.exports = {
    User
}