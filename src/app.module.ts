import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AdapterModule } from '@modules/adapter/adapter.module';
import { CentresModule } from './modules/centres/centres.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>{        
        return configService.get('database')
      },
      inject: [ConfigService],
    }),
    HttpModule,
    AdapterModule,
    CentresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
