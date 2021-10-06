import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { motion } from "framer-motion";
import PasswordInput from "../Components/PasswordInput";
import { RegiterValidation } from "../Utils/Validation";
import {
  SweetError,
  SweetInfo,
  SweetOtpConfig,
  SweetOtpWrong,
  SweetSuccess,
  SweetWait,
  SweetWrong,
} from "../../../SweetAlert";
import { PageAnimation } from "../../../utils/PageAnimation";
import api from "../../../utils/api";
import { SendEmail } from "../../../EmailJs/SendEmail";
import { VerifyOtpTemplate } from "../../../EmailJs/Templates";
import { generateOTP } from "../../../utils/functions";
import signupimage from "../../../SvgIcons/SignUp.svg";

const Register = () => {
  const [UserDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [otpStatusText, setOtpStatusText] = useState("Send Otp");

  const history = useHistory();

  const [otp, setOtp] = useState(generateOTP());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (RegiterValidation(UserDetails)) {
      SweetWait();

      const res = await api.post("/userexist", UserDetails.email);

      const { info, error } = res.data;

      if (info) {
        SweetInfo(info);
        history.push("/signin");
      } else if (error) SweetWrong();
      else {
        const sendEmail = {
          otp,
          username: UserDetails.username,
          email: UserDetails.email,
        };
        try {
          const isSent = await SendEmail(VerifyOtpTemplate(sendEmail));

          if (isSent.status === 200) {
            const userOtp = await swal(SweetOtpConfig);
            if (otp === userOtp) {
              swal.stopLoading();
              swal.close();

              const res = await api.post("/register", UserDetails);
              const { success, error } = res.data;

              if (success) {
                SweetSuccess(success);
                history.push("/signin");
              } else SweetError(error);
            } else SweetOtpWrong();
            setOtpStatusText("Resend Otp");
          }
        } catch (error) {
          SweetWrong();
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <motion.section
      className="flex justify-center pt-20"
      initial="in"
      animate="out"
      exit="exit"
      variants={PageAnimation}
      transition={{ duration: 0.4 }}
    >
      <img src={signupimage} height="30%" width="30%" />
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          autoComplete="new-password"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="input-label" htmlFor="username">
              Name
            </label>
            <input
              name="username"
              value={UserDetails.username}
              onChange={handleChange}
              className="input-box"
              type="text"
              placeholder="Enter your name"
              autoComplete="none"
            />
          </div>
          <div className="mb-4">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              value={UserDetails.email}
              onChange={handleChange}
              className="input-box"
              autoComplete="none"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="input-label" htmlFor="phone">
              Phone
            </label>
            <input
              name="phone"
              value={UserDetails.phone}
              onChange={handleChange}
              className="input-box"
              placeholder="Enter your phone number"
              autoComplete="none"
            />
          </div>
          <PasswordInput value={UserDetails.password} onChange={handleChange} />
          <button className="btn-primary btn mt-4" type="submit">
            {otpStatusText}
          </button>
          <div className="w-full text-center my-4">
            <Link
              className="primary-text align-baseline font-bold text-sm"
              to="/signin"
            >
              Already have account?
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2021 FoodEasy.All rights reserved.
        </p>
      </div>
    </motion.section>
  );
};

export default Register;
