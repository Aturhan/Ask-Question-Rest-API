const bcrypt = require('bcryptjs')

const UserinputValidation = (email,password) =>{
    return email && password
}

const comparePaswords = (password,hashedPassword) =>{
   return bcrypt.compareSync(password,hashedPassword)
}

module.exports = {UserinputValidation,comparePaswords}