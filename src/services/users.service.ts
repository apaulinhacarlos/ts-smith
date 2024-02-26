import ProductModel from '../database/models/product.model';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import sequelize from '../database/models/index';

// com HOF
// type UserFromDB = {
//   username: string;
//   productIds: number[] | undefined;
// };

// const listUsers = async () : Promise<UserFromDB[]> => {
//   const users = await UserModel.findAll({
//     attributes: ['username'],
//     include: {
//       model: ProductModel,
//       as: 'productIds',
//       attributes: ['id'],
//     },
//   });

//   const usersFromDB = users.map((item) => item.dataValues);

//   const result = usersFromDB.map((user) => ({
//     username: user.username,
//     productIds: user.productIds?.map((item) => item.id),
//   }));
      
//   return result;
// };

// com Sequelize
const listUsers = async () : Promise<UserSequelizeModel[]> => {
  const users = await UserModel.findAll({
    attributes: [
      'username', 
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],
    ],
    include: {
      model: ProductModel,
      as: 'productIds',
      attributes: [],      
    },
    group: 'User.id',
    raw: true,
    /* raw: true - traz os resultados como objetos simples em vez de instâncias do modelo Sequelize.
    Isso significa que você obterá apenas os dados brutos do banco de dados,
    sem métodos ou propriedades adicionais fornecidas pelo Sequelize. */
  });
      
  return users;
};

export default {
  listUsers,
};