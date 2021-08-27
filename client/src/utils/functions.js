import swal from "sweetalert"
import CryptoJS from 'crypto-js'

function ValidateEmail(mail) {
  //eslint-disable-next-line
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (regex.test(mail)) return true
  else if (mail.length <= 0) {
    swal({
      title: "warning",
      text: "Email Cannot Be Empty",
      icon: "warning"
    })
  } else {
    swal({
      title: "warning",
      text: "You have entered an invalid email address!",
      icon: "warning"
    })
  }
  return false
}

function ValidatePassword(password) {
  var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (regex.test(password)) return true
  else if (password.length <= 0) {
    swal({
      title:"warning",
      text: "Password Cannot Be Empty",
      icon: "warning"
    })
  } else {
    swal({
      title: "warning",
      text: "You have entered an invalid password.it has at least a number, at least a special character and length must be between 6 to 16.",
      icon: "warning"
    })
  }
  return false
}

function notEmpty(input,fieldName) {
  if (input.length > 0) return true
  else {
    swal({
      title: "warning",
      text: `${fieldName} Cannot Be Empty`,
      icon: "warning"
    })
    return false
  }
}

function ValidatePhone(phone){
  const regx = /^[6-9]\d{9}$/
  if(regx.test(phone)) return true
  else{
    swal({
      title: "warning",
      text: `Enter Valid Phone Number`,
      icon: "warning"
    })
    return false
  }
}

function validatePinCode(pin){
  const regx = /^(\d{6})$/
  if(regx.test(pin)) return true
  else{
    swal({
      title:"warning",
      text: `Enter Valid Pin Code`,
      icon: "warning"
    })
    return false
  }
}

function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + ( 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function allLetter(message) {
  var letters = /^[A-Za-z ]+$/
  if (letters.test(message)) return true
  else if (message.length <= 0) {
    swal({
      title: "warning",
      text: `message Cannot Be Empty`,
      icon: "warning"
    })
  } else {
    swal({
      title: "warning",
      text: `message Containes Only Letters`,
      icon: "warning"
    })
  }
  return false
}

function checkSpecial(inputtxt) {
  let letters = /^[A-Za-z0-9 ]+$/
  if (letters.test(inputtxt)) return true
  else if (inputtxt.length <= 0) {
    swal({
      title: "warning",
      text: "Username Cannot Be Empty",
      icon: "warning"
    })
  } else {
    swal({
      title: "warning",
      text: "Special Characters Not Allowed In Username",
      icon: "warning"
    })
  }
  return false
}

function onlyDigit(input) {
  let letters = /^[0-9 ]+$/
  if (letters.test(input)) return true
  else if (input.length > 10 && input.length <= 10) {
    swal({
      title: "warning",
      text: "Percentage Cannot Be Empty",
      icon: "warning"
    })
  } else {
    swal({
      title: "warning",
      text: "Only Digits Are Allowed",
      icon: "warning"
    })
  }
  return false
}

async function  encrypt(data){
  const ciphertext = await CryptoJS.AES.encrypt(JSON.stringify(data),process.env.REACT_APP_SECRET).toString()
  return ciphertext
}

function decrypt(data){
  const bytes  = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET)
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++ )
      OTP += digits[Math.floor(Math.random() * 10)];
  return OTP;
}

export { notEmpty, 
         allLetter,
         ValidatePassword, 
         ValidateEmail, 
         checkSpecial, 
         onlyDigit,
         setCookie,
         decrypt,
         encrypt,
         generateOTP,
         ValidatePhone,
         validatePinCode }
