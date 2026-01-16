// React and Expo imports
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";

// Contexts and Hooks imports
import { useUser } from "../../hooks/UseUser";
import { useBooks } from "../../hooks/UseBooks";

//Themed Components
import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";

const Profile = () => {
  // Get user and logout function from useUser hook (UserContext)
  const { logout, user } = useUser();
  const { books, fetchBookByBookshelf, fetchBooks } = useBooks();
  const [all, setAll] = useState(0);

  useEffect(() => {
    const getAllCount = async () => {
      await fetchBooks();
    };
  }, []);

  const getReadCount = books.filter(book =>
    book.bookshelf.includes("READ")
  )

  const getTBRCount = books.filter(book =>
    book.bookshelf.includes("TBR")
  )

  const getDNFCount = books.filter(book =>
    book.bookshelf.includes("DNF")
  )

  const totalPages = getReadCount.reduce((sum, book) => {
    return sum + book.pageCount;
  }, 0)

  return (
    <ThemedView style={styles.container} safe={true}>
      <ScrollView>
        <ThemedText title={true} style={styles.title}>
          Profile
        </ThemedText>
        <Spacer />
        <ThemedText title={true} style={styles.heading}>
          {user.name}'s Library
        </ThemedText>
        <Spacer />

        <ThemedText>Total Books : {Object.entries(books).length}</ThemedText>
        <Spacer/>
        
        <ThemedText>Read Books Count : {Object.keys(getReadCount).length} </ThemedText>
        <Spacer/>

        <ThemedText>TBR Books Count : {Object.keys(getTBRCount).length}</ThemedText>
        <Spacer/>

        <ThemedText>DNF Books Count : {Object.keys(getDNFCount).length}</ThemedText>
        <Spacer/>   

        <ThemedText>Total Pages Read: {totalPages}</ThemedText>
        <Spacer/>

        <ThemedButton onPress={logout}>
          <ThemedText style={{ color: "#f2f2f2" }}>Logout</ThemedText>
        </ThemedButton>
      </ScrollView>
    </ThemedView>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
