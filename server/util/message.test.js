const expect = require('expect');

let {generateMessage} = require('./message');

describe('genereateMessage', () => {
  it('should generate correct message object', () => {
    //store res in var
    const from = 'Doe';
    const text = 'Text Value';
    const message = generateMessage(from, text);

    //assert from text createdAt match
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ // changing from toInclude
      from,
      text
    });
  });
});