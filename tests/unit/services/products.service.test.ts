import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/services/products.service';
import productsMock from '../../mocks/products.mock';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('cadastra novo produto', async function () {
    const responseDB = ProductModel.build(productsMock.productsMockWithId[0])

    sinon.stub(ProductModel, 'create').resolves(responseDB)
    
    const result = await productsService.createProduct(productsMock.productMockWithoutId)

    expect(result).to.equal(responseDB.dataValues)
  })
    
  it('lista produtos', async function () {
    const responseDB = [
      ProductModel.build(productsMock.productsMockWithId[0]),
      ProductModel.build(productsMock.productsMockWithId[1]),
    ]

    sinon.stub(ProductModel, 'findAll').resolves(responseDB)
    
    const result = await productsService.listProducts()

    expect(result).to.equal(responseDB)
  })

});
