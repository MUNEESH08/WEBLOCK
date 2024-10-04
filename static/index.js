function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function sendLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let rollNo = document.getElementById('roll_no').value;

    // Check if roll number is provided
    if (rollNo === "") {
        alert("Please enter your Roll Number.");
        return;
    }

    // Send the roll number and location to the backend server
    fetch('/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            roll_no: rollNo,
            latitude: latitude,
            longitude: longitude
        })
    }).then(response => {
        if (response.ok) {
            alert("Location and Roll Number sent successfully!");
        } else {
            alert("Failed to send data.");
        }
    });
}