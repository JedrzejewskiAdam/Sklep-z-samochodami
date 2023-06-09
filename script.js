document.addEventListener("DOMContentLoaded", function () {
  var carBrandSelect = document.getElementById("car-brand");
  var carYearSelect = document.getElementById("car-year");
  var carItems = document.querySelectorAll(".car-item");
  var configForm = document.querySelector(".config-form");

  carBrandSelect.addEventListener("change", function () {
    var selectedBrand = carBrandSelect.value.toLowerCase();

    carItems.forEach(function (carItem) {
      var carBrand = carItem.getAttribute("data-brand");

      if (selectedBrand === "all" || carBrand === selectedBrand) {
        carItem.style.display = "block";
      } else {
        carItem.style.display = "none";
      }
    });
  });

  carYearSelect.addEventListener("change", function () {
    var selectedYear = carYearSelect.value;

    carItems.forEach(function (carItem) {
      var carYear = carItem.querySelector("p:nth-child(3)").textContent.split(":")[1].trim();

      if (selectedYear === "all" || carYear === selectedYear) {
        carItem.style.display = "block";
      } else {
        carItem.style.display = "none";
      }
    });
  });

  

  var carList = document.querySelector(".car-list");
  var purchaseBtn = document.getElementById("purchase-btn");
  var backBtn = document.getElementById("back-btn");
  var carImage = document.getElementById("car-image");
  var paymentMethod = document.getElementById("payment-method");
  var totalPriceElement = document.getElementById("total-price");

  var selectedCar = null;
  var selectedAccessories = [];

  // Show configuration form and hide car list
  function showConfigForm(car) {
    carBrandSelect.style.display = "none";
    carYearSelect.style.display = "none";
    selectedCar = car;
    carList.style.display = "none";
    configForm.style.display = "block";
  }

  // Show car list and hide configuration form
  function showCarList() {
    selectedCar = null;
    configForm.style.display = "none";
    carList.style.display = "flex";
    carBrandSelect.style.display = "inline";
    carYearSelect.style.display = "inline";
  }

  // Create accessories list
  function createAccessoriesList() {
    var accessoriesList = document.getElementById("accessories-list");

    accessories.forEach(function(accessory) {
      var accessoryItem = document.createElement("div");
      accessoryItem.classList.add("accessory-item");

      var accessoryLabel = document.createElement("label");
      accessoryLabel.classList.add("checkbox-label");

      var accessoryCheckbox = document.createElement("input");
      accessoryCheckbox.type = "checkbox";
      accessoryCheckbox.value = accessory.price;
      accessoryCheckbox.addEventListener("change", updateTotalPrice);

      var accessoryName = document.createElement("span");
      accessoryName.textContent = accessory.name;

      var accessoryPrice = document.createElement("span");
      accessoryPrice.textContent = "$" + parseFloat(accessory.dataset.price);

      accessoryLabel.appendChild(accessoryCheckbox);
      accessoryLabel.appendChild(accessoryName);
      accessoryLabel.appendChild(accessoryPrice);

      accessoryItem.appendChild(accessoryLabel);
      accessoriesList.appendChild(accessoryItem);
    });
  }

  function calculateTotalPrice() {
    var carPrice = selectedCar.querySelector("p:last-child").textContent;
    carPrice = carPrice.split(":")[1].trim();
    var totalPrice = parseFloat(carPrice);

    var selectedAccessories = document.querySelectorAll('input[name="accessories"]:checked');
    selectedAccessories.forEach(function (accessory) {
      var accessoryPrice = parseFloat(accessory.parentNode.textContent.match(/\d+/)[0]);
      totalPrice += accessoryPrice;
    });

    return totalPrice;
  }

  // Update total price display
  function updateTotalPrice() {
    var totalPriceElement = document.getElementById("total-price");
    var totalPrice = calculateTotalPrice();
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }


  // Handle purchase button click event
  purchaseBtn.addEventListener("click", function () {
    var financing = document.querySelector('input[name="financing"]:checked');
    var name = document.getElementById("name").value;
    var deliveryDate = document.getElementById("delivery-date").value;
    var accessories = document.querySelectorAll('input[name="accessories"]:checked');

    // Validate form inputs
    if (!financing || !name || !deliveryDate || accessories.length === 0) {
      document.getElementById("form-error").textContent = "Wszystkie pola muszą być wypełnione.";
      return;
    }

    var nameParts = name.split(" ");
    if (nameParts.length !== 2) {
      document.getElementById("form-error").textContent = "Imię i nazwisko powinny mieć postać 2 stringów oddzielonych spacją.";
      return;
    }

    selectedAccessories = [];
    for (var i = 0; i < accessories.length; i++) {
      selectedAccessories.push({
        name: accessories[i].nextSibling.textContent.trim(),
        price: accessories[i].value.split(" ")[1]
      });
    }

    // Display summary page
    carImage.src = selectedCar.querySelector("img").src;
    paymentMethod.textContent = financing.value;
    updateTotalPrice();
    showSummaryPage();
  });

  // Handle back button click event
  backBtn.addEventListener("click", function () {
    document.getElementById("form-error").textContent = "";
    selectedAccessories = [];
    showCarList();
  });

  // Show summary page
  function showSummaryPage() {
    configForm.style.display = "none";
    document.querySelector(".summary-page").style.display = "block";
  }

  // Attach event listeners to car items
  var carItems = document.querySelectorAll(".car-item");
  carItems.forEach(function (carItem) {
    carItem.addEventListener("click", function () {
      showConfigForm(carItem);
    });
  });

  // Attach event listener to accessories list
  var accessoriesList = document.querySelector(".accessories-list");
  accessoriesList.addEventListener("change", function (event) {
    var checkbox = event.target;
    var accessoryName = checkbox.nextSibling.textContent.trim();
    var accessoryPrice = checkbox.value.split(" ")[1];

    if (checkbox.checked) {
      selectedAccessories.push({ name: accessoryName, price: accessoryPrice });
    } else {
      var index = selectedAccessories.findIndex(function (accessory) {
        return accessory.name === accessoryName;
      });
      if (index > -1) {
        selectedAccessories.splice(index, 1);
      }
    }

    updateTotalPrice();
  });
  const dateInput = document.getElementById('delivery-date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  var deliveryDate = document.getElementById("delivery-date").value;
var paragraphElement = document.createElement("p");
paragraphElement.innerHTML = deliveryDate;

// Dodaj wygenerowany <p> do odpowiedniego elementu na stronie
var gowno1 = document.getElementById("gowno");
gowno1.appendChild(paragraphElement);

});