import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('lista produtos', async function () {
    const responseDB = [
      ProductModel.build(productsMock.productsMockWithId[0]),
      ProductModel.build(productsMock.productsMockWithId[1]),
    ]

    sinon.stub(ProductModel, 'findAll').resolves(responseDB)
    
    const httpResponse = await chai
      .request(app)
      .get('/products')

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(productsMock.productsMockWithId)
  })

});
