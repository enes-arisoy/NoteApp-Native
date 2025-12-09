import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteCard from './../components/NoteCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadNotes = async () => {
        const storedNotes = await AsyncStorage.getItem('myNotes');
        if (!storedNotes) {
          setNotes([]);
          return;
        }

        const parsed = JSON.parse(storedNotes);
        setNotes(parsed);
      };

      loadNotes();
    }, []),
  );

  const handleDeleteNote = async id => {
    try {
      const filteredNotes = notes.filter(item => item.id !== id);
      setNotes(filteredNotes);

      await AsyncStorage.setItem('myNotes', JSON.stringify(filteredNotes));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>My Notes</Text>
        <ScrollView>
          <View style={styles.notesContainer}>
            {/* Eğer hiç not yoksa mesaj göster */}
            {notes.length === 0 ? (
              <Text
                style={{
                  color: '#817f7fff',
                  fontSize: 20,
                  textAlign: 'center',
                }}
              >
                Please add a note!
              </Text>
            ) : (
              notes.map((item, index) => (
                <NoteCard
                  key={item.id}
                  note={item}
                  onDelete={() => handleDeleteNote(item.id)}
                  onEdit={() => navigation.navigate('Update', { note: item })}
                />
              ))
            )}
          </View>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Note')}
          >
            <Text style={styles.addNote}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: '#eb5656ff' }]}
            onPress={async () => {
              await AsyncStorage.removeItem('myNotes');
              setNotes([]);
            }}
          >
            <Text style={styles.addNote}>Delete</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#151414f3',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    alignSelf: 'center',
  },
  notesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
  },
  addButton: {
    backgroundColor: '#568aebff',
    padding: 10,
    borderRadius: 8,

    alignItems: 'center',
    fontSize: 18,
  },
  addNote: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    width: 100,
    textAlign: 'center',
  },
});
