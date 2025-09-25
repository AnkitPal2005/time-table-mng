const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const user = JSON.parse(localStorage.getItem("user")) || {
  username: "Teacher",
};
document.getElementById("teacher-name").innerText = `${user.user}(Teacher)`;
const now = new Date();
document.getElementById("current-date").innerText = `${now.getDate()}/${
  now.getMonth() + 1
}/${now.getFullYear()}`;
document.getElementById("current-time").innerText = new Date(
  now
).toLocaleTimeString();
const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
console.log(user.user);

// fetch(`/api/teacher/teacher/${user.user}`)
//   .then((res) => res.json())
//   .then((data) => {
//     const lectures = data.responseData.lectures || [];
//     const todayLectures = lectures.filter((l) => l.day === today);
//     document.getElementById("total-lectures").innerText =
//       data.responseData.metadata.totalLectures;
//     document.getElementById("total-left").innerText =
//       data.responseData.metadata.totalLeft;
//     document.getElementById("total-done").innerText =
//       data.responseData.metadata.totalDone;
//   })
//   .catch((err) => {
//     console.error("Error Loading DashBoard", err);
//   });
async function loadTeacherSummary() {
  try {
    const res = await fetch(
      `/api/auth/teacherLectureSummary/${user.user}`
    );
    const data = await res.json();
    document.getElementById("total-lectures").innerText = data.total || 0;
    document.getElementById("total-done").innerText = data.done || 0;
    document.getElementById("total-left").innerText = data.pending || 0;
  } catch (error) {
    document.getElementById("total-lectures").innerText = "0";
    document.getElementById("total-done").innerText = "0";
    document.getElementById("total-left").innerText = "0";
  }
}
document
  .querySelector("aside.sidebar button:nth-Child(2)")
  .addEventListener("click", () => {
    // window.location.href = "/views/teacher.html?username=" + user.user;
        window.location.href = "/views/teacher.html";

  });
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
  const leaveForm = document.getElementById("leave-Form");
if (leaveForm) {
  leaveForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // const formData = new FormData(leaveForm);
    const day = document.querySelector(".day-leave-select").value;
    const reason = document.getElementById("reason").value;
    if (!day || !reason) {
      alert("Please fill all fields");
      if (!day) document.querySelector(".day-leave-select").focus();
      if (!reason) document.getElementById("reason").focus();
      return;
    }
    const leaveData = {
      username: user.user || "unknown",
      day,
      reason,
    };

    try {
      const res = await fetch("/api/auth/request", {
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

window.onload=function(){
  loadTeacherSummary();
}
  document.getElementById("cancel").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("leave-form-section").style.display = "none";
  });