import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ManagementBooks() {
  const [form, setForm] = useState({
    bookName: "",
    studentName: "",
    borrowDate: "",
    returnDate: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [filterStatus, setFilterStatus] = useState("");
  const dispatch = useDispatch();
  const books = useSelector((state: any) => state.bookReducer.books);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    let isValid = true;
    const today = new Date().toISOString().split("T")[0];

    if (!form.bookName) {
      tempErrors.bookName = "Tên sách không được để trống";
      isValid = false;
    }
    if (!form.studentName) {
      tempErrors.studentName = "Tên sinh viên không được để trống";
      isValid = false;
    }
    if (!form.borrowDate) {
      tempErrors.borrowDate = "Ngày mượn không được để trống";
      isValid = false;
    } else if (form.borrowDate < today) {
      tempErrors.borrowDate = "Ngày mượn không nhỏ hơn ngày hiện tại";
      isValid = false;
    }
    if (!form.returnDate) {
      tempErrors.returnDate = "Ngày trả không được để trống";
      isValid = false;
    } else if (form.returnDate < today) {
      tempErrors.returnDate = "Ngày trả không nhỏ hơn ngày hiện tại";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch({
        type: "ADD_BOOK_INFO",
        payload: form,
      });
      setForm({
        bookName: "",
        studentName: "",
        borrowDate: "",
        returnDate: "",
      });
      setErrors({});
      (
        document.getElementById("closeModalButton") as HTMLButtonElement
      ).click();
    }
  };
  const handleStatusChange = (index: number, status: string) => {
    const updatedBooks = books.map((book: any, i: number) =>
      i === index ? { ...book, status: status } : book
    );

    dispatch({
      type: "TOGGLE_BOOK_STATUS",
      payload: updatedBooks,
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };
  const filteredBooks = filterStatus
    ? books.filter((book: any) => book.status === filterStatus)
    : books;

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between mb-3">
          <h3>Quản lý mượn trả sách</h3>
          <div className="d-flex gap-2">
            <div>
              <select
                name="filterStatus"
                id="filterStatus"
                value={filterStatus}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Tất cả</option>
                <option value="Đã trả">Đã trả</option>
                <option value="Đang mượn">Đang mượn</option>
              </select>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Thêm thông tin
              </button>
            </div>
          </div>
        </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên sách</th>
              <th scope="col">Sinh viên mượn</th>
              <th scope="col">Ngày mượn</th>
              <th scope="col">Ngày trả</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{book.bookName}</td>
                <td>{book.studentName}</td>
                <td>{book.borrowDate}</td>
                <td>{book.returnDate}</td>
                <td>
                  <select
                    value={book.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="form-select"
                  >
                    <option value="Đang mượn">Đang mượn</option>
                    <option value="Đã trả">Đã trả</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-warning me-2">Xóa</button>
                  <button className="btn btn-danger">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm thông tin mượn sách
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Tên sách</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bookName"
                    value={form.bookName}
                    onChange={handleChange}
                  />
                  {errors.bookName && (
                    <div className="text-danger">{errors.bookName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Tên người mượn</label>
                  <input
                    type="text"
                    className="form-control"
                    name="studentName"
                    value={form.studentName}
                    onChange={handleChange}
                  />
                  {errors.studentName && (
                    <div className="text-danger">{errors.studentName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Ngày mượn</label>
                  <input
                    type="date"
                    className="form-control"
                    name="borrowDate"
                    value={form.borrowDate}
                    onChange={handleChange}
                  />
                  {errors.borrowDate && (
                    <div className="text-danger">{errors.borrowDate}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Ngày trả</label>
                  <input
                    type="date"
                    className="form-control"
                    name="returnDate"
                    value={form.returnDate}
                    onChange={handleChange}
                  />
                  {errors.returnDate && (
                    <div className="text-danger">{errors.returnDate}</div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closeModalButton"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}