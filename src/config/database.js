module.exports = {
    dialect: 'mssql',
    host: '192.168.3.187',
    username: 'sa',
    password: 'desenvolvimento#@2023',
    database: 'BDAdm',
    define: {
        timestamps: true,
        underscored: true
    },
    dialectOptions: {
        options: {
            encrypt: false,
            enableArithAbort: false
        }
    }


};