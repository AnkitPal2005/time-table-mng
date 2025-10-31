
// // document
// //   .querySelector(".reset-form")
//   async function pass() {
//     // event.preventDefault(); // Prevent default form submit (page reload)

//     const password = document.getElementById("password").value.trim();
//     const confirmPassword = document
//       .getElementById("confirmPassword")
//       .value.trim();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match. Please check and try again.");
//       return;
//     }

//     // Passwords match, ab API call karo backend ko
//     const email = document.getElementById("email").value.trim(); // agar email field hai form me
//     const otp = document.getElementById("otp").value.trim(); // agar otp field hai form me

//     try {
//       const res = await fetch("/api/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp, newPassword: password }),
//       });

//       const data = await res.json();
//       alert(data.message);

//       if (res.ok) {
//         // password reset successful, redirect login page ya koi aur action
//         window.location.href = "/login";
//       }
//     } catch (error) {
//       alert("Something went wrong. Please try again.");
//     }
//   }



async function pass(event) {
  event.preventDefault(); // ✅ prevent reload

  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please check and try again.");
    return;
  }

  try {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword: password }), // ✅ only newPassword
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      window.location.href = "/login";
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
}
