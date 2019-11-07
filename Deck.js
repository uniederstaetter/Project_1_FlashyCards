import React from 'react';
import {StyleSheet, Text, View,ScrollView, Button } from 'react-native';
import AddCard from './AddCard'
import DeleteCard from './DeleteCard'

//initialises the cards in the deck, by assining front, back, time and key properties. 
//the time is set initally to 0 and will be set further using the app
//as a key we use simply the index of the list
const addTimeToCards = cards => cards.map((card,index) =>{
		return (
			{
			front: card.front, 
			back: card.back, 
			time: 0,
			key: index
			}
			);
	}
	)

//this component is used to render all things neccessary to show the cards,
//mainly the front and the back side of each card. 
export default class Deck extends React.Component {
	
	state ={
		cardsinDeck: addTimeToCards(this.props.selectedDeck.cards), 
		index:0, 
		toggle: false, //false==front; true=back
		rights:[],
		wrongs:[],
		remaining: addTimeToCards(this.props.selectedDeck.cards),
		counter:0, 
		timer: false,
		addcard: false,
		deletecard:false,
	
		
	}
	//starts the timer used to determined the time to user has spent on guessing. 
	startTimer =() =>{
		this.setState({timer: true})
		 
		 this.timer=setInterval(() => {
			this.setState(previousState=> ({counter: previousState.counter +1}));
			}, 1000);
	}
	
	//stops the timer, when the user clicks on the see Answer Button, 
	//the counted time then is used to sort the answers inside the lists.
	stopTimer=() =>{
	 this.setState ({timer: false})
	 clearInterval(this.timer)
	}
	
	//timer is resetted when the user clicks on right or wrong answers
	//then at this time the time used to think, will be stored as a property in the card list
	//which is later on used to sort the list accordingly.
	resetTimer=()=>{
		this.setState ({timer: false})
		clearInterval(this.timer)
		this.setState({counter:0})
	}
	
	//function is called when the user clicks on the see answer button
	//it sets the toggle to true, which causes the card to flip, i.e., the back of 
	//the card is shown. 
	//additionally, it adds the time needed to think to the time property of the card list. 
	seeBack =() => {
		this.setState({toggle: true})
		this.stopTimer()
		this.setState (prevState => ({
			cardsinDeck: prevState.cardsinDeck.map ((acard, index) =>
				index===this.state.index?
					{...acard, time: this.state.counter}: acard)
									
			
			}))
			
	}
	
	//function is called when the user clicks on the wrong button, hence he guessed the answer wrong. 
	//the function increases the index, hence the next card can be shown, it resets the view to the front
	//side of the card, and adds the card to the wrong list of cards. 
	//lastly it resets the timer and starts it, for the next set of cards. 
	//Note also that on each click of wrong the remaining cards are updated, without the card the user has clicked to be answered wrongly. 
	nextCardWrong = wrongCard => {
		
		if(this.state.index== this.state.cardsinDeck){
			this.startOver()
		}else {
		
		
		this.setState (prevState => ({index: prevState.index +1}))
		this.setState ({toggle: false})
		this.setState (prevState => ({
			wrongs:[...prevState.wrongs, wrongCard]
		}))
		
		this.setState(prevState => ({
			remaining: prevState.remaining.filter(thecard => thecard.key != wrongCard.key)
		}))
		
		
		this.resetTimer()
		this.startTimer()

		}
	}
	//same as for nextCardWrong except that it adds the card to the right list of cards. 
	//Note also that on each click of right the remaining cards are updated, without the card the user has clicked to be answered correctly. 
	nextCardRight = rightCard => {
		
		if(this.state.index== this.state.cardsinDeck){
			this.startOver()
		}else {
		
		this.setState (prevState => ({index: prevState.index +1}))
		this.setState ({toggle: false})
		
		this.setState (prevState => ({
			rights:[...prevState.rights, rightCard]
		}))
		
		this.setState(prevState => ({
			remaining: prevState.remaining.filter(thecard => thecard.key != rightCard.key)
		}))
		
		this.resetTimer()
		this.startTimer()
		}
		
	}
	
	//this function is called, when the user has seen all cards once, then 
	//it starts automatically again, if the user does not click on the 
	//choose other deck button. 
	//the function sorts the wrong list and the right list of cards respectively 
	//and then it creates a new array of the kind: [wrongs, rights] and
	//sets the inital state array to the sorted one and restarts the game by
	//resetting the index to 0. 
	startOver=()=>{
		
		//sort the two arrays then merge!
		this.state.wrongs.sort(function(a,b){
			return  (b.time) - (a.time) ;
		})
		
		this.state.rights.sort(function(a,b){
			return (b.time) - (a.time);
		})
		
		const newCards= [...this.state.wrongs,...this.state.rights]
	
		this.setState({
			cardsinDeck: newCards
		})
		this.setState({
			remaining: newCards
		})
		
		this.setState({index: 0})
		this.setState({wrongs: []})
		this.setState({rights:[]})
		
		console.log(newCards)
	
	}
	//this function is called when the user clicks at any point in time on the start again button
	//it will as in the startOver function to sort the right and wrong cards
	//but additionally it includes the remaining cards which are initally the whole deck. 
	//after the cards are updated the remaining are reset to the initial cardsindeck, because at that point no card has been clicked
	//right or wrong, thats why all are remaining. 
	//It also resets the timer and starts it again. 
	startAgain=()=>{
		
		//reset all the other
		this.state.wrongs.sort(function(a,b){
			return  (b.time) - (a.time) ;
		})
		
		this.state.rights.sort(function(a,b){
			return (b.time) - (a.time);
		})
		
		const newOrder= [...this.state.wrongs, ...this.state.remaining,...this.state.rights]
		
		this.setState({
			cardsinDeck: newOrder
		})
		
		this.setState({index: 0})
		this.setState({wrongs: []})
		this.setState({rights:[]})
		
		this.setState({remaining: this.state.cardsinDeck})
		this.stopTimer()
		this.resetTimer()
		this.startTimer()
		
		
	}
	
	//sets the state of addcard to true, so that the user is redirected to the
	//screen of adding a card to the current active deck
	addACard=()=>{
		this.setState({addcard:true})
	}
	
	//sets the state of deletecard to true, so that the user is redirected to the 
	//screen of deleting a card of the current active deck
	deleteACard=()=>{
		this.setState({deletecard:true})
	}
	
	//this function is used either for the add card screen and for the delete screen
	//it sets both state-values to the inital one.
	//note here that both are set, since they are never used together, done because of convinience. 
	backtoQuiz=()=>{
		this.setState({addcard:false})
		this.setState({deletecard:false})
	}
	
	//this function is given as a parameter to the AddCard Component and which is 
	// used to add a new card to the list of cards and resets the keys when done so. 
	//Additionally, we need to add the new card also to the remaining list, in case the user wants to restart
	addCard= newCard=>{
		this.setState(prevState =>({
			cardsinDeck: [...prevState.cardsinDeck, newCard]
		}))
		const newCardAdded= [...this.state.cardsinDeck, newCard]
		
	
		this.setState(prevState =>({
			remaining: [...prevState.remaining, newCard]
		}))
		
		this.setState(prevState => ({cardsinDeck: prevState.cardsinDeck.map(this.addKeys)}))
		
		this.props.onsubmit({front: newCard.front,back:newCard.back, key: this.props.selectedDeck.key})
		
	}
	
	//adds keys to a list
	addKeys = (val, index) => (
		{...val, key:index}
	)
	
	//this function is given as a parameter to the DeleteCard Component and which is 
	// used to delete a card of the list of cards and resets the keys when done so.
	//note also, that when a card is deleted we need to delete it also from the remaining
	//deck of cards, so in case the user clicks on start again, the card is not there 
	//And we need to that also for the rights and wrongs list needed if the user wants to restart.
	deleteCard= index => {
		let withoutElement= this.state.cardsinDeck.filter(thedeck => thedeck.key != index)
		
		if(withoutElement.length===0){
			withoutElement=[{front:'This is the default Card', back:'Default back ', time: 0 ,key: 0}]
		}
		
		this.setState({cardsinDeck: withoutElement})
		
		const withoutinRemain= this.state.remaining.filter(thedeck => thedeck.key != index)
		
		
		this.setState({remaining: withoutinRemain})
		
		const withoutRights= this.state.rights.filter(thedeck => thedeck.key != index)
		
		const withoutWrongs= this.state.wrongs.filter(thedeck => thedeck.key != index)
		
		this.setState({rights: withoutRights})
		
		this.setState({wrongs: withoutWrongs})
		
			
		const resetTime = cards => cards.map((card,index)=>{
			return (
			{
				front: card.front, 
				back: card.back, 
				time: 0,
				key: index
			}
			);
		}
		)
		
		const newList= resetTime(withoutElement)
		
		
		this.props.ondelete({cardlist:newList, key: this.props.selectedDeck.key} )
		
		this.setState(prevState => ({deck: prevState.cardsinDeck.map(this.addKeys)}))
	}
	 
	 //this function is called when the Component is mounted initally, which 
	 //causes the timer to start. 
	componentDidMount() {
		this.startTimer()
	}
	//when the user exists the game unexpected, the timer will be stopped
	componentWillUnmount() {
		this.stopTimer()
		this.resetTimer()
	}
	
	render(){

	//creates the card by its front side, and additionally shows the number of the card
	//which is used to help the user in deleteing a card
	const frontDiv=() => {
		if(this.state.index==this.state.cardsinDeck.length){
			this.startOver()
		}
		else {
			return (
			
				<View style={cardStyle.list}>
					<Text style ={cardStyle.card}>
						{this.state.cardsinDeck[this.state.index].key}.{"\n"}
						{this.state.cardsinDeck[this.state.index].front}
					</Text>
				</View>
		
			);
		}
	}

	//creates card by its back side. 
	const backDiv=() => {
		if(this.state.index==this.state.cardsinDeck.length){
			this.startOver()
		}
		else {
			return (
				<View style={cardStyle.list}>
					<Text style ={cardStyle.card}>
					{this.state.cardsinDeck[this.state.index].back}
					</Text>
				</View>
		
			);
		}
	};
	
		return (
		
		<View>
		{this.state.deletecard? //if user wants to delete a card
			<View>
				<DeleteCard onsubmit={this.deleteCard} />
				<View style={cardStyle.extra}>
					<Button
						color='black'
						title='Back to Quiz'
						onPress={() =>this.backtoQuiz()}
					/>
				</View>
			</View> : //else we dont want to delete a card
		
			<View> 
				{this.state.addcard? //if user wants to add a card following is shown 
					<View> 
						<AddCard onsubmit= {this.addCard} />
						<View style={cardStyle.extra}>
							<Button 
								color='black'
								title='Back to Quiz'
								onPress={()=> this.backtoQuiz()}
							/>
						</View>
					</View>: //else user does not want to add a card
					
					<View>
					{!this.state.toggle? //if we want to see the front of the card
						<View>
							{frontDiv()}
							<View style={cardStyle.answerButton}>
								<Button
									color='black'
									title='Flip the Card'
									onPress={this.seeBack}
								/>
							</View>

						</View>://else we want to flip the card, hence see the back of the card
				
						<View>
							{backDiv()}
							<View style={cardStyle.rightsWrongs}>
								<Button 
									color='green'
									title='right'
									onPress={() => this.nextCardRight(this.state.cardsinDeck[this.state.index])}
								/>
							</View>
							<View style={cardStyle.rightsWrongs}>
								<Button 
									color='red'
									title='wrong'
									onPress={() => this.nextCardWrong(this.state.cardsinDeck[this.state.index])}
								/>
							</View>
						</View>}
				<View style={cardStyle.buttons}>
				
				<View style={cardStyle.extra}>
					<Button 
						color='black'
						title='Start again' 
						onPress={()=> this.startAgain()}
					/>
				</View>
				
				<View style={cardStyle.extra}>
					<Button 
						color='black'
						title='Add a Card' 
						onPress={()=> this.addACard()}
					/>
				</View>
				
				<View style={cardStyle.extra}>
					<Button
						color='black'
						title='Delete a Card' 
						onPress={()=> this.deleteACard()}
					/>
				</View>
				
				</View>
			</View>}
		</View>}
	</View>
	
		);
		
	}
	
	
}
//********************STYLING*************************//
const cardStyle =StyleSheet.create({
	extra: {
		backgroundColor: '#ff8080',
		borderRadius: 5,
		marginTop:5,
		padding: 0,
		color:'white'
	},
	div: {
		color: 'red',
	},
	answerButton: {
		borderWidth: 2, 
		backgroundColor:'white',
		borderColor:'white',
		borderRadius:10,
		padding:5,
	},
	buttons: {
		marginTop:50,
	},
	list: {
		fontSize:25,
		padding:5,
		alignItems: 'center',
		fontWeight:'bold',
		justifyContent: 'center',
		marginTop:50,
		marginBottom:100,
	},
	extraButton: {
		margin:5,
		fontSize:25,
		fontWeight:'bold',
		backgroundColor:'red'
	},
	card:{
		fontSize:25, 
		fontWeight:'bold',
		marginTop:30,
		marginBottom:20,
		borderWidth:4,
		padding: 30,
		color: 'red',
		borderColor:'white',
	},
	rightsWrongs :{
		backgroundColor: 'white',
		borderRadius: 10,
		marginTop:10,
		padding: 5,

	},
});
const buttonStyle= StyleSheet.create ({
	right: {
		backgroundColor: 'red',
	},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
	padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});