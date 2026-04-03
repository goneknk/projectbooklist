import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");

 const navigate = useNavigate();

 const login = ()=>{
  Axios.post("http://localhost:5000/login",{email,password})
  .then((res)=>{
    if(res.data.login){
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        navigate("/");
    }else{
        alert("Email หรือ Password ไม่ถูกต้อง");
    }
  });
 };

 return(
 <div
   className="vh-100 d-flex justify-content-center align-items-center"
   style={{background:"linear-gradient(135deg,#667eea,#764ba2)"}}>
   <div
     className="card shadow-lg p-4"
     style={{
       width:"400px",
       borderRadius:"20px",
       backdropFilter:"blur(10px)"
     }}>

     {/* TITLE */}
     <div className="text-center mb-4">
       <h2 className="fw-bold"> Book Library</h2>
       <p className="text-muted">เข้าสู่ระบบ</p>
     </div>

     {/* EMAIL */}
     <input
       className="form-control mb-3"
       placeholder="Email"
       onChange={(e)=>setEmail(e.target.value)}/>

     {/* PASSWORD */}
     <input
       type="password"
       className="form-control mb-4"
       placeholder="Password"
       onChange={(e)=>setPassword(e.target.value)}/>

     {/* BUTTON */}
     <button
       className="btn btn-primary w-100 fw-bold"
       onClick={login}>
       Login
     </button>

     {/* REGISTER */}
     <div className="text-center mt-3">
       <small>
         ยังไม่มีบัญชี ?
         <span
           style={{cursor:"pointer"}}
           className="text-primary ms-1"
           onClick={()=>navigate("/register")}>
           สมัครสมาชิก
         </span>
       </small>
     </div>

   </div>
 </div>
 );
}

export default Login;