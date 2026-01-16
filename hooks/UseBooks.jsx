// React imports
import { useContext } from "react";

// Context imports
import { BooksContext } from "../contexts/BooksContext";

export function useBooks() {

    const context = useContext(BooksContext);
    if (context === undefined) {
        throw new Error("useBooks must be used within a BooksProvider");
    }

    return context;
}