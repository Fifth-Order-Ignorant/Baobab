import { Inject, Injectable } from '@nestjs/common';
import { MessageDAO } from '../dao/messages';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessageService {

  constructor(@Inject('MessageDAO') private _messageRepository: MessageDAO) {}

  createMessage(
    userID: number,
    content: string,
    timestamp: Date,
    parentID: number,
  ): Message {
    return this._messageRepository.getByID(this._messageRepository.createMessage(userID, content, timestamp, this._messageRepository.getByID(parentID)))
  }

}
