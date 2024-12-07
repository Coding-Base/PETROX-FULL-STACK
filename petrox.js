window.onload = callonload

function callonload(){
  const  profile_div = document.getElementById("user-profile")
  profile_div.classList.add("hidden")
 
}


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

//PRODUCTION PAGE
function production_field(){
big_field=document.getElementById("Home_big_container")
big_field.remove()
}

// RESERVIOR PAGE
function reservior_field(){
  big_field=document.getElementById("Home_big_container")
  big_field.remove()

}
//DRILLING TECHNOLOGY
function drilling_field(){
  big_field=document.getElementById("Home_big_container")
  big_field.innerHTML=""

}
document.getElementById("profile_btn").addEventListener("click", PROFILE)



  


function PROFILE(){
  const big_field=document.getElementById("Home_big_container")
   big_field.classList.add("hidden")
   const  profile_div = document.getElementById("user-profile")
   profile_div.classList.remove("hidden");
 
}


const upload = documenet.getElementById("UPLOAD")
upload.addEventListener("click", uploadImage)
const locate = document.getElementById("sign")
locate.addEventListener("click", signup)
function signup(){
  alert("h")
  window.location.replace("signup.html")
}