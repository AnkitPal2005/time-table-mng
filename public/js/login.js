// Modern toast notification system
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Loading state management
function setLoadingState(isLoading) {
  const button = document.querySelector('.login-btn');
  const btnText = button.querySelector('.btn-text');
  const btnLoader = button.querySelector('.btn-loader');
  const overlay = document.getElementById('loading-overlay');
  
  if (isLoading) {
    button.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    overlay.classList.remove('hidden');
  } else {
    button.disabled = false;
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    overlay.classList.add('hidden');
  }
}

// Form validation
function validateForm() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const role = document.getElementById("login-role").value;
  
  if (!username) {
    showToast("Please enter your email address", "error");
    return false;
  }
  
  if (!password) {
    showToast("Please enter your password", "error");
    return false;
  }
  
  if (!role) {
    showToast("Please select your role", "error");
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(username)) {
    showToast("Please enter a valid email address", "error");
    return false;
  }
  
  return true;
}

async function login() {
  if (!validateForm()) return;
  
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const role = document.getElementById("login-role").value;
  
  setLoadingState(true);
  
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
      credentials: "include",
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showToast(data.message, "success");
      localStorage.setItem("user", JSON.stringify({ user: username }));
      
      // Smooth transition with delay
      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "views/admin.html";
        } else if (role === "teacher") {
          window.location.href = "views/dashboard.html";
        }
      }, 1000);
    } else {
      showToast(data.message, "error");
    }
  } catch (err) {
    console.error("Login Error:", err);
    showToast("Connection error. Please try again.", "error");
  } finally {
    setLoadingState(false);
  }
}
// Enhanced event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Forgot password button
  document.getElementById("forgot-password-btn").addEventListener("click", () => {
    window.location.href = "forgotpassword.html";
  });
  
  // Enter key support
  document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      login();
    }
  });
  
  // Input focus effects
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
  // Auto-clear error states on input
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      this.style.borderColor = '';
    });
  });
});

