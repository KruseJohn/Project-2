/* eslint-disable prettier/prettier */
$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and owner select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var ownerSelect = $("#owner");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
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
      !titleInput.val().trim() ||
      !bodyInput.val().trim() ||
      !ownerSelect.val()
    ) {
      return;
    }
    // Constructing a newPet object to hand to the database
    var newPet = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      OwnerId: ownerSelect.val()
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

  // Submits a new pet and brings user to blog page upon completion
  function submitPet(pet) {
    $.post("/api/pets", pet, function() {
      window.location.href = "/blog";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an owner's existing posts
  function getPetData(id, type) {
    var queryUrl;
    switch (type) {
    case "pet":
      queryUrl = "/api/pets/" + id;
      break;
    case "owner":
      queryUrl = "/api/owners/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.OwnerId || data.id);
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        ownerId = data.OwnerId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get owners and then render our list of owners
  function getOwners() {
    $.get("/api/owners", renderOwnerList);
  }
  // Function to either render a list of owners, or if there are none, direct the user to the page
  // to create an owner first
  function renderOwnerList(data) {
    if (!data.length) {
      window.location.href = "/owners";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createOwnerRow(data[i]));
    }
    ownerSelect.empty();
    console.log(rowsToAdd);
    console.log(ownerSelect);
    ownerSelect.append(rowsToAdd);
    ownerSelect.val(ownerId);
  }

  // Creates the owner options in the dropdown
  function createOwnerRow(owner) {
    var listOption = $("<option>");
    listOption.attr("value", owner.id);
    listOption.text(owner.name);
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updatePet(pet) {
    $.ajax({
      method: "PUT",
      url: "/api/pets",
      data: pet
    }).then(function() {
      window.location.href = "/blog";
    });
  }
});
