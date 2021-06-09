import { Injectable } from '@nestjs/common';
import { Message } from '../entities/message.entity';

export interface MessageDAO {
    createMessage(
      userId: number,
      content: string,
      parent: Message
    ): number;
    getChilds(id: number): Message[];
    getById(id: number): Message;
    getParent(id: number): Message;
}


@Injectable()
export class MessageInMemory implements MessageDAO {
  messages: Message[];
  highestId: number;
  messageCount: number;

  public constructor() {
    this.messages = [];
    this.highestId = 0;
    this.messageCount = 0;
  }

  public createMessage(userId: number,
    content: string,
    parent: Message): number {
        let message: Message;
        message = new Message(this.highestId, userId, content, parent)
        this.messages.push(message);
        this.highestId++;
        
        return this.highestId - 1;
    }

  public getById(id: number): Message {
    let message: Message;
    this.messages.forEach((element) => {
        if (element.id === id) {
            message = element;
        } 
    });
    return message;
  }

  public getChilds(id: number): Message[] {
    return this.getById(id).childs;
  }

  public getParent(id: number): Message {
      return this.getById(id).parent;
  }
}


