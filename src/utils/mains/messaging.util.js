import { queueMessaging } from '#queue/messagingQueue';
import EmailService from '#service_util/messaging/EmailService';
import SmsService from '#service_util/messaging/SmsService';
import WhatsAppService from '#service_util/messaging/WhatsAppService';
import PushNotificationService from '#service_util/messaging/PushNotificationService';


const sendMessage = async (data, type) => {
    const messageData = data;

    if(type === 'queue'){
        queueMessaging(data);
        return ;
    }

    switch (data.send_medium) {
        case 'email':
            return await EmailService.send(messageData);

        case 'whatsapp':
            return await WhatsAppService.send(messageData);

        case 'sms':
            return await SmsService.send(messageData);

        case 'push_notification':
            return await PushNotificationService.send(messageData);

        default:
            throw new Error(`Unsupported send_medium: ${data.send_medium}`);
    }
};

export {
    sendMessage,
};
