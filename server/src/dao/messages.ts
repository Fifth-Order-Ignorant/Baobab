import { Injectable } from '@nestjs/common';
import { Message } from '../entities/message.entity';

export interface MessageDAO {
    createMessage(
      userID: number,
      content: string,
      timestamp: Date,
      parent: Message
    ): number;
    getChilds(id: number): Message[];
    getByID(id: number): Message;
    getParent(id: number): Message;
}


@Injectable()
export class MessageInMemory implements MessageDAO {
  messages: Message[];
  highestID: number;
  messageCount: number;

  public constructor() {
    this.messages = [];
    this.highestID = 0;
    this.messageCount = 0;
  }

  public createMessage(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Message
    ): number {
        let message: Message;
        message = new Message(this.highestID, userID, content, timestamp, parent)
        this.messages.push(message);
        this.highestID++;
        
        return this.highestID - 1;
    }

  public getByID(id: number): Message {
    let message: Message;
    this.messages.forEach((element) => {
        if (element.id === id) {
            message = element;
        } 
    });
    return message;
  }

  public getChilds(id: number): Message[] {
    return this.getByID(id).childs;
  }

  public getParent(id: number): Message {
      return this.getByID(id).parent;
  }
}


