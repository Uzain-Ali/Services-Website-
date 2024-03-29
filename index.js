var counter=1;
setInterval(function(){
    document.getElementById('radio'+counter).checked = true;
    counter++;
    if(counter>4) counter=1;
}, 4000)




$(document).ready(function() {
// Set the initial index and total number of boxes
var currentIndex = 0;
var totalBoxes = $(".testBox").length;
var boxesPerSlide = 4;

// Function to show the current set of boxes
function showBoxes() {
$(".testBox").hide(); // Hide all boxes
$(".testBox").slice(currentIndex, currentIndex + boxesPerSlide).show(); // Show the current set of boxes

// Disable/enable arrows based on currentIndex
$(".arrow").prop("disabled", currentIndex === 0);
$(".arrow1").prop("disabled", currentIndex + boxesPerSlide >= totalBoxes);
}

// Show the initial set of boxes
showBoxes();

// Handle click on the right arrow
$(".arrow1").on("click", function() {
if (currentIndex + boxesPerSlide < totalBoxes) {
    currentIndex += boxesPerSlide; // Move to the next set
    showBoxes();
}
});

// Handle click on the left arrow
$(".arrow").on("click", function() {
if (currentIndex - boxesPerSlide >= 0) {
    currentIndex -= boxesPerSlide; // Move to the previous set
    showBoxes();
}
});
});


function showServiceForm(serviceType) {
    // Hide all forms
    var forms = document.getElementsByClassName("serviceForm");
    for (var i = 0; i < forms.length; i++) {
forms[i].style.display = "none";
    }

    // Show the selected form
    document.getElementById(serviceType + "Form").style.display = "block";
}

// Initially hide all forms
window.onload = function() {
    var forms = document.getElementsByClassName("serviceForm");
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = "none";
    }

    // Show the Air Duct Cleaning form
    showServiceForm('airDuctCleaning');
};




(function() {
  function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }
  function getFormData(form) {
    var elements = form.elements;

    var fields = Object.keys(elements).filter(function(k) {
          return (elements[k].name !== "honeypot");
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      } else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      formData[name] = element.value;
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "Sheet1"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {  
    event.preventDefault();           
    var form = event.target;
    var data = getFormData(form);         
    if( data.email && !validEmail(data.email) ) {   
      var invalidEmail = form.querySelector(".email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          console.log(xhr.status, xhr.statusText);
          console.log(xhr.responseText);
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            showThankYouAlert();
            form.reset(); // Optionally reset the form after submission
          } 
          return;
      };
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
  }
  
  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }

  function showThankYouAlert() {
    var alertDiv = document.createElement("div");
    alertDiv.className = "centered-alert";
    alertDiv.innerHTML = "<h1>Thanks for contacting us!</h1>";
    document.body.appendChild(alertDiv);

    // Remove the alert after some time
    setTimeout(function() {
      document.body.removeChild(alertDiv);
    }, 3000); // 3 seconds
  }
})();

