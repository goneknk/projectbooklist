function EditBookModal({
  showEditForm,
  setShowEditForm,
  title,
  setTitle,
  author,
  setAuthor,
  description,
  setDescription,
  publishedYear,
  setPublishedYear,
  category,
  setCategory,
  setImage,
  clearForm,
  updateBook
}) {

  if(!showEditForm) return null;

  return (
    <div className="modal d-block" style={{background:"rgba(0,0,0,0.5)"}}>
            <div className="modal-dialog">
              <div className="modal-content p-4">

                <h4>Edit Book</h4>

                <input
                  className="form-control mb-2"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />

                <input
                  className="form-control mb-2"
                  value={author}
                  onChange={(e)=>setAuthor(e.target.value)}
                />

                <textarea
                  className="form-control mb-2"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                />

                <input
                  type="number"
                  className="form-control mb-2"
                  value={publishedYear}
                  onChange={(e)=>setPublishedYear(e.target.value)}
                />

                <select
                  className="form-control mb-2"
                  value={category}
                  onChange={(e)=>setCategory(e.target.value)}
                >
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
                  type="file"
                  className="form-control mb-3"
                  onChange={(e)=>setImage(e.target.files[0])}
                />

                <div className="d-flex justify-content-end gap-2">

                  <button
                    className="btn btn-secondary"
                    onClick={()=>{
                        setShowEditForm(false);
                        clearForm();
                    }}>
                    Cancel
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={updateBook}
                  >
                   Save Changes
                  </button>

                </div>
              </div>
            </div>
          </div>

  );
}

export default EditBookModal;