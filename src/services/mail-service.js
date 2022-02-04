const nodemailer = require("nodemailer");
require("dotenv").config();

const URL_NEW_PASS =
  "http://animaplay-front.s3-website-sa-east-1.amazonaws.com/novasenha?token=";

exports.sendRecoveryPasswordMail = async (email, generatedToken) => {
  //let link_to_recovery = `${URL_NEW_PASS}${generatedToken}`;
  let link_to_recovery =
    "http://animaplay-front.s3-website-sa-east-1.amazonaws.com/";

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Suporte âHub",
      html: `Olá, <br><br>Foi solicitada recuperação de senha para sua conta no âHub.<br>Clique <a href='${link_to_recovery}'><span>aqui</span></a> para criar uma nova senha.<br><br>Esse link irá expirar em uma hora.<br><br><i>temp_dev_info: ${generatedToken}</i><br><br>Caso não tenha solicitado recuperação da conta, desconsidere este e-mail.<br>Suporte âHub`,
    });

    console.log(`email to recovery pass sent sucessfully to ${email}`);
    return true;

  } catch (error) {
    console.log(`email to recovery pass not sent to ${email}`, error);
    return false;
  }
};