$(document).ready(function() {
  /* global moment */

  // blogContainer holds all of our pets
  var blogContainer = $(".blog-container");
  var petSelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePetDelete);
  $(document).on("click", "button.edit", handlePetEdit);
  // Variable to hold our pets
  var pets;

  // The code below handles the case where we want to get pets for a specific owner
  // Looks for a query param in the url for owner_id
  var url = window.location.search;
  var ownerId;
  if (url.indexOf("?owner_id=") !== -1) {
    ownerId = url.split("=")[1];
    getPets(ownerId);
  }
  // If there's no ownerId we just get all pets as usual
  else {
    getPets();
  }

  // This function grabs pets from the database and updates the view
  function getPets(owner) {
    ownerId = owner || "";
    if (ownerId) {
      ownerId = "/?owner_id=" + ownerId;
    }
    $.get("/api/pets" + ownerId, function(data) {
      console.log("Pets", data);
      pets = data;
      if (!pets || !pets.length) {
        displayEmpty(owner);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete pets
  function deletePet(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/pets/" + id
    }).then(function() {
      getPets(petSelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed pet HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var petsToAdd = [];
    for (var i = 0; i < pets.length; i++) {
      petsToAdd.push(createNewRow(pets[i]));
    }
    $("#numberOfDogs").html(
      "Currently " + pets.length + " dogs listed in the database:"
    );
    blogContainer.append(petsToAdd);
  }

  // This function constructs a pet's HTML
  function createNewRow(pet) {
    var formattedDate = new Date(pet.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY");
    var newPetCard = $("<div>");
    newPetCard.addClass("card");
    newPetCard.css({
      border: "2px solid green",
      margin: "20px"
    });
    var newPetCardHeading = $("<div>");
    newPetCardHeading.addClass("card-header");
    newPetCardHeading.css({
      padding: "0px 10px"
    });
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newPetTitle = $("<h3>");
    var newPetDate = $("<small>");
    var newPetOwner = $("<h6>");
    newPetOwner.text(pet.Owner.name);
    newPetOwner.css({
      color: "blue",
      "margin-top": "-2px"
    });
    var newPetCardBody = $("<div>");
    newPetCardBody.addClass("card-body");
    newPetCardBody.css({
      padding: "4px 10px",
      margin: "0px"
    });
    var newPetBody = $("<a>");
    newPetTitle.text(pet.title + " ");
    newPetBody.text(pet.body);
    newPetDate.text(formattedDate);
    newPetTitle.append(newPetDate);
    newPetCardHeading.append(deleteBtn);
    newPetCardHeading.append(editBtn);
    newPetCardHeading.append(newPetTitle);
    newPetCardHeading.append(newPetOwner);
    newPetCardBody.append(newPetBody);
    newPetCard.append(newPetCardHeading);
    newPetCard.append(newPetCardBody);
    newPetCard.data("pet", pet);
    return newPetCard;
  }

  // This function figures out which pet we want to delete and then calls deletePet
  function handlePetDelete() {
    var currentPet = $(this)
      .parent()
      .parent()
      .data("pet");
    deletePet(currentPet.id);
  }

  // This function figures out which pet we want to edit and takes it to the appropriate url
  function handlePetEdit() {
    var currentPet = $(this)
      .parent()
      .parent()
      .data("pet");
    window.location.href = "/cms?pet_id=" + currentPet.id;
  }

  // This function displays a message when there are no pets
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Owner #" + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({
      "text-align": "center",
      "margin-top": "50px"
    });
    messageH2.html(
      "No pets yet" +
        partial +
        ", navigate <a href='/cms" +
        query +
        "'>here</a> in order to get started."
    );
    blogContainer.append(messageH2);
  }
});
