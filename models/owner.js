module.exports = function(sequelize, DataTypes) {
  var Owner = sequelize.define("Owner", {
    // Giving the Owner model a name of type STRING
    name: DataTypes.STRING
  });

  Owner.associate = function(models) {
    // Associating Owner with Pets
    // When an Owner is deleted, also delete any associated Pets
    Owner.hasMany(models.Pet, {
      onDelete: "cascade"
    });
  };

  return Owner;
};
