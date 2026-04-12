import { Request } from "express";
import * as userModel from "../models/user.model";
import { createOTP, getOTPByCodeAndType, updateOTPIsUsed } from "../models/opt.model";
import { IInputCreateOTP } from "../interfaces/otp.interface";
import { sendMail } from "../utils/mailer";

export const generateOTPResetPasswordService = async (req: Request) => {
    const { email } = req.body;
    if (!email) {
        return Promise.reject(new Error("Email is required"));
    }
    const checkUser = await userModel.getUserByEmail(email);
    if (!checkUser) {
        return Promise.reject(new Error("User not found"));
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    const otpData: IInputCreateOTP = {
        userId: checkUser.id,
        code: otpCode,
        type: "RESET_PASSWORD",
        expiresAt,
    };

    await createOTP(otpData);

    await sendMail({
        to: email,
        subject: "Your OTP Code for Password Reset",
        html: `<p>Your OTP code is: <strong>${otpCode}</strong>. It will expire in 5 minutes.</p>`,
    });

    return true;
};

export const verifyOTPService = async (req: Request) => {
    const { code } = req.body;
    console.log("Received OTP code: ", code);
    if (!code) {
        return Promise.reject(new Error("Code is required"));
    }

    const checkOTP = await getOTPByCodeAndType({ code, type: "RESET_PASSWORD" });

    console.log("OTP retrieved from database: ", checkOTP);

    if (!checkOTP || code !== checkOTP.code) {
        return Promise.reject(new Error("Invalid OTP"));
    }

    if (checkOTP.isUsed) {
        return Promise.reject(new Error("OTP has already been used"));
    }

    console.log(checkOTP.expiresAt < new Date());

    if (checkOTP.expiresAt < new Date()) {
        return Promise.reject(new Error("OTP has expired"));
    }

    if (checkOTP) {
        console.log("OTP is valid: ", checkOTP);
        await updateOTPIsUsed(checkOTP.id);
        return true;
    }

    return false;
};
