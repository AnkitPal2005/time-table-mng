// // Dummy localStorage data (use only for testing)
// if (!localStorage.getItem("user")) {
//   localStorage.setItem("user", JSON.stringify({ username: "TeacherName" }));
// }
// if (!localStorage.getItem("lectures")) {
//   localStorage.setItem(
//     "lectures",
//     JSON.stringify([
//       {
//         teacher: "user.username",
//         day: "Monday",
//         period: 1,
//         subject: "Math",
//         room: "101",
//       },
//       {
//         teacher: "TeacherName",
//         day: "Monday",
//         period: 2,
//         subject: "Science",
//         room: "102",
//       },
//       {
//         teacher: "TeacherName",
//         day: "Tuesday",
//         period: 3,
//         subject: "English",
//         room: "103",
//       },
//     ])
//   );
// }

// // Load user & lecture data
// const user = JSON.parse(localStorage.getItem("user")) || {
//   username: "Teacher",
// };
// const lectures = JSON.parse(localStorage.getItem("lectures")) || [];

// document.getElementById(
//   "teacher-name"
// ).innerText = `${user.username} (Teacher)`;

// // Set current date & time
// const now = new Date();
// document.getElementById("current-date").innerText = `${now.getDate()}/${
//   now.getMonth() + 1
// }/${now.getFullYear()}`;
// document.getElementById("current-time").innerText = now.toLocaleTimeString();

// // Stats
// const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
// const todayLectures = lectures.filter(
//   (l) => l.teacher === user.username && l.day === today
// );

// document.getElementById("total-lectures").innerText = lectures.length;
// document.getElementById("total-left").innerText = todayLectures.length;
// document.getElementById("total-done").innerText = 0; // You can add logic to calculate done
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
console.log(user.userr);

fetch(`/api/teacher/teacher/${user.user}`)
  .then((res) => res.json())
  .then((data) => {
    const lectures = data.responseData.lectures || [];
    const todayLectures = lectures.filter((l) => l.day === today);
    document.getElementById("total-lectures").innerText =
      data.responseData.metadata.totalLectures;
    document.getElementById("total-left").innerText =
      data.responseData.metadata.totalLeft;
    document.getElementById("total-done").innerText =
      data.responseData.metadata.totalDone;
  })
  .catch((err) => {
    console.error("Error Loading DashBoard", err);
  });
document
  .querySelector("aside.sidebar button:nth-Child(2)")
  .addEventListener("click", () => {
    window.location.href = "/views/teacher.html?username=" + user.user;
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
      const from = document.getElementById("from").value;
      const to = document.getElementById("to").value;
      const reason = document.getElementById("reason").value;
      if (!from || !to || !reason) {
        alert("Please fill all fields");
        if (!from) document.getElementById("from").focus();
        if (!to) document.getElementById("to").focus();
        if (!reason) document.getElementById("reason").focus();
        return;
      }
      const leaveData = {
        username: username || "unknown",
        from,
        to,
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
  });