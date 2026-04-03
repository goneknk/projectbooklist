import React from "react";

function BookList({
  bookList,
  user,
  deleteBook,
  openEditForm
}) {

  return (
    <div className="row">
        {bookList.map((val, key) => (
          <div className="col-md-4 mb-4" key={key}>
            <div className="card h-100 shadow-sm">

              {val.image ? (
                <img
                  src={`http://localhost:5000/images/${val.image}`}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                  alt="book"
                />
              ) : (
                <div
                  style={{
                    height: "250px",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#777",
                    fontSize: "18px"
                  }}
                >
                  No Image
                </div>
              )}

              <div className="card-body">
                <h5 className="card-title">{val.title}</h5>

                <p className="card-text">
                  <b>Author:</b> {val.author}
                </p>

                <p className="card-text">
                  {val.description}
                </p>

                <p className="card-text">
                  <b>Category:</b> {val.category}
                </p>

              </div>

              <div className="card-footer text-muted">
                  Year: {val.published_year}
                  {user && user.user_id === val.user_id && (
                  <>
                <button
                    className="btn btn-danger btn-sm float-end ms-2"
                    onClick={()=>deleteBook(val.book_id)}>
                    Delete
                </button>

                <button
                    className="btn btn-warning btn-sm float-end"
                    onClick={()=>openEditForm(val)}>
                    Edit
                </button>
                </>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

  );
}

export default BookList;