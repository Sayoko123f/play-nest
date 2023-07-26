import { MongooseExceptionFilter } from './mongoose-exception.filter';

describe('MongooseExceptionFilter', () => {
  it('should be defined', () => {
    expect(new MongooseExceptionFilter()).toBeDefined();
  });
});
