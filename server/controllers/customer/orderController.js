const CryptoJS = require('crypto-js')
const { ValidatePhone, notEmpty, validatePinCode, ValidateEmail } = require('../../utills/functions.js')
const User = require('../../modals/User');
const Order = require('../../modals/Order.js');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const orderController = () => {

    let ciphertext = '';

    function decrypt(data){
        const bytes  = CryptoJS.AES.decrypt(data, process.env.SECRET)
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return decryptedData
    }

    return {
        async placeOrder(req,res){
            const { data }  = req.body
            const {checkOutDetails,token } = decrypt(data)

            try {
                 // verification
                if(ValidatePhone(checkOutDetails.phone)  && notEmpty(checkOutDetails.address) 
                && notEmpty(checkOutDetails.city) && validatePinCode(checkOutDetails.pinCode)){

                    const user = await User.findOne({ email:checkOutDetails.email })
                    
                    if(token){

                        const result = await stripe.paymentIntents.create({
                            amount: checkOutDetails.TotalPrice  * 100,
                            currency: 'inr',
                            payment_method: token,
                            description: `Food order: ${user._id}`,
                            confirm:true
                        })
                    }
                    const order = new Order({
                        customerId:user._id,
                        items:checkOutDetails.orders,
                        phone:checkOutDetails.phone,
                        address:checkOutDetails.address,
                        city:checkOutDetails.city,
                        totalPrice:checkOutDetails.TotalPrice,
                        pinCode:checkOutDetails.pinCode,
                        paymentType:token ? 'card':'cod',
                        paymentStatus:true,
                    });
                    const response = await order.save()

                    if(response){
                        ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({success:'Order Placed Successfully'}),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    } 
                }
                    
            } catch (error) {
                    console.log(error);
                    ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({error:'Something Went Wrong...'}),process.env.SECRET).toString()
                    return res.send(ciphertext)
            }
        },
        async order(req,res){

            const { data }  = req.body
            const { email } = decrypt(data)

            try {
                 // verification
                if(ValidateEmail(email)){

                    const user = await User.findOne({ email })
                    
                    const orders = await Order.find({ customerId:user._id },
                        null,
                        { sort: { 'createdAt': -1 } }
                        )

                    if(orders){
                        ciphertext = await CryptoJS.AES.encrypt(JSON.stringify(orders),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    }
                    ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({success:'No Orders Yet'}),process.env.SECRET).toString()
                    return res.send(ciphertext)
                }
                    
            } catch (error) {
                    console.log(error);
                    ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({error:'Something Went Wrong...'}),process.env.SECRET).toString()
                    return res.send(ciphertext)
            }

        },
        async getSingleOrder(req,res){

            const { data }  = req.body
            const { email,id } = decrypt(data)

            try {
                 // verification
                if(ValidateEmail(email)){

                    const user = await User.findOne({ email })
                    
                    const order = await Order.findById(id)

                    if(order && user){
                        ciphertext = CryptoJS.AES.encrypt(JSON.stringify(order),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    }
                    ciphertext = CryptoJS.AES.encrypt(JSON.stringify({success:'No Orders Yet'}),process.env.SECRET).toString()
                    return res.send(ciphertext)
                }
                    
            } catch (error) {
                    console.log(error);
                    ciphertext = CryptoJS.AES.encrypt(JSON.stringify({error:'Something Went Wrong...'}),process.env.SECRET).toString()
                    return res.send(ciphertext)
            }

        }

    }
}

module.exports = orderController