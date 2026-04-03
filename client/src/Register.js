import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate = useNavigate();

    const register = ()=>{
        Axios.post("http://localhost:5000/register",{user_name:name,email:email,password:password})
        .then(()=>{
            alert("สมัครสมาชิกสำเร็จ");
            navigate("/login");
        });
    };

return(
    <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{background:"linear-gradient(135deg,#667eea,#764ba2)" }}>

   <div
     className="card shadow-lg p-4"
     style={{
       width:"420px",
       borderRadius:"20px"
     }}>

     {/* TITLE */}
     <div className="text-center mb-4">
       <h2 className="fw-bold"> Book Library</h2>
       <p className="text-muted">สมัครสมาชิก</p>
     </div>

     {/* NAME */}
     <input
       className="form-control mb-3"
       placeholder="Name"
       onChange={(e)=>setName(e.target.value)}/>

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
       className="btn btn-success w-100 fw-bold"
       onClick={register}>
       Register
     </button>

     {/* LOGIN LINK */}
     <div className="text-center mt-3">
       <small>
         มีบัญชีอยู่แล้ว ?
         <span
           className="text-primary ms-1"
           style={{cursor:"pointer"}}
           onClick={()=>navigate("/login")}>
           เข้าสู่ระบบ
         </span>
       </small>
     </div>

   </div>
 </div>
 );
}

export default Register;