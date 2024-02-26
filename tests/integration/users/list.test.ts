import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import usersMock from '../../mocks/users.mock';

chai.use(chaiHttp);

describe('GET /users', function () { 
  beforeEach(function () { sinon.restore(); });

  it('lista usuários', async function () {
    

    sinon.stub(UserModel, 'findAll').resolves(usersMock.usersMock as any)

    const httpResponse = await chai
      .request(app)
      .get('/users')

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(usersMock.usersMock)
  })

});
