import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteScreen = ({ navigation }) => {
  // ^ 1.text inputların içerisindeki verilere erişmek için öncelikle her bir inputu temsil edecek state değişkenleri oluşturuyoruz
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Notu kaydetme işlemi
  const handleSubmit = async () => {
    //* notlar dizisine elimizdeki notu eklemek için aşağıdaki adımları izlemeliyiz:
   // 1.önce elde bulunan notları almalıyız. asyncStorage'dan notları çekip parse ediyoruz.
   // 2.daha sonra yeni notumuzu oluşturuyoruz.
   // 3. sonrasında bu yeni notu mevcut notlar dizisine ekliyoruz.
   // 4. Son olaarak bu güncel notlar dizisini tekrar AsyncStorage'a kaydetmeliyiz.
    try {
        let stored= await AsyncStorage.getItem('myNotes') ;
        parsedStored = JSON.parse(stored) || [];
        const newNote = { id: Date.now(), title, content };
         parsedStored.push(newNote);
        const jsonStored= JSON.stringify(parsedStored);
         await AsyncStorage.setItem('myNotes', jsonStored);
        Alert.alert('Success', 'Note saved successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
    } catch (error) {
        console.log(error);
        Alert.alert('Error', 'There was an error saving the note');
        return;
    }
    
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#151414f3' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.noteTitle}>Create Note</Text>
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={styles.title}>Title</Text>
          {/* 2. bu statein değerini inputun value propuyla eşleştiriyoruz. */}
          {/* 3. onChangeText propuyla inputun içeriği değiştiğinde state güncelleniyor. */}
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
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              width: 100,
              textAlign: 'center',
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default NoteScreen;
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
  button: {
    backgroundColor: '#568aebff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
