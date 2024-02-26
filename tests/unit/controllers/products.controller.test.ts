import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response, response } from 'express';
import productsService from '../../../src/services/products.service';
import productsController from '../../../src/controllers/products.controller';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('cadastra novo produto', async function () {
    sinon.stub(productsService, 'createProduct').resolves(productsMock.productsMockWithId[0])

    req.body = {
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      userId: 1
    }
    
    await productsController.createProduct(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productsMock.productsMockWithId[0])
  })

  it('lista produtos', async function () {
    const responseDB = [
      ProductModel.build(productsMock.productsMockWithId[0]),
      ProductModel.build(productsMock.productsMockWithId[1]),
    ]
    
    sinon.stub(productsService, 'listProducts').resolves(responseDB)
    
    await productsController.listProducts(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(responseDB)
  })    
});
