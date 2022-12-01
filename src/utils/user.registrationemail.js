const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = '460015409362-9utmv2hll4g699ckij28ng4dcfvut7rt.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04aP7OHtl2PIyCgYIARAAGAQSNwF-L9Ir8Baiely3I-r186L8kVE5eXBHrdLMkga1QTUOctTq2LsLelTJPL2iezFijR81m72zSgY';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendRegistrationMail(dataInJSON) {
    try {
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
            to: dataInJSON.email,
            subject: 'Your Successfully Register In Fundoo Notes',
            html: `<h2>Hello ${dataInJSON.firstName},<h2> 
            <h3>Thank you for joining Fundoo Notes.<h3>
            
            <h3>We’d like to confirm that your account was created successfully. To access account click the link below.</h3>
            <h3><b>Login IN Fundoo Notes <a href="http://localhost:3000/api/v1/users/logins">Click here</a></b></h3>
            <h3>If you experience any issues logging into your account, reach out to us at ${dataInJSON.email}.</h3>
    
            <h3>Best,<h3>
            <h3>The Fundoo Notes team<h3>
            `

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