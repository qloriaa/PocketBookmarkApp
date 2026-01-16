// React and Expo imports
import { StyleSheet, FlatList, Pressable } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";

import { Picker } from "@react-native-picker/picker";

// Contexts and Hooks
import { useBooks } from "../../hooks/UseBooks";

// Themed components
import { Colors } from "../../constants/Colors";
import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedCard from "../../components/ThemedCard";

//

const Books = () => {
  const { books, fetchBookByBookshelf, fetchBooks } = useBooks();
  const router = useRouter();
  const [bookshelf, setBookshelf] = useState("ALL");

  useFocusEffect(
    useCallback(() => {
      async function filter() {
        if (bookshelf === "ALL") {
          await fetchBooks();
        } else {
          await fetchBookByBookshelf(bookshelf);
        }
      }
      filter();
    }, [bookshelf])
  );

  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedText title={true} style={styles.pageTitle}>
        Reading List
      </ThemedText>

      <Picker
        style={styles.picker}
        selectedValue={bookshelf}
        onValueChange={(itemValue) => setBookshelf(itemValue)}
      >
        <Picker.Item label="All" value="ALL" />
        <Picker.Item label="To Be Read" value="TBR" />
        <Picker.Item label="Read" value="READ" />
        <Picker.Item label="Did Not Finish" value="DNF" />
      </Picker>

      <FlatList
        data={books}
        keyExtractor={(book) => book.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item: book }) => (
          <Pressable onPress={() => router.push(`/books/${book.$id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.bookTitle}>{book.title}</ThemedText>
              <ThemedText style={styles.cardAuthor}>
                {" "}
                - Written by {book.author}
              </ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 15,
    paddingBottom: 15,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
    backgroundColor: Colors.secondary,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  list: {
    marginTop: 20,
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
