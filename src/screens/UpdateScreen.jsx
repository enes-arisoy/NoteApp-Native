import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateScreen = ({ navigation, route }) => {
  
  const note = route.params.note;
  console.log(note);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, []);

  // Notu kaydetme işlemi
  const handleSubmit = async () => {
    try {
      let stored = await AsyncStorage.getItem('myNotes');
      let parsedStored = JSON.parse(stored);
      const index = parsedStored.findIndex((item)=> item.id === note.id);

      parsedStored[index].title = title;
      parsedStored[index].content = content;
      await AsyncStorage.setItem('myNotes', JSON.stringify(parsedStored));
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'There was an error updating the note');
      return;
    }

  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#151414f3' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.noteTitle}>Update Note</Text>
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={styles.title}>Title</Text>

          <TextInput
            label="Title"
            placeholder="Enter your title"
            placeholderTextColor="#abababff"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>
        <View style={{ flex: 5, marginTop: 20 }}>
          <Text style={[styles.title, { marginTop: 20 }]}>Content</Text>
          <TextInput
            label="Content"
            placeholder="Enter your content"
            placeholderTextColor="#abababff"
            value={content}
            onChangeText={setContent}
            multiline={true}
            scrollEnabled={true}
            style={[styles.input, { height: '80%', textAlignVertical: 'top' }]}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#525151ff' }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UpdateScreen;
const styles = StyleSheet.create({
  noteTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#323232c1',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 8,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#568aebff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    width: 100,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
