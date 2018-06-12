module.exports = {
    port: process.env.PORT || 8125,
    db: {
        host: process.env.DATABASE_HOST || '127.0.0.1',
        database: 'micro_database',
        user: 'admin',
        password: 'password',
        port: 3306
    }
};