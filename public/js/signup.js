const pass = document.getElementById("pass");
const confirmPass = document.getElementById("confirmPass");

let password = "";
let confirmpassword = "";

pass.addEventListener("blur", () => {
  password = pass.value.trim();
});
confirmPass.addEventListener("blur", () => {
  confirmpassword = confirmPass.value.trim();
  checkPass();
});

function checkPass() {
  if (
    password !== "" &&
    confirmpassword !== "" &&
    password === confirmpassword
  ) {
  } else {
    confirmPass.style.borderColor = "red";
    pass.style.borderColor = "red";
  }
}
