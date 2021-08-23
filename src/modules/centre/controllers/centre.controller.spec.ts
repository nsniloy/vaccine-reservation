import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest'
import { AppModule } from '../../../app.module';
import { ResponseTransformInterceptor } from '../../../common/interceptors/http';
import { HttpExceptionFilter } from '../../../common/exceptions';


describe('CentreController', () => {
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


  describe('CreateCentre', () => {

    it('/centre (POST) should return the created centre', async () => {
      let response = await request(app.getHttpServer())
        .post('/centre')
        .set('Content-Type', 'application/json')
        .send({
          "name": "Centre 1",
          "address": "Singapore",
          "vaccination_duration": 10
        })

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
    });

    it('/centre (POST) should throw a bad request error', async () => {
      let response = await request(app.getHttpServer())
        .post('/centre')
        .set('Content-Type', 'application/json')
        .send({
          "name": "Centre 2",
          "address": "Singapore",
          "vaccination_duration": 0
        })
      expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('/centre (POST) should return the created centre', async () => {
      let response = await request(app.getHttpServer())
        .post('/centre')
        .set('Content-Type', 'application/json')
        .send({
          "name": "Centre 2",
          "address": "Singapore",
          "vaccination_duration": 5
        })

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
    });

    it('/centre (POST) should throw a bad request error', async () => {
      let response = await request(app.getHttpServer())
        .post('/centre')
        .set('Content-Type', 'application/json')
        .send({
          "name": "Centre 2",
          "address": null,
          "vaccination_duration": 10
        })
      expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    });

  });

  describe('AllCentre', () => {

    it('/centre (Get) should return all the centres', async () => {
      let response = await request(app.getHttpServer())
        .get('/centre')
        .set('Content-Type', 'application/json')
              
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.success).toEqual(true);
      expect(response.body.message).toEqual('OK');
    });
  });

  describe('DeleteCentre', () => {

    it('/centre (Delete) should delete a centre', async () => {
      let response = await request(app.getHttpServer())
        .delete('/centre/61216d09ea1d0f0ab8c86616')
        .set('Content-Type', 'application/json')
              
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.success).toEqual(true);
      expect(response.body.message).toEqual('Centre deleted successfully');
    });
  });

  afterAll(async (done) => {
    await app.close();
    done()
  });
});