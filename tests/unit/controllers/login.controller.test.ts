import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import usersMock from '../../mocks/users.mock';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('faz login', async function () {
    sinon.stub(loginService, 'login').resolves(usersMock.responseToken)

    req.body = usersMock.loginMock;
    
    await loginController.login(req, res)

    expect(res.status).to.have.been.calledWith(usersMock.responseToken.status);
    expect(res.json).to.have.been.calledWith(usersMock.responseToken.data)
  })

});
