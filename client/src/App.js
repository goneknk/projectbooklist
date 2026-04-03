
import Axios from "./api/axios";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import EditBookModal from "./components/EditBookModal";

  function App() {
    
    //const token = localStorage.getItem("token");

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    
    //const [isFirstLoad,setIsFirstLoad] = useState(true);

    const navigate = useNavigate();
    const [user,setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const logout = ()=>{
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    };

    const [keyword,setKeyword] = useState("");

    const [bookList, setBookList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [image, setImage] = useState(null);

    const [showEditForm, setShowEditForm] = useState(false);
    const [editId, setEditId] = useState(null); 

    const titleRef = useRef(null);

    // โหลดข้อมูลทันทีตอนเปิดเว็บ
    useEffect(()=>{getBooklist();},[]);

    
    //useEffect(()=>{
      //if(isFirstLoad){
       // setIsFirstLoad(false);
       // return;
      //}
       // alert("มีการเพิ่มหรือลบหนังสือ");
   // },[bookList]);


  const getBooklist = async () => {
    try{
      setLoading(true);
      setError(null);
    const response = await Axios.get("/booklist");
    setBookList(response.data);

    }catch(err){
      setError("โหลดข้อมูลหนังสือไม่สำเร็จ");
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
  const delay = setTimeout(async () => {
    if(keyword.trim() === ""){
      getBooklist();
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await Axios.get("/search", { params: { keyword } });
      setBookList(res.data);
    } catch(err) {
      setError("ค้นหาหนังสือไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }, 500);

  return () => clearTimeout(delay);
}, [keyword]);

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setPublishedYear("");
    setCategory("");
    setImage(null);
  };

  const totalBooks = useMemo(() => {
    return bookList.length;
  }, [bookList]);

    

  const addBook = async () => {
      try{
        setLoading(true);
        setError(null);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("published_year", publishedYear);
        formData.append("category", category);

        if(image){
            formData.append("image", image);
        }
        await Axios.post("/create", formData);
          alert("เพิ่มหนังสือสำเร็จ");

        setTitle("");
        setAuthor("");
        setDescription("");
        setPublishedYear("");
        setCategory("");
        setImage(null);
        titleRef.current?.focus();

        getBooklist();

      }catch(err){
        setError("เพิ่มหนังสือไม่สำเร็จ");
      }finally{
         setLoading(false);
      }
  };

    const openEditForm = (book) => {

        setEditId(book.book_id);
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setPublishedYear(book.published_year);
        setCategory(book.category);
        setShowEditForm(true);
    };

    const updateBook = async () => {
      try{
        setLoading(true);
        setError(null);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("published_year", publishedYear);
        formData.append("category", category);

        if(image){
            formData.append("image", image);
        }

        await Axios.put(`/update/${editId}`, formData);

        alert("อัปเดตข้อมูลสำเร็จ");

        setShowEditForm(false);
        setImage(null);
        clearForm();   
        getBooklist();

      }catch(err){
        setError("อัปเดตไม่สำเร็จ");
      }finally{
        setLoading(false);
      }
    };

    const deleteBook = async (id) => {
      const confirmDelete = window.confirm("ต้องการลบหนังสือเล่มนี้จริงหรือไม่?");

    if(!confirmDelete) return;
      try{
          setLoading(true);
          setError(null);
          await Axios.delete(`/delete/${id}`);
          alert("ลบข้อมูลสำเร็จ");
          getBooklist();  

      }catch(err){
        setError("ลบข้อมูลไม่สำเร็จ");
      }finally{
        setLoading(false);
      }
    };

    return (
      
      <div className="container mt-4">

        {/* Header */}
        <div className="d-flex justify-content-between mb-4">
        <h2>Book Library</h2>
        <input
            className="form-control shadow-sm"
            style={{
                  width: "350px",
                  height: "35px",
                  borderRadius: "30px",
                  padding: "10px 20px"
            }}
            placeholder=" ค้นหาหนังสือ..."
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}/>  

        {!user ? (
          <div>
            <button
              className="btn btn-outline-primary me-2"onClick={()=>navigate("/login")}>
              Login
            </button>
            <button
              className="btn btn-success"onClick={()=>navigate("/register")}>
              Register
            </button>
          </div>
        ):(
          <div>
            <span className="me-3">
              {user.user_name}
            </span>
            <button className="btn btn-danger"onClick={logout}>
               Logout
            </button>
            <button className="btn btn-primary"  onClick={()=>{
                clearForm();
                setShowForm(!showForm);
              }}>
                + Add Book
            </button>
          </div>  
        )}
    </div>

        {/* FORM */}
        <BookForm
            showForm={showForm}
            setShowForm={setShowForm}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            publishedYear={publishedYear}
            setPublishedYear={setPublishedYear}
            setImage={setImage}
            addBook={addBook}
            titleRef={titleRef} />

        <EditBookModal
            showEditForm={showEditForm}
            setShowEditForm={setShowEditForm}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            description={description}
            setDescription={setDescription}
            publishedYear={publishedYear}
            setPublishedYear={setPublishedYear}
            category={category}
            setCategory={setCategory}
            setImage={setImage}
            clearForm={clearForm} 
            updateBook={updateBook}/>

        {/* Loading */}
          {loading && (
              <div className="alert alert-info text-center">
                    Loading...
              </div>
          )}

        {/* Error */}
          {error && (
              <div className="alert alert-danger text-center">
                  {error}
              </div>
          )}
        <p>จำนวนหนังสือทั้งหมด: {totalBooks} เล่ม</p>

      {/* รายการหนังสือทั้งหมด */}
      <BookList
          bookList={bookList}
          user={user}
          deleteBook={deleteBook}
          openEditForm={openEditForm}/>

    </div>
  );
}


export default App;