import React from 'react';
import {StyleSheet, Text, View,ScrollView, Button,TextInput,Alert } from 'react-native';

//this component is used to delete an existing deck 
//as a state is has only a key value, which is used to identify the deck the user wants to delete. 
export default class DeleteDeck extends React.Component {
	
	state={
		key: ''
	}
	
	saveKey= key=>{
		this.setState({key:key})
	}
	//function that sets the parameter to the key the user has entered, of the deck he wants to delete. 
	submitDelete=()=>{
		this.props.onsubmit(this.state.key)
		Alert.alert('Your Deck has been succesfully deleted')
	}
	render() {
		
		return ( 
			<View>
			<Text style={deleteScreen.title}>Please enter the number of the Deck you want to delete: </Text>
				<TextInput 
					style={styles.input} 
					value={this.state.key}
					onChangeText={this.saveKey}
				/>
				<View style={deleteScreen.buttons}>
					<Button 
						color='black'
						title='Confirm to Delete'
						onPress={this.submitDelete}
					/>
				</View>
			</View>
		)
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

const deleteScreen= StyleSheet.create ({
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