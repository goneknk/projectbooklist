import React from "react";

function BookForm({
  showForm,
  setShowForm,
  title,
  setTitle,
  author,
  setAuthor,
  description,
  setDescription,
  category,
  setCategory,
  publishedYear,
  setPublishedYear,
  setImage,
  addBook,
  titleRef
}) {

  if(!showForm) return null;

  return (
    <div className="card p-4 mb-4 shadow">

      <div className="d-flex justify-content-between mb-3">
        <h4>Add New Book</h4>
        <button
          className="btn btn-secondary btn-sm"
          onClick={()=>setShowForm(false)}
        >
          Close
        </button>
      </div>

      <input
        ref={titleRef}
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Author"
        value={author}
        onChange={(e)=>setAuthor(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <select
        className="form-control mb-2"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}>
        <option value="">เลือกประเภทหนังสือ</option>
              <option>นิยาย</option>
              <option>การ์ตูน</option>
              <option>การศึกษา</option>
              <option>พัฒนาตนเอง</option>
              <option>ธุรกิจ</option>
              <option>เทคโนโลยี</option>
              <option>ประวัติศาสตร์</option>
              <option>ชีวประวัติ</option>
              <option>วิทยาศาสตร์</option>
              <option>สุขภาพ</option>
              <option>เด็กและเยาวชน</option>
              <option>จิตวิทยา</option>
              <option>อื่นๆ</option>
      </select>

      <input
        type="number"
        className="form-control mb-2"
        placeholder="publishedYear"
        value={publishedYear}
        onChange={(e)=>setPublishedYear(e.target.value)}
      />

      <input
        type="file"
        className="form-control mb-3"
        onChange={(e)=>setImage(e.target.files[0])}
      />

      <button className="btn btn-success" onClick={addBook}>
        Save Book
      </button>

    </div>
  );
}

export default BookForm;