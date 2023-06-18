import React, { useState, useRef } from 'react';

import Button from '@/components/ui/atoms/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addBook, Book, BookState } from '../../../redux/reducer/book.slice';

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<any>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [errorMessage, setError] = useState(null);
  const searchContainerRef = useRef(null);

  const booksState = useAppSelector<BookState>((state) => state.books);

  const dispatch = useAppDispatch();

  function handleClickOutside(event) {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setSearchResults([]);
    }
  }
  const handleSearch = (e) => {
    e.preventDefault();
    setError(null);
    setIsSearching(true);
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?maxResults=5&q=${encodeURIComponent(
      searchTerm
    )}&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const results = data.items.map((item) => {
          const book = item.volumeInfo;
          return {
            id: item.id,
            author: book.authors ? book.authors[0] : 'Unknown Author',
            title: book.title,
            publisher: book.publisher ? book.publisher : 'Unknown Publisher',
          };
        });
        setSearchResults(results);
      })
      .catch(() => {
        setError('Error fetching search results:');
      })
      .finally(() => setIsSearching(false));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    clearTimeout(typingTimeout);

    if (value) {
      setTypingTimeout(
        setTimeout(() => {
          handleSearch(e);
        }, 1000)
      );
    } else {
      setSearchResults([]);
    }
  };

  React.useEffect(() => {
    window.addEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  const handleAddToReadingList = async (book: Book) => {
    await dispatch(addBook(book));
  };

  return (
    <div className="container mx-auto mt-10 flex justify-center h-[80vh]">
      <div className="w-[70%] flex flex-col">
        <form className="flex justify-center mb-4" onSubmit={handleSearch}>
          <input
            className="p-2 border border-gray-300 rounded-l w-[70%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Start typing.."
            value={searchTerm}
            onChange={handleInputChange}
            required
          />
          <Button
            className="bg-[#00522a] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r flex items-center"
            isSubmit
            isLoading={isSearching}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.83 13.469l3.32 3.32a1 1 0 01-1.414 1.414l-3.32-3.32a8 8 0 111.414-1.414zM8 14A6 6 0 108 2a6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </form>
        <p>{errorMessage}</p>

        <div ref={searchContainerRef}>
          {searchResults.length > 0 ? (
            <ul className="bg-white p-4 border rounded" id="searchResults">
              {searchResults.map((book) => (
                <li
                  key={book.id}
                  className="mb-2 p-4 border border-gray-200 rounded hover:bg-gray-100 flex justify-between book-item"
                >
                  <div>
                    <p className="font-bold">{book.title}</p>
                    <p className="text-gray-500 font-light text-sm">
                      {book.author} - {book.publisher}
                    </p>
                  </div>
                  <Button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleAddToReadingList(book)}
                    title="Add to Reading List"
                    isDisabled={
                      booksState.books.filter((books) => books.id === book.id)
                        .length > 0
                    }
                    isSubmit={false}
                  >
                    {booksState.books.filter((books) => books.id === book.id)
                      .length > 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 2a2 2 0 00-2 2v14l7-3 7 3V4a2 2 0 00-2-2H7zm2 2h6v1H9V4zm0 3h6v1H9V7zm0 3h4v1H9v-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="blue"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 2a2 2 0 00-2 2v14l7-3 7 3V4a2 2 0 00-2-2H7zm2 2h6v1H9V4zm0 3h6v1H9V7zm0 3h4v1H9v-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
