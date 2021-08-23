import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest'
import { AppModule } from '../../../app.module';
import { ResponseTransformInterceptor } from '../../../common/interceptors/http';


describe('SlotController', () => {
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


  describe('AllSlot', () => {

    it('/slot (Get) should return all the slots of a companye in a date range.', async () => {
      let start_date = "2021-08-01"
      let end_date = "2021-10-01"
      let centre_id = "6122eb98a6a5790020cc09c8"
      let response = await request(app.getHttpServer())
        .get(`/slot?start_date=${start_date}&end_date=${end_date}&centre_id=${centre_id}`)
        .set('Content-Type', 'application/json')
              
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.success).toEqual(true);
      expect(response.body.message).toEqual('OK');
    });

    it('/slot (Get) should return all the slots of a companye in a date range.', async () => {
      let start_date = "2021-08-06"
      let end_date = "2021-10-06"
      let centre_id = "6122eb98a6a5790020cc09c8"
      let response = await request(app.getHttpServer())
        .get(`/slot?start_date=${start_date}&end_date=${end_date}&centre_id=${centre_id}`)
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