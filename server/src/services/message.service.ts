import { Inject, Injectable } from '@nestjs/common';
import { MessageDAO } from '../dao/messages';
import { Message } from '../entities/message.entity';
import { UserProfileDAO } from '../dao/userprofiles';

@Injectable()
export class MessageService {
  constructor(
    @Inject('UserProfileDAO') private _userRepository: UserProfileDAO,
    @Inject('MessageDAO') private _messageRepository: MessageDAO,
  ) {}

  createMessage(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Message,
  ): Message {
    return this._messageRepository.getByID(
      this._messageRepository.createMessage(userID, content, timestamp, parent),
    );
  }

  getParentMessage(parentID: number): Message {
    return this._messageRepository.getByID(parentID);
  }

  getPaginatedMessages(
    start: number,
    end: number,
  ): Record<string, string | number>[] {
    const messages: Record<string, string | number>[] =
      this._messageRepository.getMessages(start, end);
    messages.map((element) =>
      Object({
        author: this._userRepository.getProfileByID(element.author as number)
          .name,
        timestamp: element.timestamp,
        content: element.content,
        messageID: element.messageID,
      }),
    );
    return messages;
  }
}
