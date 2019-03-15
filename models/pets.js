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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Pet.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pet;
};
