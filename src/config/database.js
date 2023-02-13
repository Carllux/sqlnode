module.exports = {
    dialect: 'mssql',
    host: '192.168.3.225',
    username: 'sa',
    password: 'sysadm',
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