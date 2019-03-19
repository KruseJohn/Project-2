module.exports = function(sequelize, DataTypes) {
  var Driver = sequelize.define("Driver", {
    // Giving the Driver model a name of type STRING
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    availability: DataTypes.STRING
  });

  Driver.associate = function(models) {
    // Associating Driver with Pets
    // When an Driver is deleted, also delete any associated Pets
    Driver.hasMany(models.Pet, {
      onDelete: "cascade"
    });
  };

  return Driver;
};
