async function login(){
  const username=document.getElementById("login-username").value.trim();
  const password=document.getElementById("login-password").value.trim();
  const role=document.getElementById("login-role").value;
  if(!username||!password||!role){
    alert("Please fill all the fields");
    return;
  }
  try{
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
      credentials:"include"
    });
    const data=await response.json();
    if(response.ok){
      alert(data.message);
      localStorage.setItem('user',JSON.stringify({user:username }))   
      if(role==='admin') window.location.href="views/admin.html";
      else if(role==='teacher') window.location.href=`views/dashboard.html?username=${encodeURIComponent(username)}` ;
    }
      else{
        alert(data.message);
      }
    

  }
  catch(err){
    console.error("login Error:",err);
    alert("something went wrong");
  }
}