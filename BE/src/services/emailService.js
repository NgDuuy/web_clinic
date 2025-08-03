import { lastIndexOf, reject } from 'lodash';
import nodemailer, { createTestAccount } from 'nodemailer';
require('dotenv').config()

let sendSimpleEmail = async (dataSend) => {
    // Tạo transporter dùng tài khoản giả lập
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // Gửi email
    let info = await transporter.sendMail({
        from: `"Booking Care" <${process.env.EMAIL_APP}>`,
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lịch khám bệnh",
        html: getBodyHTMLEmail(dataSend)

    });

};
let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào: ${dataSend.patientName} </h3>
        <h4>Chúc mừng bạn vừa đặt lịch khám bệnh thành công.</<h4>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</d></div>
        <div><b>Bác sỹ: ${dataSend.doctorName}</d></div>

        <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào 
        đường link bên dưới để xác nhận hoàn tất thủ tục đặt lịch khámkhám</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">click here</a>
        </div>

        <div>Xin chân thành cảm ơn.</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear: ${dataSend.patientName} </h3>
        <h4>Congratulations you have been booking appointment successfully.</<h4>
        <p>Information with your appointment: </p>
        <div><b>Time: ${dataSend.time}</d></div>
        <div><b>Doctor: ${dataSend.doctorName}</d></div>

        <p> If the abrove information is correct, please click on the link below to confirm the completion of the
        appointment procedure.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">click here</a>
        </div>

        <div>Thank a lot.</div>
        `
    }
    return result
}
let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Check datasend: ", dataSend)
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            // Gửi email
            let info = await transporter.sendMail({
                from: `"Booking Care" <${process.env.EMAIL_APP}>`,
                to: dataSend.email,
                subject: "Kết quả khám bệnh, hóa đơn và danh sách thuốc.",
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `Remedy-${dataSend.patientId}-${dataSend.patientName}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64")[1],
                        encoding: 'base64'
                    }
                ]
            });
            console.log("Check infor send: ");
            console.log(info)
            resolve();
        }
        catch (e) {
            reject(e)
        }
    })

}
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào:${dataSend.patientName}</h3>
        <h4>Chúc mừng bạn vừa đặt lịch khám bệnh thành công.</<h4>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>


        <div>Xin chân thành cảm ơn.</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear: ${dataSend.patientName}</h3>
        <h4>Congratulations you have been booking appointment successfully.</<h4>
        <p>Information your medicine had send with file blow. </p>

        <div>Thank a lot.</div>
        `
    }
    return result
}
module.exports = {
    sendSimpleEmail, sendAttachment
}