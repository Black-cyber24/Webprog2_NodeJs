class TravelPackage {
    constructor(destination, price, duration) {
      this.destination = destination;
      this.price = price;
      this.duration = duration;
    }
  }
  
  class TravelManager {
    constructor() {
      this.packages = [];
    }
  
    addPackage(destination, price, duration) {
      const newPackage = new TravelPackage(destination, price, duration);
      this.packages.push(newPackage);
      this.renderPackages();
    }
  
    removePackage(index) {
      this.packages.splice(index, 1);
      this.renderPackages();
    }
  
    renderPackages() {
      const packageList = document.getElementById("packageList");
      packageList.innerHTML = "";
  
      this.packages.forEach((pkg, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${pkg.destination} - ${pkg.price} Ft - ${pkg.duration} nap`;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Törlés";
        removeButton.addEventListener("click", () => this.removePackage(index));
  
        listItem.appendChild(removeButton);
        packageList.appendChild(listItem);
      });
    }
  }
  
  const manager = new TravelManager();
  
  // Form kezelés
  document.getElementById("travelForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const destination = document.getElementById("destination").value;
    const price = document.getElementById("price").value;
    const duration = document.getElementById("duration").value;
  
    manager.addPackage(destination, price, duration);
  
    // Form ürítése
    this.reset();
  });
  