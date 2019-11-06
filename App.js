import React from 'react';
import {StyleSheet, Text, View,ScrollView, Button } from 'react-native';
import decks from './flashcards'
import DeckList from './DeckList'

//main app that is used to call the DeckList Component, which then will call the Deck Component.
export default class DecksApp extends React.Component {
	

	render () {
		return (
			<View style={styles.container}>
				<View>
				<DeckList deckList={decks} />	
				</View>
			</View>
		
		);
	}
}

const styles = StyleSheet.create({
  container: {
    	flex: 1,
	padding: 10,
    	backgroundColor: '#ffcccc',
    	alignItems: 'center',
    	justifyContent: 'center',
	color: 'black',
  },
});

