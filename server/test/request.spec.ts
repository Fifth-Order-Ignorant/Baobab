import { Role } from './../src/entities/role.entity';
import { RequestInMemory } from '../src/dao/requests';

describe('Request Basic Functionality', () => {
  it('should create a request with valid id', () => {
    const requests = new RequestInMemory();

    const requestID = requests.createRequest(
      1,
      'gimme permissions',
      new Date(),
      Role.INVESTOR_REP,
    );
    expect(requests.getById(requestID).id == requestID);
  });

  it('should return a request with requested Role', () => {
    const requests = new RequestInMemory();
    const requestID = requests.createRequest(
      1,
      'gimme permissions',
      new Date(),
      Role.INVESTOR_REP,
    );

    const request = requests.getById(requestID);
    expect(request.role == Role.INVESTOR_REP);
  });
});
