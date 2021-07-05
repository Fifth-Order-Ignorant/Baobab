import { Module } from '@nestjs/common';
import { PostController } from '../controllers/post.controller';
import { PostService } from '../services/post.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
