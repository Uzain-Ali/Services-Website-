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



function sendEmail(e, formId) {
    e.preventDefault();

    // Get the email configuration based on the form ID
    var emailConfig = getEmailConfig(formId);

    // Send the email
    Email.send(emailConfig)
        .then(function () {
            // Show success message
            alert("Sent Successfully!");
        })
        .catch(function (error) {
            // Show error message
            console.error("Error sending email:", error);
            alert("Failed to send email. Please try again later.");
        });
}

function getEmailConfig(formId) {
    // Set up the email configuration
    var emailConfig = {
        Host: "smtp.elasticemail.com",
        Username: "uzainali76@gmail.com",
        Password: "721A2D1C84124C44715443067C3F8803AE66",
        To: 'venturesync5@gmail.com',
        From: document.getElementById(formId).querySelector('#email').value,
        Subject: "New Customer Detail",
        Body: ""
    };

    // Customize the email body based on the form ID
    switch (formId) {
        case "airDuctCleaningForm":
            emailConfig.Body = "Name: " + document.getElementById(formId).querySelector('#name').value +
                "<br> Email: " + document.getElementById(formId).querySelector('#email').value +
                "<br> Phone: " + document.getElementById(formId).querySelector('#phone').value +
                "<br> Address: " + document.getElementById(formId).querySelector('#address').value +
                "<br> House Size: " + document.getElementById(formId).querySelector('#hSize').value +
                "<br> AC Unit: " + document.getElementById(formId).querySelector('#acUnit').value +
                "<br> Dryer Vent Included: " + (document.getElementById(formId).querySelector('#dryerVentIncluded').checked ? "Yes" : "No") 
            break;
        case "chimneySweepForm":
            emailConfig.Body = "Name: " + document.getElementById(formId).querySelector('#name').value +
                "<br> Email: " + document.getElementById(formId).querySelector('#email').value +
                "<br> Phone: " + document.getElementById(formId).querySelector('#phone').value +
                "<br> Address: " + document.getElementById(formId).querySelector('#address').value +
                "<br> House Size: " + document.getElementById(formId).querySelector('#hSize').value +
                "<br> Number of Chimneys: " + document.getElementById(formId).querySelector('#chimney').value;
            break;
        case "carDetailingForm":
            emailConfig.Body = "Name: " + document.getElementById(formId).querySelector('#name').value +
                "<br> Email: " + document.getElementById(formId).querySelector('#email').value +
                "<br> Phone: " + document.getElementById(formId).querySelector('#phone').value +
                "<br> Address: " + document.getElementById(formId).querySelector('#address').value +
                "<br> Car Model + Year: " + document.getElementById(formId).querySelector('#model').value +
                "<br> Car Color: " + document.getElementById(formId).querySelector('#color').value +
                "<br> Detailing Interior: " + (document.getElementById(formId).querySelector('#DetailingIncluded').checked ? "Yes" : "No") +
                "<br> Detailing Exterior: " + (document.getElementById(formId).querySelector('#DetailingNotIncluded').checked ? "Yes" : "No") +
                "<br> Detailing Both: " + (document.getElementById(formId).querySelector('#bothIncluded1').checked ? "Yes" : "No");
            break;
        default:
            console.error("Invalid form id");
            break;
    }

    return emailConfig;
}



