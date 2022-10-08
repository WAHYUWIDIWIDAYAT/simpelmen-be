const usersModel = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: Sequelize.STRING,
      },
      user_email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      user_ikm: {
        type: Sequelize.STRING,
      },
      user_contact: {
        type: Sequelize.STRING,
      },
      user_address: {
        type: Sequelize.STRING,
      },
      user_district: {
        type: Sequelize.STRING,
      },
      user_city: {
        type: Sequelize.STRING,
      },
      user_province: {
        type: Sequelize.STRING,
      },
      user_postal_code: {
        type: Sequelize.INTEGER,
      },
      user_password: {
        type: Sequelize.STRING,
      },
      user_picture: {
        type: Sequelize.BLOB,
      },
      user_status: {
        type: Sequelize.BOOLEAN,
      },
      user_verfy: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Users;
};

export default usersModel;
