import swal from "sweetalert"

export const SweetWait = () => {
    swal({
        title: "Please Wait",
        buttons:false
    })
}

export const SweetWrong = () => {
    swal({
        title: "Oppss!!",
        text: "Something Went Wrong",
        icon: "error"
    })
}

export const SweetInfo = (info) => {
    swal({
        title: "Oppss!!",
        text: info,
        icon: "info"
    })
}

export const SweetError = (error) => {
    swal({
        title: "Oppss!!",
        text: error,
        icon: "error"
    })
}

export const SweetSuccess = (success) => {
    swal({
        title: "Good Job!!",
        text: success,
        icon: "success"
    })
}

export const SweetWelcome = (success) => {
    swal({
        title: "!! Welcome Back !!",
        text: success,
        icon: "success"
    })
}

export const SweetOtpWrong = () => {
    swal({
        title: "Warning!!",
        text: "Otp Is Wrong.Try Again",
        icon: "info"
    })
}

export const SweetOtpConfig = {
    title:'Verify Your Email',
    content: {
        element: "input",
        attributes: {
            placeholder: "Enter Your Otp",
            type: "password"
        }
    },
    button: {
        text: "Verify!!",
        closeModal: false
    }
}

export const SweetConfirm = () => {
    swal({
        title: "Please Wait",
        text: "We are Confirming Your Order",
        buttons:false
    })
}

export const SweetContact = () => {
    swal({
        title: "Sent",
        text: "We Receive Your Query...We Will Contact You Soon.",
        icon: "success"
    })
}

export const SweetOtpSent = () => {
    swal({
        title: "Otp Is Sent",
        text: "Check Your Mail...",
        icon: "success"
    })
}

export const SweetWrongOtp = () => {
    swal({
        title: "Warning!!",
        text: "Otp Is Wrong...",
        icon: "error"
    })
}

export const SweetPasswordMissMatch = () => {
    swal({
        title: "Oppsss",
        text: "Password MisMatch...Enter Same Password.",
        icon: "warning"
    })
}

export const SweetOrderUpdated = () => {
    swal({
        title: "Yeah!!",
        text: "Order Updated Succesfully",
        icon: "success"
    })
}

export const SweetOrderStatusUpdated = (status) => {
    swal({
        title: "Yeah!!",
        text: status,
        icon: "success"
    })
}
