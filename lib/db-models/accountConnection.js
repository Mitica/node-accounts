module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AccountConnection', {
    // md5: accountId + provider + providerProfileId
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    // accountId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
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
