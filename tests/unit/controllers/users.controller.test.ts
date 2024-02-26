import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import usersService from '../../../src/services/users.service';
import usersController from '../../../src/controllers/users.controller';
import usersMock from '../../mocks/users.mock';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('lista usuários', async function () {
    sinon.stub(usersService, 'listUsers').resolves(usersMock.usersMock as any)
    
    await usersController.listUsers(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(usersMock.usersMock)
  })   
});