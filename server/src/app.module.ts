import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
