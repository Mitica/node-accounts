module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AccountConnection', {
    // sha1: accountId + provider + providerProfileId
    id: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    // sha1: appId + provider + providerProfileId = for fast login
    key: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    // accountId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    appId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    provider: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    providerProfileId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // accessToken:refreshToken, or token:tokenSecret, or identifier, or... IN JSON format
    accessData: {
      type: DataTypes.TEXT
    }
  });
};
