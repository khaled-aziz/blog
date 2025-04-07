import { Sequelize } from 'sequelize';


export const sequelizeconn = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

