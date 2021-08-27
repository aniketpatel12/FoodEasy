import {createContext} from 'react'
import CryptoJS from 'crypto-js'
import SecureStorage from 'secure-web-storage'

export const secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key,process.env.REACT_APP_SECRET);
 
        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, process.env.REACT_APP_SECRET);
 
        data = data.toString();
 
        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET);
 
        data = data.toString(CryptoJS.enc.Utf8);
 
        return data;
    }
});

export const initialState = ({
    user:secureStorage.getItem('user') || {},
    cartItems:secureStorage.getItem('cartItems') || [],
    priceDetails:secureStorage.getItem('priceDetails') || {},
})

export const Context = createContext();


