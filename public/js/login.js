const eyeImg = document.getElementById("eyeImg");
const pass = document.getElementById("pass");

//Eye Button
eyeImg.addEventListener("click", () => {
  if (eyeImg.src.includes("eye.png")) {
    eyeImg.src = "/images/Signup/visible.png";
    console.log("fired");
    pass.type = "text";
  } else if (eyeImg.src.includes("visible.png")) {
    eyeImg.src = "/images/Signup/eye.png";
    pass.type = "password";
  } else {
    eyeImg.src = "/images/Signup/eye.png";
    pass.type = "password";
  }
});
