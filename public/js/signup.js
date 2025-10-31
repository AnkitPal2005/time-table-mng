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
function validateSignupForm() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();
  
  if (!username) {
    showToast("Please enter your email address", "error");
    return false;
  }
  
  if (!password) {
    showToast("Please enter a password", "error");
    return false;
  }
  
  if (!confirmPassword) {
    showToast("Please confirm your password", "error");
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(username)) {
    showToast("Please enter a valid email address", "error");
    return false;
  }
  
  // Password validation
  if (password.length < 6) {
    showToast("Password must be at least 6 characters long", "error");
    return false;
  }
  
  // Password confirmation
  if (password !== confirmPassword) {
    showToast("Passwords do not match", "error");
    return false;
  }
  
  return true;
}

async function signup() {
  if (!validateSignupForm()) return;
  
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  
  setLoadingState(true);

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      showToast(result.message, "success");
      document.getElementById("signup-username").value = "";
      document.getElementById("signup-password").value = "";
      document.getElementById("confirm-password").value = "";
      
      // Redirect after success
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      showToast(result.message, "error");
    }
  } catch (error) {
    console.error("Signup Error:", error);
    showToast("Connection error. Please try again.", "error");
  } finally {
    setLoadingState(false);
  }
}

// Enhanced event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Enter key support
  document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      signup();
    }
  });
  
  // Input focus effects
  const inputs = document.querySelectorAll('input');
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
