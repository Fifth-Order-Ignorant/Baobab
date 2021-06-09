import {
  InternalServerErrorException,
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { Response } from 'express';
import { MessageRequest } from 'baobab-common';
import { JwtAuthGuard } from './jwt.guard';

@Controller('message')
export class MessageController {
  constructor(private _messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('message')
  createMessage(
    @Body() reqBody: MessageRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
    const today = new Date();
    const message = this._messageService.createMessage(
      req.user.id,
      reqBody.content,
      today,
      reqBody.parentID,
    );
    if (!message) {
      throw new InternalServerErrorException({
        errors: [],
      });
    }
  }
}
