import { Module } from '@nestjs/common';
import { PostController } from '../controllers/post.controller';
import { PostService } from '../services/post.service';
import { AuthModule } from './auth.module';
import { InMemoryDAOModule } from './memory.module';

@Module({
  imports: [InMemoryDAOModule, AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
