module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'user_auth',
      user: 'user_auth',
      password: 'user_auth'
    },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      tableName: 'migrations'
    }
  }

};