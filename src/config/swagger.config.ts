import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const title = 'Vaccine Reservation Service';
const description = 'Vaccine Reservation RESTFul API Documentation.';
const version = '1.0';

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const configSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-doc', app, document);
};
