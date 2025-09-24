// function openForm() {
//   document.getElementById("formModal").style.display = "flex";
// }

// function closeForm() {
//   document.getElementById("formModal").style.display = "none";
// }

// async function saveLecture() {
//   const teacher = document.getElementById("teacherSelect").value;
//   const subject = document.getElementById("subject").value.trim();
//   const room = document.getElementById("room").value.trim();
//   const day = document.getElementById("day").value;
//   const period = parseInt(document.getElementById("period").value);
//   const startTime = document.getElementById("startTime").value;
//   const endTime = document.getElementById("endTime").value;

//   if (
//     !teacher ||
//     !subject ||
//     !room ||
//     !day ||
//     !period ||
//     !startTime ||
//     !endTime
//   ) {
//     alert("Please fill all fields");
//     return;
//   }

//   const newLecture = {
//     teacher,
//     subject,
//     room,
//     day,
//     period,
//     startTime,
//     endTime,
//   };
//   // console.log(newLecture.teacher.value);
//   // const lectures = JSON.parse(localStorage.getItem("lectures")) || [];
//   // lectures.push(newLecture);
//   // localStorage.setItem("lectures", JSON.stringify(lectures));
//   try {
//     const response = await fetch("http://localhost:3000/api/auth/lectures", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newLecture),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       alert("Lecture added Successfuly");
//       closeForm();
//       renderTable();
//     } else {
//       alert("Error adding lecture" + data.message);
//     }
//   } catch (err) {
//     console.error("Fetch Error", err);
//     alert("Please Try again later");
//   }
// }
// document.getElementById("logoutBtn").addEventListener("click", async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/auth/logout", {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();
//     alert(data.message);

//     if (res.status === 200) {
//       window.location.href = "/login.html";
//     }
//   } catch (err) {
//     console.error("Logout failed:", err);
//     alert("Logout failed. Try again.");
//   }
// });

// async function renderTable() {
//   const tbody = document.getElementById("timetable-body");
//   tbody.innerHTML = "";

//   const selectedTeacher = document.getElementById("teacherFilter").value;
//   // const lectures = JSON.parse(localStorage.getItem("lectures")) || [];

//   console.log(selectedTeacher);
//   const dayList = [
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//     "saturday",
//   ];
//   let lectures = [];

//   try {
//     const response = await fetch(
//       `http://localhost:3000/api/auth/showLectures/${selectedTeacher}`
//     );
//     const data = await response.json();
//     if (response.ok) {
//       lectures = data.lectures;
//       console.log(lectures,"hare krishna");
      
//     } else {
//       alert("Error fetching lectures" + data.message);
//       return;
//     }
//   } catch (error) {
//     console.error("Fetch Error", error);
//     alert("network error");
//     return;
//   }
//   dayList.forEach((day) => {
//     const row = document.createElement("tr");
//     const dayCell = document.createElement("td");
//     dayCell.textContent = day;
//     row.appendChild(dayCell);

//     for (let i = 1; i <= 8; i++) {
//       const cell = document.createElement("td");
//       console.log(day,selectedTeacher,i);
//       const lecture = lectures.find(
//         (l) => l.teacher == selectedTeacher && l.day == day && l.period == i
//       );
//       console.log(lecture,"ooooooooooooooooooo");
//       cell.innerHTML = lecture
//         ? `<strong>${lecture.subject}</strong><br>(${lecture.room})<br><small>${lecture.startTime} - ${lecture.endTime}</small>`
//         : "-";
//       row.appendChild(cell);
//     }

//     tbody.appendChild(row);
//   });
// }

// async function loadTeachers() {
//   // const users = JSON.parse(localStorage.getItem("users")) || [];

//   const filterDropdown = document.getElementById("teacherFilter");
//   const formDropdown = document.getElementById("teacherSelect");

//   filterDropdown.innerHTML = "";
//   formDropdown.innerHTML = "";
//   try {
//     const response = await fetch("http://localhost:3000/api/auth/teachers", {
//       credentials: "include",
//     });
//     const data = await response.json();
//     console.log("response", data);
//     const teachers = data.teachers;
//     console.log(teachers);
//     teachers.forEach((teacher) => {
//       const option1 = document.createElement("option");
//       option1.value = teacher.username;
//       option1.textContent = teacher.username;

//       const option2 = option1.cloneNode(true);

//       filterDropdown.appendChild(option1);
//       formDropdown.appendChild(option2);
//     });
//     renderTable();
//   } catch (error) {
//     console.log("error", error);
//   }
// }
// async function loadleaverequests() {
//   const leaveListDiv = document.getElementById("leave-list");
//   leaveListDiv.innerHTML = "Loading Leave Request......";
//   try {
//     const res = await fetch("http://localhost:3000/api/auth/leave", {
//       credentials: "include",
//     });
//     const leaves = await res.json();
//     if (!Array.isArray(leaves) || !leaves.length) {
//       leaveListDiv.innerHTML = "No Leave Request.";
//       return;
//     }
//     leaveListDiv.innerHTML = "";
//     leaves.forEach((leave, index) => {
//       console.log(leave.day)
//       const leaveDiv = document.createElement("div");
//       leaveDiv.classList.add("leave-request");
//       leaveDiv.style.border = "1px solid #ccc";
//       leaveDiv.style.padding = "10px";
//       leaveDiv.style.marginBottom = "10px";
//       leaveDiv.innerHTML = `
//         <strong>${leave.username}</strong> has requested leave for <strong>${
//         leave.day
//       }</strong>
//         <em>Reason:</em> ${leave.reason} <br>
//         <em>Status:</em> ${leave.status || "pending"} <br><br>
//         <button onclick="handleApprove('${leave.username}', '${
//         leave.day
//       }', 'approved')">Approve</button>
//         <button onclick="handleReject('${leave.username}', '${
//         leave.day
//       }', 'rejected')">Reject</button>
//         <button onclick="handleAdjust('${leave.username}', '${
//         leave.day
//       }')">Adjust</button>
//       `;
//       leaveListDiv.appendChild(leaveDiv);
//     });
//   } catch (error) {
//     console.error("Error fetching leave requests", error);
//     leaveListDiv.innerHTML = "Error loading leave requests.";
//   }
// }

// async function handleAdjust(username, day) {
//   console.log(day)
//   try {
//     const res = await fetch("http://localhost:3000/api/auth/getlecturesleave", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ username, day }),
//     });

//     const data = await res.json();
//     console.log(data)
//     const result = data.lectures
//     const availableTeachers=data.availableTeachers;
//     if (res.ok) {
//       const container = document.getElementById("adjustLectureList");
//       container.innerHTML = "";

//       if (!result.length) {
//         container.innerHTML = `<p>No lectures found for ${username} on ${day}</p>`;
//       } else {
//         const ul = document.createElement("ul");
//         result.forEach((lecture) => {
//           const li = document.createElement("li");
//           let options=availableTeachers.map(
//             t=>`<option value=${t.username}">${t.username} (Load: ${t.load})</option>`
//           ).join("");
//           li.innerHTML = `
//             <strong>Subject:</strong> ${lecture.subject} <br>
//             <strong>Day:</strong> ${lecture.day} <br>
//             <strong>Room:</strong> ${lecture.room} <br>
//             <strong>Period:</strong> ${lecture.period} <br>
//             <strong>Time:</strong> ${lecture.startTime} - ${lecture.endTime}
//             <select>
//             ${options}
//             </select>
//           `;
//           ul.appendChild(li);
//         });
//         container.appendChild(ul);
//       }

//       document.getElementById("teacherLectureModal").style.display = "block";
//     } else {
//       alert(result.message || "Failed to adjust leave request.");
//     }
//   } catch (error) {
//     console.error("Error adjusting leave request:", error);
//     alert("Failed to adjust leave request. Please try again.");
//   }
// }

// function closeTeacherLectures() {
//   document.getElementById("teacherLectureModal").style.display = "none";
// }

// async function handleReject(username, day) {
//   try {
//     const res = await fetch("http://localhost:3000/api/auth/reject", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ username, day}),
//     });
//     const result = await res.json();
//     if (res.ok) {
//       alert("Leave request rejected successfully!");
//       loadleaverequests();
//     } else {
//       alert(result.message || "Failed to rejected leave request.");
//     }
//   } catch (error) {
//     console.error("Error adjusting leave request:", error);
//     alert("Failed to adjust leave request. Please try again.");
//   }
// }

//   async function handleApprove(username, day,status) {
//     try {
//       const res = await fetch("http://localhost:3000/api/auth/approveleave", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ username, day }),
//       });
//       const result = await res.json();
//       if (res.ok) {
//         alert(`Leave ${status} successfully!`);
//         loadleaverequests();
//       } else {
//         alert(result.message || `Failed to ${status} leave request.`);
//       }
//     } catch (error) {
//       console.error(`Error ${status} leave request:`, error);
//       alert(`Failed to ${status} leave request. Please try again.`);
//     }
//   };

// document
//   .getElementById("teacherFilter")
//   .addEventListener("change", renderTable);

// window.onload = function () {
//   const dt = document.getElementById("date-time");
//   if (dt) dt.innerText = new Date().toLocaleString();
//   loadTeachers();
//   loadleaverequests();
// };

// document.getElementById("show-leave-btn").addEventListener("click", () => {
//   const leaveSection = document.getElementById("leave-requests-section");
//   if (leaveSection.style.display === "none" || !leaveSection.style.display) {
//     leaveSection.style.display = "block";
//     loadleaverequests();
//   } else {
//     leaveSection.style.display = "none";
//   }
// });


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

  console.log(selectedTeacher);
  const dayList = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let lectures = [];

  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/showLectures/${selectedTeacher}`
    );
    const data = await response.json();
    if (response.ok) {
      lectures = data.lectures;
      console.log(lectures, "hare krishna");
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
      console.log(day, selectedTeacher, i);
      const lecture = lectures.find(
        (l) => l.teacher == selectedTeacher && l.day == day && l.period == i
      );
      console.log(lecture, "ooooooooooooooooooo");
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
    const response = await fetch("http://localhost:3000/api/auth/teachers", {
      credentials: "include",
    });
    const data = await response.json();
    console.log("response", data);
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
    console.log("error", error);
  }
}
async function loadleaverequests() {
  const leaveListDiv = document.getElementById("leave-list");
  leaveListDiv.innerHTML = "Loading Leave Request......";
  try {
    const res = await fetch("http://localhost:3000/api/auth/leave", {
      credentials: "include",
    });
    const leaves = await res.json();
    console.log(leaves)
    if (!Array.isArray(leaves) || !leaves.length) {
      leaveListDiv.innerHTML = "No Leave Request.";
      return;
    }
    leaveListDiv.innerHTML = "";
    leaves.forEach((leave, index) => {
      const leaveDiv = document.createElement("div");
      leaveDiv.classList.add("leave-request");
      leaveDiv.style.border = "1px solid #ccc";
      leaveDiv.style.padding = "10px";
      leaveDiv.style.marginBottom = "10px";
      leaveDiv.innerHTML = `
        <strong>${leave.username}</strong> has requested leave for <strong>${
        leave.day
      }</strong>
        <em>Reason:</em> ${leave.reason} <br>
        <em>Status:</em> ${leave.status || "pending"} <br><br>
        <button onclick="handleApprove('${leave.username}', '${
        leave.day
      }', 'approved')">Approve</button>
        <button onclick="handleReject('${leave.username}', '${
        leave.day
      }', 'rejected')">Reject</button>
        <button onclick="handleAdjust('${leave.username}', '${
        leave.day
      }')">Adjust</button>
      `;
      leaveListDiv.appendChild(leaveDiv);
    });
  } catch (error) {
    console.error("Error fetching leave requests", error);
    leaveListDiv.innerHTML = "Error loading leave requests.";
  }
}

async function handleAdjust(username, day) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/getlecturesleave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, day }),
    });

    const data = await res.json();
    const result = data.lectures;
    if (res.ok) {
      const container = document.getElementById("adjustLectureList");
      container.innerHTML = "";

      if (!result.length) {
        container.innerHTML = `<p>No lectures found for ${username} on ${day}</p>`;
      } else {
        const ul = document.createElement("ul");
        result.forEach((lecture) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>Subject:</strong> ${lecture.subject} <br>
            <strong>Day:</strong> ${lecture.day} <br>
            <strong>Room:</strong> ${lecture.room} <br>
            <strong>Period:</strong> ${lecture.period} <br>
            <strong>Time:</strong> ${lecture.startTime} - ${lecture.endTime}
            <button onclick="AssignTeacher('${username}',
  '${lecture.day}',
  ${lecture.period},
  '${lecture.startTime}',
  '${lecture.subject}',
  '${lecture.room}',
  '${lecture.endTime}')">Assign Teacher</button>

          `;
          ul.appendChild(li);
        });
        container.appendChild(ul);
      }

      document.getElementById("teacherLectureModal").style.display = "block";
    } else {
      alert(result.message || "Failed to adjust leave request.");
    }
  } catch (error) {
    console.error("Error adjusting leave request:", error);
    alert("Failed to adjust leave request. Please try again.");
  }
}

function closeTeacherLectures() {
  document.getElementById("teacherLectureModal").style.display = "none";
}

async function handleReject(username, day) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, day }),
    });
    const result = await res.json();
    if (res.ok) {
      alert("Leave request rejected successfully!");
      loadleaverequests();
    } else {
      alert(result.message || "Failed to rejected leave request.");
    }
  } catch (error) {
    console.error("Error adjusting leave request:", error);
    alert("Failed to adjust leave request. Please try again.");
  }
}

async function handleApprove(username, day, status) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/approveleave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, day }),
    });
    const result = await res.json();
    if (res.ok) {
      alert(`Leave ${status} successfully!`);
      loadleaverequests();
    } else {
      alert(result.message || `Failed to ${status} leave request.`);
    }
  } catch (error) {
    console.error(`Error ${status} leave request:`, error);
    alert(`Failed to ${status} leave request. Please try again.`);
  }
}

document
  .getElementById("teacherFilter")
  .addEventListener("change", renderTable);

window.onload = function () {
  const dt = document.getElementById("date-time");
  if (dt) dt.innerText = new Date().toLocaleString();
  loadTeachers();
  loadleaverequests();
};

document.getElementById("show-leave-btn").addEventListener("click", () => {
  const leaveSection = document.getElementById("leave-requests-section");
  if (leaveSection.style.display === "none" || !leaveSection.style.display) {
    leaveSection.style.display = "block";
    loadleaverequests();
  } else {
    leaveSection.style.display = "none";
  }
});
async function AssignTeacher(username, day, period, startTime, subject, room, endTime){
    console.log("Clicked AssignTeacher for:", username, day, period, startTime);
try{
    const res = await fetch("http://localhost:3000/api/auth/assignteacher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({username, day,period,time:startTime})
      });
      const result = await res.json();
      if (res.ok) {
        // alert(`Teacher assigned successfully!`);
        const teachers=result.availableTeachers;
        console.log(teachers);
        if(!teachers.length){
          alert("No teachers available for this time slot");
          return
        }
        const container=document.getElementById("adjustLectureList");
        container.innerHTML="";
        const dropdown=document.createElement("select");
        dropdown.id="assignDropdown";
        dropdown.innerHTML=teachers
        .map(
          (t)=>
            `<option value="${t.username}">${t.username}(Load:${t.load}</option>)`
        )
        .join("");
        const confirmBtn=document.createElement("button")
        confirmBtn.textContent="confirm-Assign"
        confirmBtn.onclick=()=>{
          const selectedTeacher=dropdown.value;
          assignLectureToTeacher(
            selectedTeacher,
            day,
            period,
            startTime,
            subject,
            room,
            endTime
          );
        };
        container.appendChild(document.createElement("br"))
        container.appendChild(dropdown);
        container.appendChild(confirmBtn);







        } else {
          alert(result.message || `Failed to assign teacher.`);
          }
          } catch (error) {
            console.error(`Error assigning teacher:`, error);
            alert(`Failed to assign teacher. Please try again.`);
            }
}
async function assignLectureToTeacher(teacher,day,period,startTime,subject,room,endTime) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/assignLecture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        teacher,
        subject,
        room,
        day,
        period,
        startTime,
        endTime,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Lecture assigned to " + teacher);
      document.getElementById("teacherLectureModal").style.display = "none";
      renderTable(); 
    } else {
      alert("Assignment failed: " + result.message);
    }
  } catch (err) {
    console.error("Assignment error:", err);
    alert("Error assigning lecture.");
  }
}



