import { createTransport } from 'nodemailer'
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailHelper {
  constructor(
    private configService: ConfigService
  ){}
  async sendEmail(email: string, subject: string, body: string) {
    console.log(this.configService.get('email'));
    console.log(this.configService.get('email_password'));
    
    let transporter = createTransport({
      host: 'smtp.gmail.com',
      service: 'Gmail',
      secure: true,
      port: 465,
      auth: {
        user: this.configService.get('email'),
        pass: this.configService.get('email_password')
      },
      ignoreTLS: true,
      tls: {
        rejectUnauthorized: false
      },
      logger: false,
      debug: false
    });
    body = '<html><head></head><body>' + body + '</body></html>'
    let mailOptions = {
      from: 'Homage Vaccination',
      to: email,
      subject: subject,
      html: body
    };
    try {
      await transporter.sendMail(mailOptions);
      Logger.log('Mail Sent')
    } catch (error) {
      Logger.error(error, 'SendMail');
    }
  }
}
