async function signup() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    const response=await fetch('http://localhost:3000/api/auth/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      document.getElementById("signup-username").value = "";
      document.getElementById("signup-password").value = "";
      window.location.href = "login.html"; 
    } else {
      alert(result.message);
      
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
}