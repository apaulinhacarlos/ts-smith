const usersMock = [
  { dataValues:
    {
      username: 'Hagar',
      productIds: [{ id: 1 }, { id: 2 }]
    },
  },
  { dataValues:
    {
      username: 'Eddie',
      productIds: [{ id: 3 }, { id: 4 }]
    },
  },
]

const loginMock = {
  username: 'Hagar',
  password: 'terrível'
}

const loginMockError = {
  username: 'Batatinha',
  password: 'frita'
}

const responseToken = {
  status: 200,
  data: { token: 'validToken'  }
}

const responseLoginError = {
  status: 401,
  data: { message: 'Username or password invalid'  }
}

const userDB = {
  id: 1,
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: '$2a$10$jM5mTgFwMrVWf8PjeiAXou2p8tPphAtbXlf76cOloLYQP8VxAOE8u'
}

export default {
  usersMock,
  loginMock,
  loginMockError,
  responseToken,
  responseLoginError,
  userDB
}