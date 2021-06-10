import {
  InternalServerErrorException,
  Body,
  Controller,
  Post,
  Get,
  Res,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { Response } from 'express';
import { MessageRequest, MessagePaginationRequest } from 'baobab-common';
import { JwtAuthGuard } from './jwt.guard';

@Controller('message')
export class MessageController {
  constructor(private _messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createMessage(
    @Body() reqBody: MessageRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
    const today = new Date();
    const parent = this._messageService.getParentMessage(reqBody.parentID);
    if (!parent) {
      throw new BadRequestException({
        errors: [],
      });
    }
    const message = this._messageService.createMessage(
      req.user.id,
      reqBody.content,
      today,
      parent,
    );
    if (!message) {
      throw new InternalServerErrorException({
        errors: [],
      });
    }
  }

  @Get('pagination')
  pagination(
    @Body() reqBody: MessagePaginationRequest,
  ): Record<string, string | number>[] {
    const paginatedMessages = this._messageService.getPaginatedMessages(
      reqBody.start,
      reqBody.end,
    );
    return paginatedMessages;
  }
}
