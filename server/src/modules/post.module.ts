import { Module } from '@nestjs/common';
import { PostController } from '../controllers/post.controller';
import { PostService } from '../services/post.service';
import { PostInMemory } from '../dao/memory/posts.mem';
import { AuthModule } from './auth.module';
import { UserProfileModule } from './userprofile.module';

@Module({
  imports: [AuthModule, UserProfileModule],
  controllers: [PostController],
  providers: [{ provide: 'PostDAO', useClass: PostInMemory }, PostService],
  exports: [{ provide: 'PostDAO', useClass: PostInMemory }],
})
export class PostModule {}
