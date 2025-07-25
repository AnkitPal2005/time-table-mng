function openForm() {
  document.getElementById("formModal").style.display = "flex";
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

async function saveLecture() {
  const teacher = document.getElementById("teacherSelect").value;
  const subject = document.getElementById("subject").value.trim();
  const room = document.getElementById("room").value.trim();
  const day = document.getElementById("day").value;
  const period = parseInt(document.getElementById("period").value);
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  if (
    !teacher ||
    !subject ||
    !room ||
    !day ||
    !period ||
    !startTime ||
    !endTime
  ) {
    alert("Please fill all fields");
    return;
  }

  const newLecture = {
    teacher,
    subject,
    room,
    day,
    period,
    startTime,
    endTime,
  };
  // console.log(newLecture.teacher.value);
  // const lectures = JSON.parse(localStorage.getItem("lectures")) || [];
  // lectures.push(newLecture);
  // localStorage.setItem("lectures", JSON.stringify(lectures));
  try {
    const response = await fetch("http://localhost:3000/api/auth/lectures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLecture),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Lecture added Successfuly");
      closeForm();
      renderTable();
    } else {
      alert("Error adding lecture" + data.message);
    }
  } catch (err) {
    console.error("Fetch Error", err);
    alert("Please Try again later");
  }
}
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

async function renderTable() {
  const tbody = document.getElementById("timetable-body");
  tbody.innerHTML = "";

  const selectedTeacher = document.getElementById("teacherFilter").value;
  // const lectures = JSON.parse(localStorage.getItem("lectures")) || [];

  console.log(selectedTeacher)
  const dayList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let lectures = [];

  try {
    const response = await fetch(`http://localhost:3000/api/auth/showLectures/${selectedTeacher}`);
    const data = await response.json();
    if (response.ok) {
      lectures = data;
    } else {
      alert("Error fetching lectures" + data.message);
      return;
    }
  } catch (error) {
    console.error("Fetch Error", error);
    alert("network error");
    return;
  }
  dayList.forEach((day) => {
    const row = document.createElement("tr");
    const dayCell = document.createElement("td");
    dayCell.textContent = day;
    row.appendChild(dayCell);

    for (let i = 1; i <= 8; i++) {
      const cell = document.createElement("td");
      const lecture = lectures.find(
        (l) => l.teacher === selectedTeacher && l.day === day && l.period === i
      );
      cell.innerHTML = lecture
        ? `<strong>${lecture.subject}</strong><br>(${lecture.room})<br><small>${lecture.startTime} - ${lecture.endTime}</small>`
        : "-";
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  });
}

async function loadTeachers() {
  // const users = JSON.parse(localStorage.getItem("users")) || [];

  const filterDropdown = document.getElementById("teacherFilter");
  const formDropdown = document.getElementById("teacherSelect");

  filterDropdown.innerHTML = "";
  formDropdown.innerHTML = "";
  try {
    const response = await fetch("http://localhost:3000/api/auth/teachers",{
      credentials:"include"
    });
    const data = await response.json();
    console.log("response",data);
    const teachers = data.teachers;
    console.log(teachers);
    teachers.forEach((teacher) => {
      const option1 = document.createElement("option");
      option1.value = teacher.username;
      option1.textContent = teacher.username;

      const option2 = option1.cloneNode(true);

      filterDropdown.appendChild(option1);
      formDropdown.appendChild(option2);
    });
    renderTable();
  } catch (error) {
    console.log("error",error);
  }
}
document
  .getElementById("teacherFilter")
  .addEventListener("change", renderTable);



window.onload = function () {
  document.getElementById("date-time").innerText = new Date().toLocaleString();
  loadTeachers();
};

