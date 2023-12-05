const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      required: true,
      len: [5, 20],
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      required: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "users", //use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = User;
