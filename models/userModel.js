module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phone: {
        type: DataTypes.DECIMAL,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return User;
};
