import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { UKR_EMAIL_PASSWORD, UKR_EMAIL_ADDRESS } = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: { user: UKR_EMAIL_ADDRESS, pass: UKR_EMAIL_PASSWORD },
};

export const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (data) => {
    const email = { ...data, from: UKR_EMAIL_ADDRESS };

    await transport.sendMail(email);
    return true;
};