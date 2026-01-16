// React and Appwrite imports
import { createContext, useEffect, useState } from "react";
import { Permission, ID, Role, Query } from "react-native-appwrite";

// Context and hooks imports
import { useUser } from "../hooks/UseUser";

// Access appwrite database and table
import { databases, client } from "../lib/appwrite";
const DATABASE_ID = "695929000008956ccf8c";
const BOOKS_COLLECTION_ID = "books";

// Create Books Context to manage book-related state and actions
export const BooksContext = createContext();

export function BooksProvider({ children }) {
  // State to manage books data
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  // GET ALL BOOKS
  async function fetchBooks() {
    try {
      const booksList = await databases.listDocuments(
        DATABASE_ID,
        BOOKS_COLLECTION_ID,
        // Only fetch books belonging to the logged-in user
        [Query.equal("userId", user.$id)]
      );
      setBooks(booksList.documents);

    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  // GET BOOKS BY BOOKSHELF
  async function fetchBookByBookshelf(bookshelf) {
    try {    
      const booksList = await databases.listDocuments(
        DATABASE_ID,
        BOOKS_COLLECTION_ID,
        // Fetch books by bookshelf and belonging to the logged-in user
        [
          Query.equal("bookshelf", bookshelf),
          Query.equal("userId", user.$id)
        ]
      );
      setBooks(booksList.documents);
    } catch (error) {
      console.error("Error fetching books by bookshelf:", error);
    }
  }

  // GET BOOK BY ID
  async function fetchBookById(bookId) {
    try {
      const book = await databases.getDocument(
        DATABASE_ID,
        BOOKS_COLLECTION_ID,
        bookId
      );
      return book;
    } catch (error) {
      console.error("Error fetching book by ID:", error);
    }
  }

  // CREATE BOOK
  async function createBook(bookData) {
    try {
      // connect and create book entry in database
      const newBook = await databases.createDocument(
        DATABASE_ID,
        BOOKS_COLLECTION_ID,
        ID.unique(),
        // connect book to user by adding userId field
        { ...bookData, userId: user.$id },

        // add permissions so only the user can access their books
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

    } catch (error) {
      console.error("Error creating book:", error);
    }
  }

  // UPDATE BOOK
  async function updateBook(bookId, updatedData) {
    try {
        // Update book logic here
        const updatedBook = await databases.updateDocument(
          DATABASE_ID,
          BOOKS_COLLECTION_ID,
          bookId,
          updatedData
        );
        
    } catch (error) {
      console.error("Error updating book:", error);
    }
  }

  // DELETE BOOK
  async function deleteBook(bookId) {
    try {
      await databases.deleteDocument(DATABASE_ID, BOOKS_COLLECTION_ID, bookId);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  useEffect(() => {
    // listener for Books db changes
    let unsubscribe;
    const channel = `databases.${DATABASE_ID}.collections.${BOOKS_COLLECTION_ID}.documents`;

    // Fetch books when user changes (e.g., on login)
    if (user) {
      fetchBooks();
      //listen to db books changes
      unsubscribe = client.subscribe(channel, (response) => {
        // payload = data associated with event, events = str[] describing what events were triggered
        const { payload, events } = response;

        // Update local books list when new book is added to library
        if (events[0].includes("create")) {
          setBooks((prevBooks) => [...prevBooks, payload]);
        }

        // Update local list when book is deleted
        if (events[0].includes("delete")) {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book.$id !== payload.$id)
          );
        }

        // Update local list when book is updated
        if (events[0].includes("update")) {
          setBooks((prevBooks) => {
            return prevBooks.map((book) =>
              book.$id === payload.$id ? payload : book
            );
          }); 
        }
      });
    } else {
      setBooks([]);
    }

    // Stop listening with user logout
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookById,
        createBook,
        updateBook,
        deleteBook,
        fetchBookByBookshelf,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
