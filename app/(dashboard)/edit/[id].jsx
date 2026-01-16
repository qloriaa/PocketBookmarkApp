// React and Expo imports
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";

// Contexts and Hooks imports
import { useBooks } from "../../../hooks/UseBooks";
import { AllGenres } from "../../../constants/GenreOptions";

// Themed components
import Spacer from "../../../components/Spacer";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedButton from "../../../components/ThemedButton";
import { Colors } from "../../../constants/Colors";
import ThemedLoader from "../../../components/ThemedLoader";

const Edit = () => {
  const [book, setBook] = useState(null);
  const { id } = useLocalSearchParams(); // from pressable action
  const { fetchBookById, updateBook } = useBooks();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state variables
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [bookshelf, setBookshelf] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [genres, setGenres] = useState([]);

  // Fetch book data by ID and populate form fields
  useFocusEffect(
    useCallback(() => {
      async function getBookData() {
        const fetchedBook = await fetchBookById(id);
        setBook(fetchedBook);
        // Populate form fields with fetched book data
        setTitle(fetchedBook.title);
        setAuthor(fetchedBook.author);
        setDescription(fetchedBook.description);
        setPageCount(
          fetchedBook.pageCount ? fetchedBook.pageCount.toString() : ""
        );
        setGenres(fetchedBook.genre ? fetchedBook.genre : []);
        setBookshelf(fetchedBook.bookshelf);
        setRating(fetchedBook.rating ? fetchedBook.rating.toString() : "");
        setReview(fetchedBook.review || "");
      }
      getBookData();
    }, [id])
  );

  // Conditional rendering while book data is being fetched/ was not found
  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  // Display Review and Rating fields only if book has been read/ or DNF
  const hasBeenRead = async () => {
    if (book.readStatus !== "TBR") {
      return (
        <>
          <Spacer />
          <ThemedText style={styles.dataTitle}>Rating : </ThemedText>
          <ThemedTextInput
            placeholder="Rating"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
            style={styles.input}
          />
          <Spacer />
          <ThemedText style={styles.dataTitle}>Review : </ThemedText>
          <ThemedTextInput
            placeholder="Review"
            value={review}
            onChangeText={setReview}
            style={styles.multiline}
            multiline={true}
          />
        </>
      );
    }
  };
  // Handle form submission
  const handleUpdate = async () => {
    // Input validation
    if (!title.trim() || !author.trim()) {
      alert("Title and Author are required fields.");
      return;
    }

    setLoading(true);

    try {
      // Create book data object
      const bookData = {
        title,
        author,
        description,
        pageCount: parseInt(pageCount, 10),
        genre: genres,
        bookshelf,
        rating: rating ? parseFloat(rating) : null,
        review,
      };
      // Call updateBook from context
      await updateBook(id, bookData);

      // Reset form fields
      setTitle("");
      setAuthor("");
      setDescription("");
      setPageCount();
      setGenres([]);

      // Navigate back to books details
      router.replace("/books/" + id);
    } catch (error) {
      console.error("Error updating book:", error);
    }

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container} safe={true}>
        <ThemedText title={true} style={styles.title}>
          Update Book Details
        </ThemedText>

        <KeyboardAwareScrollView>
          <ScrollView
            contentContainerStyle={styles.ScrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <Spacer />
            <ThemedText style={styles.dataTitle}>Title : </ThemedText>
            <ThemedTextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <Spacer />
            <ThemedText style={styles.dataTitle}>Author : </ThemedText>
            <ThemedTextInput
              placeholder="Author"
              value={author}
              onChangeText={setAuthor}
              style={styles.input}
            />
            <Spacer />
            <ThemedText style={styles.dataTitle}>Page Count : </ThemedText>
            <ThemedTextInput
              placeholder="Page Count"
              value={pageCount}
              onChangeText={setPageCount}
              keyboardType="numeric"
              style={styles.input}
            />

            <Spacer />
            <ThemedText style={styles.dataTitle}>Bookshelf : </ThemedText>
            <Picker
              style={styles.picker}
              selectedValue={bookshelf}
              onValueChange={(itemValue) => setBookshelf(itemValue)}
            >
              <Picker.Item label="To Be Read" value="TBR" />
              <Picker.Item label="Read" value="READ" />
              <Picker.Item label="Did Not Finish" value="DNF" />
            </Picker>
            <Spacer />
            <ThemedText style={styles.dataTitle}>Description : </ThemedText>
            <ThemedTextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.multiline}
              multiline={true}
            />
            <Spacer />
          </ScrollView>
          <ThemedText style={styles.dataTitle}>
            Selected: {genres.join(", ")}
          </ThemedText>
          <ThemedText style={styles.dataTitle}>Genre(s) : </ThemedText>

          <ThemedView
            style={[styles.input, { paddingHorizontal: 20, paddingTop: 20 }]}
          >
            <MultipleSelectList
              defaultOption={genres.map((genre) => ({
                key: genre,
                value: genre,
              }))}
              setSelected={(value) => setGenres(value)}
              data={AllGenres.map((genre) => ({ key: genre, value: genre }))}
              save="value"
              placeholder="Select Genre(s)"
              onSelect={() => console.log(genres)}
              // Style selected options
              boxStyles={{ borderRadius: 5, borderColor: Colors.border }}
              badgeStyles={{ backgroundColor: Colors.primary }}
              labelStyles={{ color: Colors.text }}
            />
          </ThemedView>

          {book && bookshelf !== "TBR" ? (
            <>
              <Spacer />
              <ThemedText style={styles.dataTitle}>Rating : </ThemedText>
              <ThemedTextInput
                placeholder="Rating"
                value={rating}
                onChangeText={setRating}
                keyboardType="numeric"
                style={styles.input}
              />
              <Spacer />
              <ThemedText style={styles.dataTitle}>Review : </ThemedText>
              <ThemedTextInput
                placeholder="Review"
                value={review}
                onChangeText={setReview}
                style={styles.multiline}
                multiline={true}
              />
            </>
          ) : null}

          <Spacer />
          <ThemedButton onPress={handleUpdate} disabled={loading}>
            <ThemedText style={{ color: "#f2f2f2" }}>
              {loading
                ? "Updating Book in Library..."
                : "Update Book to Library"}
            </ThemedText>
          </ThemedButton>
        </KeyboardAwareScrollView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Edit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "90%",
    alignSelf: "stretch",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 5,
  },
  multiline: {
    padding: 10,
    borderRadius: 5,
    minHeight: 100,
    alignSelf: "stretch",
    marginHorizontal: 20,
  },
  dataTitle: {
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  picker: {
    width: "90%",
    alignSelf: "stretch",
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: Colors.inputBackground,
    textColor: Colors.primary,
  },
});
