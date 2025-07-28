// const { post } = require("../../routes/auth");
console.log("hello ji ankit kya hal hai ");
const params = new URLSearchParams(window.location.search);
console.log(window.location.search);
document
  .querySelector("aside.sidebar button:nth-Child(1)")
  .addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    window.location.href = "/views/dashboard.html?username=" + user.user;
  });
document
  .querySelector("aside.sidebar button:nth-Child(2)")
  .addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    window.location.href = "/views/teacher.html?username=" + user.user;
  });

const username = params.get("username");
console.log(username); // Ankit pal

document.getElementById("teacher-name").innerText = `${
  username || "Teacher"
} (Teacher)`;
const now = new Date();
document.getElementById("current-date").innerText = `${now.getDate()}/${
  now.getMonth() + 1
}/${now.getFullYear()}`;
document.getElementById("current-time").innerText = now.toLocaleTimeString();
document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    alert(data.message);

    if (res.status === 200) {
      window.location.href = "/login.html";
    }
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Logout failed. Try again.");
  }
});
async function fetcTeachers(req, res) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/getLectureByTeacher/teacher/${username}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
}
async function renderTeacherTimetable() {
  const lectures = await fetcTeachers();
  console.log(lectures, "kya hakl hai");
  const tbody = document.getElementById("teacher-timetable");
  tbody.innerHTML = "";

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(days);
  days.forEach((day) => {
    const row = document.createElement("tr");
    const dayCell = document.createElement("td");
    dayCell.textContent = day;
    row.appendChild(dayCell);

    for (let i = 1; i <= 8; i++) {
      const cell = document.createElement("td");
      const lecture = lectures?.find(
        (l) => l.teacher === username && l.day === day && l.period === i
      );

      cell.innerHTML = lecture
        ? `<strong>${lecture.subject}</strong><br>(${lecture.room})<br><small>${lecture.startTime} - ${lecture.endTime}</small>`
        : "-";
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  });
}
const approveLeaveBtn = Array.from(document.querySelectorAll("button")).find(
  (btn) => btn.textContent.trim() === "Request-Leave"
);

if (approveLeaveBtn) {
  approveLeaveBtn.addEventListener("click", () => {
    const leaveFormSection = document.getElementById("leave-form-section");
    leaveFormSection.style.display =
      leaveFormSection.style.display === "none" ? "block" : "none";
  });
}

// Handle Leave Form Submission
const leaveForm = document.getElementById("leave-Form");
if (leaveForm) {
  leaveForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // const formData = new FormData(leaveForm);
    const day = document.querySelector(".day-leave-select").value;
    const reason = document.getElementById("reason").value;
    if (!day || !reason) {
      alert("Please fill all fields");
      if (!day) document.querySelector
      (".day-leave-select").focus();
      if (!reason) document.getElementById("reason").focus();
      return;
    }
    const leaveData = {
      username: username || "unknown",
      day,
      reason,
    };

    try {
      const res = await fetch("http://localhost:3000/api/auth/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveData),
      });

      const result = await res.json();
      if (res.ok) {
        document.getElementById("leave-success").innerText =
          "Leave request submitted successfully!";
        leaveForm.reset();
      } else {
        alert(result.message || "Failed to submit leave.");
      }
    } catch (error) {
      console.error("Error submitting leave:", error);
    }
  });
}
document.getElementById("cancel").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("leave-form-section").style.display = "none";
  document.getElementById(leave-success).style.innerHTML="";
});

window.onload = renderTeacherTimetable;
