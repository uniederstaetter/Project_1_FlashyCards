import React from 'react';
import {StyleSheet, Text, View,ScrollView, Button } from 'react-native';
import Deck from './Deck'
import AddDeck from './AddDeck'
import RenameDeck from './RenameDeck'
import DeleteDeck from './DeleteDeck'


//initialises the decks, by assining name, cards, an array of cards and the key properties. 
//as a key we use simply the index of the list
const addtheDeck = deck => deck.map((deck,index) =>{
		return (
			{
			name: deck.name, 
			cards: deck.cards, 
			key: index
			}
			);
	}
	
	)
	

//this component is used to render the Deck List. 
//hence it shows all Decks possible, the possibility of adding, renaming and deleting a Deck. 
export default class DeckList extends React.Component {

	state ={
		
		deck: addtheDeck(this.props.deckList), //given from the App Componet, initially the one of the file. 
		theDeck: null, //the actual selected Deck 
		adding: false, 
		selected:false, 
		renaming: false,
		deleting: false

		
	}
	
	//this function is called, when the user has clicked on a button which represents a deck
	//the state theDeck represents the deck which the user has selected. 
	//note that here deck represents the list of decks not the selected one. 
	//furthermore, it sets also the selected attribute to true, which causes the Deck Component to be displayed. 
	choseDeck=newSetofDeck=> {
		this.setState({theDeck: newSetofDeck})
		this.setState({selected: true})
	
	}
	
	//this function is called, when the user clicks on the choose other deck button, 
	//the user then is redirected to the 'main' screen by setting the selected deck to null and resets the selected. 
	goBack =() =>{
		this.setState({theDeck:null})
		this.setState({selected: false})
	
	}
	
	//addDeck is called when the user clicks on the add new deck button, 
	//this sets the state attribute adding to true, which redirects the user
	//to the add deck screen
	addADeck=() =>{
		this.setState({adding: true})
	}
	
	//similar to addADeck, the function is used to display the rename Deck screen. 
	renameADeck=() =>{
		this.setState({renaming:true})
	}
	
	//similar to addADeck, the function is used to display the delete Deck screen. 
	deleteADeck=() =>{
		this.setState({deleting:true})
	}
	
	//this function is called when the user clicks on the back button in the delete, add, rename screen
	//please note, for convinience all 3 attributes are set in 1 shot, which is reasonable since they are 
	//never used at the same time. 
	returnHome=()=>{
		this.setState({adding: false})
		this.setState({renaming:false})
		this.setState({deleting:false})
	}
	//this function is passed as a parameter to the AddDeck component and will be used
	//by this component to store the new deck entered by the user. 
	//At the end the addKeys function is called on the new deck so that the keys can update.
	addDeck= newDeck=>{
		this.setState(prevState => ({
		deck: [...prevState.deck, newDeck]
		}))
	
		this.setState(prevState => ({deck: prevState.deck.map(this.addKeys)}))
	}
	
	//Similar to the addDeck function, this one is also passed as a parameter to the RenameDeck Component and used
	//by this component to store the changed deck and pass it back to the parent, i.e., the DeckList Component. 
	renameDeck = renamedDeck =>{
		this.setState(prevState => ({
			deck: prevState.deck.map ((adeck, index) =>
				index==renamedDeck.key?
				{...adeck, name: renamedDeck.name, key: renamedDeck.key}:adeck)
		}))
		
	}
	
	//Also this function works in a similiar fashion, it is passed to the DeleteDeck Component. 
	deleteDeck= index => {
		const withoutElement= this.state.deck.filter(thedeck => thedeck.key != index)
		
		
		this.setState({deck: withoutElement})
		this.setState(prevState => ({deck: prevState.deck.map(this.addKeys)}))
	}
	
	//this function is passed as a parameter to the Deck Component so that when a user enters a new card the orginal list
	//of deck is updated with the new card, so that when the user is in the app his stage is not lost. 
	updateDeck= newCards=>{
		
		this.setState(prevState=>({
			deck: prevState.deck.map((thedeck, index)=>
				index==newCards.key? 
				{...thedeck, cards:[...thedeck.cards, newCards]}:thedeck)
		}))
		
		
		
		
		this.setState(prevState => ({deck: prevState.deck.map(this.addKeys)}))
		
	}
	//this function works in a similar way, except that is called when a user deletes a card, then a new list of cards is passed
	//without the card the user has deleted. 
	updateAfterDelete=newCardList=>{
		
		this.setState(prevState=>({
			deck: prevState.deck.map((thedeck, index)=>
				index==newCardList.key? 
				{...thedeck, cards: newCardList.cardlist}:thedeck)
		}))
		
	}
	
	//function to assign keys to each element of the list
	//Note as a key we simply use the index in the list.
	addKeys = (val, index) => (
		{...val, key:index}
	)
	
	
	
	
	//render function 
	render () {
		
	//for each element in the deck, i.e., the list that contains all decks
	// we create a button with title the name of the deck and the key, 
	//which allows the user further on to delete a deck. 
	const allButtons = this.state.deck.map((deck,index) => {
		return(
			<Button 
				color='black'
				title ={this.state.deck[index].key+ '. ' + deck.name}
				onPress= {() => this.choseDeck(deck)}
				/>
		
		
		);
	});
		
	
	//this is used to assign keys later on to the buttons of the decklist. 
	const buttonlist= allButtons.map(this.addKeys)
	
	
	
	return (
	
	<View>
	{this.state.deleting?	//if user wants to delete a Deck 
		<View>
		<DeleteDeck onsubmit={this.deleteDeck}/>
		<View style={decklist.buttonextra}>
			<Button 
				color='black'
				title='Back to Deck List'
				onPress={()=>this.returnHome()}
			/>
		</View>
		
		</View> ://else not deleting
		
		<View> 
		{this.state.renaming? //if user wants to rename a deck 
			<View>
				<RenameDeck onsubmit={this.renameDeck}/>
				<View style={decklist.buttonextra}>
					<Button 
						color='black'
						title='Back to Deck List'
						onPress={()=> this.returnHome()}
					/>
				</View>
			</View>: //else not renaming 
		
			<View>
				{this.state.adding?//if the user wants to add a Deck 
					<View> 
						<AddDeck onsubmit={this.addDeck}/>
						<View style={decklist.buttonextra}>
							<Button 
								color='black'
								title='Back'
								onPress={()=> this.returnHome()}
							/>
						</View>
					</View>://else user does not want to add a deck 
						
					<View>
					{this.state.selected? //if a deck was selected
						<ScrollView >
							<Deck selectedDeck={this.state.theDeck} onsubmit={this.updateDeck} ondelete={this.updateAfterDelete}/>
							<View style={decklist.superextra}>
								<Button 
									color='black'
									title= 'Choose other Deck'
									onPress={()=> this.goBack()}
								/>
							</View>
					
						</ScrollView>://else not selected
						
					<View>
						<View style={decklist.mainTitle}>  
							<Text style={mainscreen.title}>
								Flashy Card
							</Text>
							<Text style={mainscreen.subtitle}>
								Learn by playing existing decks, or add some of your whish. 
							</Text>
						</View>
						
						<View style={decklist.mainButton}>
							<Text style= {mainscreen.subsubtitle}>List of choosable Decks:</Text>
							{buttonlist}
						</View>
						
						<View style={decklist.extra}>
							<Button 
								color='black'
								title='Add new deck'
								onPress= {() => this. addADeck()}
							
							/>
						</View>
						<View style={decklist.extra}> 
						
							<Button
								color='black'
								title='Rename Deck'
								onPress= {() => this.renameADeck()}
							
							/>
						</View>
						<View style={decklist.extra}> 
							<Button
								color='black'
								title='Delete Deck'
								onPress= {() => this.deleteADeck()}
							
							/>
						</View>
					</View>}
					
			</View>}
	</View>	}	
	</View>}	
</View>

				
		
		
		
	);
	}
}
//********************STYLING*************************//
const styles = StyleSheet.create({
  container: {
    flex: 1,
	padding: 5,
    backgroundColor: '#ffcccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const decklist = StyleSheet.create({
  main: {
	padding: 40,
    backgroundColor: '#ffcccc',
	borderWidth: 2, 
	borderColor:'white',
	marginTop:15,

  },
   extra: {
    backgroundColor: 'white',
	borderRadius: 10,
	marginTop:20,
	padding: 5,
	color:'white'
  },
  buttonextra: {
	backgroundColor: '#ff8080',
	borderRadius: 5,
	marginTop:5,
	padding: 0,
	color:'white'
	
  },
  superextra: {
	backgroundColor: '#ff8080',
	borderRadius: 5,
	marginTop:5,
	padding: 2,
	color:'white'
  },
  mainButton: {
	borderWidth:1,
	borderColor: 'white',
	justifyContent: 'center',
	alignItems: 'center',
  },
   mainTitle: {
	borderColor: 'white',
	justifyContent: 'center',
	alignItems: 'center',
  },
});
const mainscreen =StyleSheet.create({
	title: {
		fontSize:35,
		fontWeight:'bold',	
		color: 'white',
		marginBottom:15,
		
	},
	subtitle: {
		fontSize: 18,
		marginBottom:30,
		
	},
	subsubtitle: {
		fontSize:20,
		fontWeight:'bold',	
		color: 'white',
		marginBottom:15,
		
	},
});
