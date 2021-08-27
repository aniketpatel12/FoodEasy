import emailjs from 'emailjs-com'

export const SendEmail = (Mail_data) => 
            emailjs.send(
                            `${process.env.REACT_APP_SERVICE_ID}`,
                            `${process.env.REACT_APP_TEMPLATE_ID}`,
                            Mail_data,
                            `${process.env.REACT_APP_USER_ID}`
                        )