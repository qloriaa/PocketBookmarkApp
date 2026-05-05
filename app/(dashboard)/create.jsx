// React and Expo imports
import { StyleSheet, Appearance, ScrollView } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";

import { MultipleSelectList } from "react-native-dropdown-select-list";
import { MultiSelect } from "react-native-element-dropdown";

import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Themed components
import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedButton from "../../components/ThemedButton";
import { Colors } from "../../constants/Colors";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// Contexts and Hooks imports
import { useBooks } from "../../hooks/UseBooks";
import { AllGenres } from "../../constants/GenreOptions";

const Create = () => {
  const colorScheme = Appearance.getColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  // Form state variables
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [pageCount, setPageCount] = useState("");

  // initialize genre list
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false); 
  const { createBook } = useBooks(); 
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async () => {
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
      };
      // Call createBook from context
      await createBook(bookData);

      // Reset form fields
      setTitle("");
      setAuthor("");
      setDescription("");
      setPageCount();
      setGenres([]);

      // Navigate back to dashboard or books list
      router.replace("/books");
    } catch (error) {
      console.error("Error creating book:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <ThemedView style={styles.container} safe={true}>
        <ThemedText title={true} style={styles.title}>
          Add Book to Library
        </ThemedText>

        <KeyboardAwareScrollView keyboardDismissMode="interactive">
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
            <ThemedText style={styles.dataTitle}>Description : </ThemedText>
            <ThemedTextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={[styles.input, { minHeight: 100 }]}
              multiline={true}
            />
            <Spacer />
            <ThemedText style={styles.dataTitle}>Genre(s) : </ThemedText>

            {/* MultipleSelectList component for selecting multiple genres 
            <MultipleSelectList
              setSelected={(value) => setGenres(value)}
              data={AllGenres.map((genre) => ({ key: genre, value: genre }))}
              save="value"
              placeholder="Select Genre(s)"
              onSelect={() => console.log(genres)} // debugging: log selected genres
              defaultOption={genres.length === 0 ? null : undefined}
              // Style selected options
              badgeStyles={{ backgroundColor: Colors.primary }} // Selected bubble background color
              checkBoxStyles={{ backgroundColor: "white" }}
              dropdownTextStyles={{ color: theme.text }}
              inputStyles={{ color: theme.text }}
            />
*/}

            <MultiSelect
              search={true}
              data={AllGenres.map((genre) => ({
                label: genre,
                value: genre,
              }))}
              labelField="label"
              valueField="value"
              placeholder="Select Genres"
              placeholderStyle={{ color: Colors.navBackground }}
              searchPlaceholder="search.."
              value={genres}
              valueTextStyle={{ color: theme.text }}
              onChange={(value) => setGenres(value)}
              dropdownPosition="auto"
              mode="modal"
              style={[
                styles.dropdown,
                { backgroundColor: theme.uiBackground, paddingBottom: "10%" },
              ]}

              b
            />
          </ScrollView>

          <Spacer />
          <ThemedButton onPress={handleSubmit} disabled={loading}>
            <ThemedText style={{ color: "#f2f2f2" }}>
              {loading ? "Adding Book to Library..." : "Add Book to Library"}
            </ThemedText>
          </ThemedButton>
        </KeyboardAwareScrollView>
      </ThemedView>
    </>
  );
};

export default Create;

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
  dropdown: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 5,
  },
  input: {
    padding: 10,
    borderRadius: 5,
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
});
