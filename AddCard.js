import React from 'react';
import {StyleSheet, Text, View,ScrollView, Button,TextInput,Alert } from 'react-native';

//this component is used to add a card to the existing deck of card. 
//as a state is has a front and a back, since those values are about to be set. 
export default class AddCard extends React.Component {
	
	state ={
		front: '', 
		back: '', 
	}
	saveFront= front=>{
		this.setState({front:front})
	}
	saveBack= back=>{
		this.setState({back:back})
	}
	
	//sets the parameter by setting the front and back attribute of the card. 
	//Note that the time is initially set to 0 and that the key is set in 
	//the parent component. 
	submitCard=()=>{
		this.props.onsubmit({front: this.state.front, back: this.state.back, time: 0, key:''})
		Alert.alert('Your Card has been succesfully added')
	}
	
	
	
	render(){
		
		return (
			<View style={addcardScreen.content}>
				<Text style={addcardScreen.title}>FRONT</Text>
				<TextInput 
					style={styles.input} 
					value={this.state.front}
					onChangeText={this.saveFront}
			
				/>
				<Text style={addcardScreen.title}>BACK</Text>
					<TextInput 
						style={styles.input} 
						value={this.state.back}
						onChangeText={this.saveBack}
			
						/>
			<View style={addcardScreen.buttons}>
				<Button 
					color='black'
					title='Confirm to Add'
					onPress= {this.submitCard}
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

const addcardScreen= StyleSheet.create ({
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
	}, 
	content: {
		marginTop:50,
	},
});