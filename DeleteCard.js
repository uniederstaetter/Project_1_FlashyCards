import React from 'react';
import {StyleSheet, Text, View,ScrollView, Button,TextInput,Alert } from 'react-native';

//DeleteCard Component which is used to delete a Card. 
//The component is called-initialised from the Deck Component. 
export default class DeleteCard extends React.Component {
	
	state={
		key: ''
	}
	
	saveKey= key=>{
		this.setState({key:key})
	}
	//this function gives the parameter to the passed function from the parent component. 
	submitDelete=()=>{
		this.props.onsubmit(this.state.key)
		Alert.alert('Your Card has been succesfully deleted')
	}
	render() {
		
		return ( 
			<View style={deletecardScreen.content}>
			<Text style={deletecardScreen.title}>Please enter the number of the Card you want to delete: </Text>
				<TextInput 
					style={styles.input} 
					value={this.state.key}
					onChangeText={this.saveKey}
				/>
				<View style={deletecardScreen.buttons}>
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

const deletecardScreen= StyleSheet.create ({
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