// DYNAMIC PAGE

// import React and Expo
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState, useCallback} from "react";
import { useFocusEffect } from "expo-router";


// import Components and Hooks
import { useBooks } from "../../../hooks/UseBooks";

// Themed Components
import { Colors } from "../../../constants/Colors";
import ThemedText from "../../../components/ThemedText";
import ThemedButton from "../../../components/ThemedButton";
import ThemedCard from "../../../components/ThemedCard";
import ThemedView from "../../../components/ThemedView";
import Spacer from "../../../components/Spacer";
import ThemedLoader from "../../../components/ThemedLoader";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useLocalSearchParams(); // from pressable action
  const { fetchBookById, deleteBook } = useBooks(); // func from hook
  const router = useRouter();

  // Delete Book, reset book list, and redirect page to library
  const handleDelete = async () => {
    await deleteBook(id);
    setBook(null);
    router.replace("/books");
  };

  // Fetch book data by ID when the screen is focused
  useFocusEffect(
    useCallback(() => {
      async function getBookData() {
        const bookData = await fetchBookById(id);
        setBook(bookData);
      }
      getBookData();
    }, [id])
  );

  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }
  return (
    <ThemedView safe={true} style={styles.container}>
      <ScrollView>
        <ThemedText title={true} style={styles.pageTitle}>
          Book Details
        </ThemedText>
        <ThemedCard style={styles.card}>
          <ThemedText style={styles.bookTitle}> {book.title} </ThemedText>
          <Spacer height={15} />
          <ThemedText> Written by {book.author} </ThemedText>

          <Spacer />
          <ThemedText>
            <Text style={styles.dataTitle}>Pages : </Text>
            {book.pageCount}
          </ThemedText>
          <Spacer height={10} />

          <ThemedText>
            <Text style={styles.dataTitle}>Genre(s) : </Text>
            {book.genre?.map((item, index) => (
              // Using the index as the key is acceptable for a static list
              <Text key={index}>{item}, </Text>
            ))}
          </ThemedText>
          <Spacer height={10} />

          <ThemedText>
            <Text style={styles.dataTitle}>Bookshelf : </Text>
            {book.bookshelf}
          </ThemedText>
          <Spacer height={10} />

          <ThemedText>
            <Text style={styles.dataTitle}>Description : </Text>
            {book.description}
          </ThemedText>

          <Spacer />
          <ThemedText>
            <Text style={styles.dataTitle}>Rating : </Text>
            {book.rating}{" "}
          </ThemedText>
          <Spacer height={10} />

          <ThemedText>
            <Text style={styles.dataTitle}>Review : </Text>
            {book.review}{" "}
          </ThemedText>
          <Spacer height={10} />

          <ThemedText>
            <Text></Text>
          </ThemedText>
        </ThemedCard>

        <ThemedButton style={styles.delete} onPress={handleDelete}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Delete</Text>
        </ThemedButton>

        <ThemedButton onPress={() => router.push(`/edit/${book.$id}`)}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Edit</Text>
        </ThemedButton>
      </ScrollView>
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    margin: 20,
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
    backgroundColor: Colors.secondary,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  dataTitle: {
    fontWeight: "bold",
  },
  delete: {
    alignSelf: "center",
    backgroundColor: Colors.warning,
  },
});
