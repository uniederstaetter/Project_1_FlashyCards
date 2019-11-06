import React from 'react';
import {StyleSheet, Text, View,ScrollView, Button,TextInput,Alert } from 'react-native';

export default class RenameDeck extends React.Component {
	state ={
		key: null,
		name: ''
	}
	
	saveKey= key=>{
		this.setState({key:key})
	}
	saveName= name=>{
		this.setState({name:name})
	}
	submitRenaming =()=> {
		this.props.onsubmit({name: this.state.name,key: this.state.key})
		Alert.alert('Your Deck has been succesfully renamed')
	}
	
	render () {
		
		return (
			<View>
				<Text style={renameScreen.title}>Please enter the number of the Deck you want to rename: </Text>
				<TextInput 
					style={styles.input} 
					value={this.state.key}
					onChangeText={this.saveKey}
				/>
				<Text style={renameScreen.title}>Please enter the new name of the Deck: </Text>
				<TextInput 
					style={styles.input} 
					value={this.state.name}
					onChangeText={this.saveName}
			
				/>
				<View style={renameScreen.buttons}>
					<Button 
						color='black'
						title='Confirm to Rename the Deck '
						onPress={this.submitRenaming}
					/>
				</View>
			</View> 
		)
	}
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        margin: 20
    }
});

const renameScreen= StyleSheet.create ({
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