import { useAppSelector } from '../../../redux/hooks';
import { BookState } from '../../../redux/reducer/book.slice';

export default function Books() {
  const booksState = useAppSelector<BookState>((state) => state.books);

  return (
    <div className="flex flex-col items-center justify-center px-6 h-full">
      <h1 className="text-2xl font-bold mb-4 mt-10">My Reading List</h1>
      {booksState.books.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {booksState.books.map((book) => (
            <li key={book.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-500 text-sm mb-4">
                {book.author} - {book.publisher}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No books added to the reading list.</p>
      )}
    </div>
  );
}
