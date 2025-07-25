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
const user=JSON.parse(localStorage.getItem("user"))||{username:"Teacher"};
document.getElementById("teacher-name").innerText=`${user.user}(Teacher)`;
const now=new Date();
document.getElementById("current-date").innerText = `${now.getDate()}/${
  now.getMonth() + 1
}/${now.getFullYear()}`;
document.getElementById("current-time").innerText = new Date(now).toLocaleTimeString();
const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
console.log(user.userr);

fetch(`/api/teacher/teacher/${user.user}`)
.then((res)=>res.json())
.then((data)=>{
  const lectures=data.lectures||[];
  const todayLectures=lectures.filter((l)=>l.day===today);
  document.getElementById("total-lectures").innerText = lectures.length;
  document.getElementById("total-left").innerText = todayLectures.length;
  document.getElementById("total-done").innerText=0;
})
.catch((err)=>{
  console.error("Error Loading DashBoard",err)
});
document.querySelector("aside.sidebar button:nth-Child(2)").addEventListener("click",()=>{
  window.location.href="/views/teacher.html?username="+user.user;
});

