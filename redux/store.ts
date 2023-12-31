import { configureStore } from '@reduxjs/toolkit';
import BooksReducer from './reducer/book.slice';

const store = configureStore({
  reducer: {
    books: BooksReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {waitlist: WaitlistReducer}
export type AppDispatch = typeof store.dispatch;

export default store;
