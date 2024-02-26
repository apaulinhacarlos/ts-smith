import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('cadastra produto novo', async function () {
    const reqBody = productsMock.productMockWithoutId;
  
    const responseDB = ProductModel.build(productsMock.productsMockWithId[0])

    sinon.stub(ProductModel, 'create').resolves(responseDB)

    const httpResponse = await chai
      .request(app)
      .post('/products')
      .send(reqBody)

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.deep.equal(productsMock.productsMockWithId[0])
  })

});
