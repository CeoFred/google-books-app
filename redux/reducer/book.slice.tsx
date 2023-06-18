import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookState {
  books: Book[];
}

interface Book {
  author: string;
  title: string;
  id: string;
  publisher: string;
}

const bookSlice = createSlice({
  name: 'waitlist',
  initialState: {
    books: [],
  } as BookState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
  },
});
export const { addBook } = bookSlice.actions;

export default bookSlice.reducer;
