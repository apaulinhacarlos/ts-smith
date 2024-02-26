import { expect } from 'chai';
import sinon from 'sinon';
import usersService from '../../../src/services/users.service'
import UserModel from '../../../src/database/models/user.model';
import usersMock from '../../mocks/users.mock';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('lista usuários', async function () {
    sinon.stub(UserModel, 'findAll').resolves(usersMock.usersMock as any)

    const result = await usersService.listUsers()

    expect(result).to.deep.equal(usersMock.usersMock)
  })
});
