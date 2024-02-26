import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import usersMock from '../../mocks/users.mock';
import loginService from '../../../src/services/login.service';
import jwt from 'jsonwebtoken';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('faz login', async function () {
    const responseDB = UserModel.build(usersMock.userDB)

    sinon.stub(UserModel, 'findOne').resolves(responseDB)
    sinon.stub(jwt, 'sign').callsFake(() => 'validToken');
    
    const result = await loginService.login(usersMock.loginMock)

    expect(result).to.deep.equal(usersMock.responseToken)
  })

  it('quando usuario é invalido', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null)
    
    const result = await loginService.login(usersMock.loginMockError)

    expect(result).to.deep.equal(usersMock.responseLoginError)
  })
});
