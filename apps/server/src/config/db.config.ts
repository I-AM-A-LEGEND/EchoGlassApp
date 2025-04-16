import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/echoglass.sqlite",
  logging: false
});

export default sequelize;
