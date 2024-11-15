  const selectElement = document.getElementById('calculate');
const functions = {
  'Drill Pipe Capacity': calculateDrillPipeCapacity,
  'Drill String Capacity': calculateDrillStringCapacity,
  'Operations': calculateOperations,
  'Bottom Ups': calculateBottomUps,
};

selectElement.addEventListener('change', (event) => {
  const selectedValue = event.target.value;
  if (functions[selectedValue]) {
    functions[selectedValue]();
  } else {
    console.log('No function assigned for this option');
  }
});
const displayResult = document.getElementById("display-result");
function calculateDrillPipeCapacity() {
  // vatiables
 /* const calculateButton = document.getElementById("calculate");

calculateButton.addEventListener("click", calculateDrillPipeCapacity);*/
//values
  const internalDiameter = parseFloat(prompt("Enter the internal diameter of the drill pipe (inches)"));
  const drillPipeLength = parseFloat(prompt("Enter the length of the drill pipe (feet)"));

  if (isNaN(internalDiameter) || isNaN(drillPipeLength) || internalDiameter <= 0 || drillPipeLength <= 0) {
    displayResult.innerHTML = "Invalid input. Please enter positive numbers.";
    return;
  }
  const DrillpipeCapacity = (internalDiameter ** 2 * drillPipeLength / 1029.3).toFixed(2);
  displayResult.innerHTML = `Drill pipe Capacity: ${DrillpipeCapacity} cubic inches`;
  const convert  = document.getElementById("bbl");
convert.addEventListener("click",()=>{
  const convertResult= DrillpipeCapacity/5.6146
  displayResult.innerHTML = `Drill pipe Capacity: ${convertResult} Barrels ;`
})
}

function calculateDrillStringCapacity(){
  alert("calculate")
}
function calculateOperations(){
  alert("operations")
}
function calculateBottomUps(){
  alert("bottom ups")
}



function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
    const csrfToken = getCookie('csrftoken');
}
    document.getElementById('burger-icon').addEventListener('click', function() {
        this.classList.toggle('open');
        document.getElementById('side-menu').classList.toggle('visible');
    });

document.addEventListener("DOMContentLoaded", function() {
// Fetch user info
fetch("http://127.0.0.1:8000/auth/user-info/", {
    method: "GET",
    credentials: "include",
    headers: {
'Content-Type': 'application/json',
'X-CSRFToken': csrfToken  // include CSRF token if needed
}
})

.then(response => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
.then(data => {
    // Display the username on the page if authenticated
    if (data.username) {
        const contentDiv = document.querySelector(".content");
        const userNamePlaceholder = document.createElement("div");
        userNamePlaceholder.innerHTML = `<h1>Welcome, ${data.username}!</h1>`;
        contentDiv.prepend(userNamePlaceholder);
    } else {
        console.log("User not authenticated");
    }
})
.catch(error => {
    console.error("Error fetching user info:", error);
});
})
// Add event listener to the logout button
document.addEventListener("DOMContentLoaded", () => {
// Fetch CSRF token
fetch("http://127.0.0.1:8000/auth/csrf/")
    .then(response => response.json())
    .then(data => {
       let csrfToken = data.csrfToken;
    });

// Add event listener to logout button
document.getElementById("logout-button").addEventListener("click", function() {
    fetch("http://127.0.0.1:8000/auth/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.replace("Login.html");
        } else {
            console.error("Logout failed");
        }
    })
    .catch(error => console.error("Error logging out:", error));
});
});

const csrfToken = "{{ csrf_token }}";

async function fetchUserInfo() {
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/user-info/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken, // Add CSRF token here
      },
      credentials: "include", // Include credentials (cookies) with the request
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User info:", data);
    // Display the user info on your page
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}


fetchUserInfo();

