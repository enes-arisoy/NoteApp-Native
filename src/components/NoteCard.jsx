import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { CardEdit, NoteRemove } from 'iconsax-react-nativejs';

const NoteCard = ({ note, onDelete, onEdit }) => {
  

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>

      <TouchableOpacity
        style={{ position: 'absolute', top: 5, right: 5 }}
        onPress={() => onDelete(note.id)}
      >
        <NoteRemove size="20" color="#ffffffff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: 'absolute', bottom: 5, right: 5 }}
        onPress={() => onEdit(note.id)}
      >
        <CardEdit size="20" color="#ffffffff" />
      </TouchableOpacity>
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f87f0f0',
    borderBottomRightRadius: 16,
    padding: 8,
    width: '46%',
    marginBottom: 10,
    minHeight: 100,
    position: 'relative',
  },
  title: {
    color: '#141414ff',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#141414ff',
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  content: {
    color: '#ffffffff',
    fontSize: 14,
  },
});
