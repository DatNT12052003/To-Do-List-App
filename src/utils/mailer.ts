import nodemailer from "nodemailer";
import { ISendEmail } from "../interfaces/common.interface";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendMail = (data: ISendEmail) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.to,
        subject: data.subject,
        html: data.html,
    });
};
