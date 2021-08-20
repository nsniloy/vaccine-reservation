import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailHelper {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async sendEmail(emails: string[], subject: string, body: string) {
    try {
      body = '<html><head></head><body>' + body + '</body></html>'
    } catch (error) {
      console.log('Sendgrid Error:', error);
    }
  }
}
