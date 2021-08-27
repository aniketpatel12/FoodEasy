function ValidateEmail(mail) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (regex.test(mail)) return true
  else if (mail.length <= 0) return false
  else return false
  
}

function ValidatePassword(password) {
  var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

  if (regex.test(password)) return true
  else if (password.length <= 0) return false
  else return false
}

function notEmpty(input) {
  if (input.length > 0) return true
  return false
}


function allLetter(message) {
  var letters = /^[A-Za-z ]+$/

  if (letters.test(message)) return true
  else if (message.length <= 0) return false
  else return false
}

function checkSpecial(inputtxt) {
  let letters = /^[A-Za-z0-9 ]+$/
  if (letters.test(inputtxt)) return true
  else if (inputtxt.length <= 0) return false
  else return false
}

function validatePinCode(pin){
  const regx = /^(\d{6})$/
  if(regx.test(pin)) return true
  else return false
}

function ValidatePhone(phone){
  const regx = /^[6-9]\d{9}$/
  if(regx.test(phone)) return true
  else
    return false
}

module.exports =  { notEmpty, allLetter,ValidatePassword, ValidateEmail, checkSpecial,validatePinCode,ValidatePhone }
