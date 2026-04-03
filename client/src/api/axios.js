import axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:5000"
});

//  แนบ token อัตโนมัติ
instance.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ตรวจ token หมดอายุ
instance.interceptors.response.use(
  (response)=>response,
  (error)=>{
    if(error.response && error.response.status === 401){
      // ลบ token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // redirect login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;