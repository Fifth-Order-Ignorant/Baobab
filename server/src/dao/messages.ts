import { Injectable } from '@nestjs/common';
import { Message } from '../entities/message.entity';

export interface MessageDAO {
  createMessage(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Message,
  ): number;
  getChilds(id: number): Message[];
  getByID(id: number): Message;
  getParent(id: number): Message;
  getMessages(start: number, end: number): Record<string, string | number>[];
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
    parent: Message,
  ): number {
    const message = new Message(
      this.highestID,
      userID,
      content,
      timestamp,
      parent,
    );
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

  public getMessages(
    start: number,
    end: number,
  ): Record<string, string | number>[] {
    const messages: Message[] = this.messages;
    const i: number = start;
    const lst: Record<string, string | number>[] = [];
    const n: number = messages.length;
    while (i < end && i < n) {
      const message: Message = messages[i];
      const newMessage: Record<string, string | number> = Object({
        author: message.userID,
        timestamp: message.timestamp.toISOString(),
        content: message.content,
        messageID: message.id,
      });
      lst.push(newMessage);
    }
    return lst;
  }
}
