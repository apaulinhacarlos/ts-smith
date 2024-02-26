import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import usersMock from '../../mocks/users.mock';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('faz login', async function () {
    const reqBody = usersMock.loginMock;
    const responseDB = UserModel.build(usersMock.userDB)

    sinon.stub(UserModel, 'findOne').resolves(responseDB)
    sinon.stub(jwt, 'sign').callsFake(() => 'validToken');

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(reqBody)

    expect(httpResponse.status).to.equal(usersMock.responseToken.status);
    expect(httpResponse.body).to.deep.equal(usersMock.responseToken.data)
  })
});
