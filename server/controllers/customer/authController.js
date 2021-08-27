const {checkSpecial,ValidateEmail,ValidatePassword,notEmpty,ValidatePhone, allLetter} =  require('../../utills/functions.js')
const User = require('../../modals/User.js')
const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')


const authController = () => {

    let ciphertext = '';

    function decrypt(data){
        const bytes  = CryptoJS.AES.decrypt(data, process.env.SECRET)
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return decryptedData
    }

    return {
        async userExist(req,res){

            const { data }  = req.body
            
            const email = decrypt(data)

            if(ValidateEmail(email)){

                try {
                    const user = await User.exists({ email })

                    if(user){
                        ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({info:'User Exits'}),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    } 
                    else{
                        ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({success:'User Does not Exits'}),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    }
                }catch (error) {
                    ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({error:'Something Went Wrong...'}),process.env.SECRET).toString()
                    return res.send(ciphertext)
            }
        }

        },
        async register(req,res){
            const { data }  = req.body

            const {username,password,email,phone} = decrypt(data)

    
            if(checkSpecial(username) && ValidateEmail(email) && ValidatePhone(phone) && ValidatePassword(password)){

                try {
                    const hashedPassword = await bcrypt.hash(password,10)

                    const newUser = new User({
                        username,
                        email,
                        password: hashedPassword,
                        phone
                    })

                    const response = await newUser.save()

                    if(response){
                        ciphertext = CryptoJS.AES.encrypt(JSON.stringify({success:'Register Successfully'}),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    } 

                    }catch (error) {
                        ciphertext = CryptoJS.AES.encrypt(JSON.stringify({error:'Something Went Wrong...'}),process.env.SECRET).toString()
                        return res.send(ciphertext)
                }
            }
        },
        async login(req,res){
            const { data }  = req.body

            const {username:email,password} = decrypt(data)

                try {
                    if(ValidateEmail(email) && notEmpty(password)){

                        const user = await User.findOne({ email })
                        
                        if(!user) {
                            ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ info: 'Invalid Credentials' }),process.env.SECRET).toString()
                            return res.send(ciphertext)
                        }  
                        const isMatch = await bcrypt.compare(password, user.password)
            
                        if(isMatch) {

                            const token = jwt.sign({id:user._id},process.env.SECRET)

                            const data = { success: 'Logged in succesfully',token,user }

                            ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data),process.env.SECRET).toString()

                            return res.send(ciphertext)
                        }
                        ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ info: 'Invalid Credentials' }),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    }                    
                }catch (error) {
                    ciphertext = CryptoJS.AES.encrypt(JSON.stringify({error: 'Something went wrong'}),process.env.SECRET).toString()
                    return res.send(ciphertext)
                }
        },

        async resetPassword(req,res){

            const { data }  = req.body

            const {password,email} = decrypt(data)

            if(ValidateEmail(email) && ValidatePassword(password)){

                try {
                    const hashedPassword = await bcrypt.hash(password,10)

                    const isUpdated = await User.updateOne({email},{password:hashedPassword})

                    if(isUpdated.nModified){
                        ciphertext = CryptoJS.AES.encrypt(JSON.stringify({success:'Password Reset Successfully'}),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    }}catch (error) {
                        ciphertext = CryptoJS.AES.encrypt(JSON.stringify({error:'Something Went Wrong...'}),process.env.SECRET).toString()
                        return res.send(ciphertext)
                }
            }
            else{
                ciphertext = CryptoJS.AES.encrypt(JSON.stringify({error:'Something Went Wrong...'}),process.env.SECRET).toString()
                return res.send(ciphertext)
            }
        }
    }
}

module.exports = authController