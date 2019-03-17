module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Pet.associate = function(models) {
    // We're saying that a Pet should belong to an Owner
    // A Pet can't be created without an Owner due to the foreign key constraint
    Pet.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pet;
};
