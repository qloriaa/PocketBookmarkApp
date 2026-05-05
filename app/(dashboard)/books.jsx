// React and Expo imports
import { StyleSheet, FlatList, Pressable, View, Appearance } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback, use } from "react";

import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

// Contexts and Hooks
import { useBooks } from "../../hooks/UseBooks";

// Themed components
import { Colors } from "../../constants/Colors";
import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedCard from "../../components/ThemedCard";
import ThemedButton from "../../components/ThemedButton";

//

const Books = () => {
  const colorScheme = Appearance.getColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const { books, fetchBookByBookshelf, fetchBooks } = useBooks();
  const router = useRouter();

  const [bookshelf, setBookshelf] = useState("ALL");
  const [sortByOption, setSortByOption] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  const searchBooks = async () => {
    await search(searchTerm);
  };

  useFocusEffect(
    useCallback(() => {
      async function filter() {
        if (bookshelf === "ALL") {
          await fetchBooks(sortByOption);
        } else {
          await fetchBookByBookshelf(bookshelf, sortByOption);
        }
      }
      filter();
    }, [bookshelf, sortByOption]),
  );

  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedText title={true} style={styles.pageTitle}>
        Reading List
      </ThemedText>

      <View style={styles.pickerContainer}>
        <Picker
          style={[styles.picker, { color: theme.text }]}
          selectedValue={bookshelf}
          onValueChange={(bookshelf) => setBookshelf(bookshelf)}
        >
          <Picker.Item label="All" value="ALL" />
          <Picker.Item label="To Be Read" value="TBR" />
          <Picker.Item label="Read" value="READ" />
          <Picker.Item label="Did Not Finish" value="DNF" />
        </Picker>

        <Picker
          style={[styles.picker, { color: theme.text,  }]}
          selectedValue={sortByOption}
          onValueChange={(sort) => setSortByOption(sort)}
        >
          <Picker.Item label="Title (A-Z)" value="title" />
          <Picker.Item label="Author (A-Z)" value="author" />
          <Picker.Item label="Last Added" value="$createdAt" />
          <Picker.Item label="Last Updated" value="$updatedAt" />
        </Picker>

        {/*<Button title="Search" onPress={searchBooks}>
          <ThemedText>
            Search
          </ThemedText>
        </Button>

        */}
      </View>

      <FlatList
        data={books}
        keyExtractor={(book) => book.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item: book }) => (
          <Pressable onPress={() => router.push(`/books/${book.$id}`)}>
            <ThemedCard>
              <ThemedText style={styles.bookTitle}>{book.title}</ThemedText>
              <ThemedText> - Written by {book.author}</ThemedText>
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

  bookTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  list: {
    marginTop: 20,
  },
  pickerContainer: {
    flexDirection: "row", // Aligns children horizontally
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  picker: {
    width: "35%",
    alignSelf: "stretch",
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: Colors.inputBackground,
    textColor: Colors.primary,
  },
});
