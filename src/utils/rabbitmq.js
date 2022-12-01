import { json } from 'express';
import { sendRegistrationMail } from './user.registrationemail';
import { sendMail } from './user.util';
var amqp = require('amqplib/callback_api');
export const sender = (data) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';
            var msg = data;

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
    });
}
export async function reciver() {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            channel.consume(queue, async function (msg) {
                console.log(" [x] Received %s", msg.content.toString());
                let dataInJSON = JSON.parse(msg.content);
                console.log("out", dataInJSON.email);
                let send = await sendRegistrationMail(dataInJSON);
                console.log("send========>", send);
            }, {
                noAck: true
            });
        });
    });
}
