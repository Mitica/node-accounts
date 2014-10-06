module.exports = function(sequelize, DataTypes) {
	return sequelize.define('GlobalProfile', {
		// provider + providerProfileId md5
		id: {
			type: DataTypes.STRING(32),
			primaryKey: true
		},
		provider: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		providerProfileId: {
			type: DataTypes.STRING,
			allowNull: false
		},

		displayName: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		familyName: {
			type: DataTypes.STRING(50)
		},
		givenName: {
			type: DataTypes.STRING(50)
		},
		middleName: {
			type: DataTypes.STRING(50)
		},
		email: {
			type: DataTypes.STRING(100)
		},
		photo: {
			type: DataTypes.STRING
		},

		username: {
			type: DataTypes.STRING(50)
		},
		gender: {
			type: DataTypes.STRING(10)
		},
		profileUrl: {
			type: DataTypes.STRING
		},

		globalAccountId: {
			type: DataTypes.STRING(32),
			allowNull: false
		}

	});
};
