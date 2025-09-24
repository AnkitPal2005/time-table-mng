document.addEventListener("DOMContentLoaded",()=>{
    const forgotForm=document.getElementById("forgotForm");
    const verifyOtpForm=document.getElementById("verifyOtpForm");
    const message=document.getElementById("message");
    forgotForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const email=document.getElementById("email").value.trim();
        try{
            const res=await fetch("/send-otp",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email})
            });
            const data=await res.json();
            message.textContent=data.message;
            if(res.ok){
                forgotForm.style.display="none";
                verifyOtpForm.style.display="block";
            }
        }
        catch(err){
            console.error(err);
            message.textContent="Something Went Wrong.Please Try Again";
        }
    });
    verifyOtpForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const email=document.getElementById("email").value.trim();
        const otp=document.getElementById("otp").value.trim();
        try{
            const res=await fetch("/verify-otp",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,otp})
            });
            const data=await res.json();
            message.textContent=data.message;
            if(res.ok){
                window.location.href="/reset-password.html?email="+encodeURIComponent(email);
            }
        }
        catch(err){
            console.error(err);
            message.textContent="Verification Failed.Try Again.";
        }
    })
});