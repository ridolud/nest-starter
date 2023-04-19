import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { async } from 'rxjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: config.get("REDIS_HOST"),
        port: config.get("REDIS_PORT"),
        ttl: 5, // second
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
