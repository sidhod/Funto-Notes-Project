const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = '460015409362-iua8oecket9j80clcrm37f5g3j2rsq68.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04H3c_2Vb-Nh_CgYIARAAGAQSNwF-L9IriX8LYLFW7y4vhfK3Wg0uvCpiXc-1F3wXtGQ0I0ejMrj5d6pCmlQ4W6EIApeHxfVzyOM';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(email, token) {
    try {
        console.log(token);
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'sidhodhank2018@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'Sidhodhan Kamble <sidhodhank2018@gmail.com>',
            to: email,
            subject: 'Gmail api using to demo email',
            text: 'Testing Gmail api for emails',
            html: `<h1>Reset Your password <a href="http://localhost:3000/api/v1/users/resetpwd">Click here</a></h1>`

        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

// sendMail()
//     .then((result) => console.log('Email sent...', result))
//     .catch((error) => console.log(error.message));