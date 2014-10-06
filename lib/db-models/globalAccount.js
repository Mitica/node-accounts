module.exports = function(sequelize, DataTypes) {
	return sequelize.define('GlobalAccount', {
		// provider + providerProfileId md5
		id: {
			type: DataTypes.STRING(32),
			primaryKey: true
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
		gender: {
			type: DataTypes.STRING(10)
		},

		status: {
			type: DataTypes.ENUM('active', 'merged'),
			allowNull: false,
			defaultValue: 'active'
		},

		mergedWithId: {
			type: DataTypes.STRING(32)
		},

		mergedAt: {
			type: DataTypes.DATE
		}

	});
};
