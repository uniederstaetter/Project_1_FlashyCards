import React from 'react';
import {StyleSheet, Text, View,ScrollView, Button,TextInput,Alert } from 'react-native';

//Component that is used to add a new Deck. 
export default class AddDeck extends React.Component {
	
	//as a state the AddDeck component needs only the name of the deck, all the rest will be initialised to null-empty. 
	state={
		name: '', 
	}
	saveDeck= name=>{
		this.setState({name:name})
	}
	//this function will pass the new deck to the function that was given as a parameter from the parent (DeckList) Component. 
	submitDeck=()=>{
		this.props.onsubmit({name: this.state.name, cards: [{front:'This is the default Card', back:'Default back ', time: 0}], key: ''})
		Alert.alert('Your Deck has been succesfully added')
	}
	
	render () {
		
		return (
		<View>
			<Text style={addScreen.title}>Enter a name for your new Deck </Text>
			<TextInput 
				style={styles.input} 
				value={this.state.name}
				onChangeText={this.saveDeck}
			
			/>
			<View style={addScreen.buttons}>
				<Button 
					color='black'
					title='Confrim to Add the Deck'
					onPress={this.submitDeck}
				/>
			</View>
		</View>
		);
	}
}

//********************STYLING*************************//
const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        margin: 20
    }
});

const addScreen= StyleSheet.create ({
	title: {
		fontSize:20,
		color: 'white',
	},
	buttons: {
		backgroundColor: '#ff8080',
		borderRadius: 5,
		marginTop:5,
		padding: 0,
		color:'white'
	}
});