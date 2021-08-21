import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest'
import { AppModule } from '../../../app.module';
import { ResponseTransformInterceptor } from '../../../common/interceptors/http';
import { HttpExceptionFilter } from '../../../common/exceptions';


describe('ReservationController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalInterceptors(
      new ResponseTransformInterceptor(),
    );
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
  });


  describe('CreateReservation', () => {

    it('/reservation (POST) should return the created reservation', async () => {
      let response = await request(app.getHttpServer())
        .post('/reservation')
        .set('Content-Type', 'application/json')
        .send({
          "date": "2021-09-10",
          "full_name": "Md. Nabid Salehin Niloy",
          "email": "niloy.android@gmail.com",
          "national_id": (new Date().getTime()).toString(),
          "centre_name": "Centre 2",
          "centre_id": "612172b875348a0fb19c0991"
        })

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

  });

  describe('AllReservation', () => {

    it('/reservation (Get) should return all the reservations', async () => {
      let start_date = "2021-08-01"
      let end_date = "2021-10-01"
      let centre_id = "612172b875348a0fb19c0991"
      let response = await request(app.getHttpServer())
        .get(`/reservation?start_date=${start_date}&end_date=${end_date}&centre_id=${centre_id}`)
        .set('Content-Type', 'application/json')
              
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.success).toEqual(true);
      expect(response.body.message).toEqual('OK');
    });


    it('/reservation (Get) should return all the reservations', async () => {
      let start_date = "2021-09-01"
      let end_date = "2021-10-11"
      let centre_id = "612172b875348a0fb19c0991"
      let response = await request(app.getHttpServer())
        .get(`/reservation?start_date=${start_date}&end_date=${end_date}&centre_id=${centre_id}`)
        .set('Content-Type', 'application/json')
              
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.success).toEqual(true);
      expect(response.body.message).toEqual('OK');
    });
  });

  afterAll(async (done) => {
    await app.close();
    done()
  });
});