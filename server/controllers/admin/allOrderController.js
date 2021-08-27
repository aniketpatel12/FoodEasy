const CryptoJS = require('crypto-js')
const { ValidateEmail } = require('../../utills/functions.js')
const User = require('../../modals/User');
const Order = require('../../modals/Order.js');

const allOrderController = () => {

    let ciphertext = '';

    function decrypt(data){
        const bytes  = CryptoJS.AES.decrypt(data, process.env.SECRET)
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return decryptedData
    }

    return {
        async getOrders(req,res){
            const { data }  = req.body
            const { email } = decrypt(data)

            try {
                if(ValidateEmail(email)){

                    const user = await User.findOne({ email })

                    if(user.role === 'admin'){
                        const orders = await Order.find({ status: { $ne: 'completed' } },null,{ sort: { 'createdAt': -1 } })
                
                        ciphertext = await CryptoJS.AES.encrypt(JSON.stringify(orders),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    }
                    
                    ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({success:'No Orders Yet'}),process.env.SECRET).toString()
                    return res.send(ciphertext)
                }
                    
            } catch (error) {
                    ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({error:'Something Went Wrong...'}),process.env.SECRET).toString()
                    return res.send(ciphertext)
            }
        },
        async updateOrder(req,res){
            
            const { data }  = req.body
            const { id , status } = decrypt(data)

            try {

                    const order = await Order.updateOne({_id:id} ,{ status: status })
                    if(order.nModified){
                        const eventEmitter = req.app.get('eventEmitter')
                        eventEmitter.emit('orderUpdated', { id, status })
                        ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({success:'Status Updated'}),process.env.SECRET).toString()
                        return res.send(ciphertext)
                    }
                
            } catch (error) {
                ciphertext = await CryptoJS.AES.encrypt(JSON.stringify({error:'Something Went Wrong...'}),process.env.SECRET).toString()
                return res.send(ciphertext)
            }
        }
    }
}

module.exports = allOrderController