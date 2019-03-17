$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and owner select
  var bodyUpdate = $("#body");
  var titleUpdate = $("#title");
  var emailUpdate = $("#email");
  var cmsForm = $("#cms");
  var driverSelect = $("#driver");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a pet)
  var url = window.location.search;
  var petId;
  var ownerId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?pet_id=1', petId is 1
  if (url.indexOf("?pet_id=") !== -1) {
    petId = url.split("=")[1];
    getPetData(petId, "pet");
  }
  // Otherwise if we have an owner_id in our url, preset the owner select box to be our owner
  else if (url.indexOf("?owner_id=") !== -1) {
    ownerId = url.split("=")[1];
  }

  // Getting the owners, and their pets
  getOwners();

  // A function for handling what happens when the form to create a new pet is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the pet if we are missing a body, title, or owner
    if (
      !titleUpdate.val().trim() ||
      !bodyUpdate.val().trim() ||
      !driverSelect.val()
    ) {
      return;
    }
    // Constructing a newPet object to hand to the database
    var newPet = {
      title: titleUpdate.val().trim(),
      email: emailUpdate.val().trim(),
      body: bodyUpdate.val().trim(),
      OwnerId: driverSelect.val()
    };

    // If we're updating a pet run updatePet to update a pet
    // Otherwise run submitPet to create a whole new pet
    if (updating) {
      newPet.id = petId;
      updatePet(newPet);
    } else {
      submitPet(newPet);
    }
  }

  // Submits a new pet and brings user to home page upon completion
  function submitPet(pet) {
    $.post("/api/pets", pet, function() {
      window.location.href = "/owners";
    });
  }
  // A function to get drivers and then render our list of drivers
  function getOwners() {
    $.get("/api/owners", renderOwnerList);
  }
  // Function to either render a list of drivers, or if there are none, direct the user to the page
  // to create an driver first
  function renderOwnerList(data) {
    if (!data.length) {
      window.location.href = "/owners";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createOwnerRow(data[i]));
    }
    driverSelect.empty();
    console.log(rowsToAdd);
    console.log(driverSelect);
    driverSelect.append(rowsToAdd);
    driverSelect.val(ownerId);
  }

  // Creates the driver options in the dropdown
  function createOwnerRow(owner) {
    var listOption = $("<option>");
    listOption.attr("value", owner.id);
    listOption.text(owner.name);
    return listOption;
  }

  // Update a given pet, bring user to the home page when done
  function updatePet(pet) {
    $.ajax({
      method: "PUT",
      url: "/api/owners",
      data: pet
    }).then(function() {
      window.location.href = "/owners";
    });
  }
});
