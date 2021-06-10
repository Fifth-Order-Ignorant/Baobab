import { MessageInMemory } from '../src/dao/messages';

describe('Message Basic Functionality', () => {
  it('should create a message with valid id', () => {
    const messages = new MessageInMemory();

    const messageId = messages.createMessage(1, 'hello', undefined);
    expect(messages.getById(messageId).id == messageId);
  });

  it('should return a message given an id', () => {
    const messages = new MessageInMemory();
    const messageId = messages.createMessage(1, 'hello', undefined);

    const message = messages.getById(messageId);
    expect(message.parent == undefined);
  });
});