const initialState = {
    books: JSON.parse(localStorage.getItem("books") || "[]"),
  };
  
  const reducerBook = (state = initialState, action: any) => {
    switch (action.type) {
      case "ADD_BOOK_INFO":
        const updatedBooks = [...state.books, action.payload];
        localStorage.setItem("books", JSON.stringify(updatedBooks));
        return {
          ...state,
          books: updatedBooks,
        };
      case "TOGGLE_BOOK_STATUS":
        localStorage.setItem("books", JSON.stringify(action.payload));
        return {
          ...state,
          books: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducerBook;