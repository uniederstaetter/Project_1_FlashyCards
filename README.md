# Project_1_FlashyCards
This includes all components for the Project 1 Flashy Cards of Ulrike Niederstätter


The Application works as follows: 
We have the main component app.js which uses the next Component DeckList.js. 
The DeckList Component initializes the main screen of the app and displays all current available Decks. Furthermore, it uses the 
RenameDeck, AddDeck and DeleteDeck Component to rename a deck, to add a deck and to delete a deck. But, its main duty is to call the next Component which is the Deck Component. 


The Deck Component displays and renders all information of a Deck. That is mainly the cards inside the deck. It starts by showing the first card in 
the deck by its front side, in the background a timer starts when the Component is mounted. This time is later on than used to calculate the 
index of the card in the next round. When the user thinks that he is ready to answer the question, he can click on the flip card- button, which will show the back of the card and stop the timer in the background. Now, the user has the possibility to click right or wrong, i.e., if he has guessed the answer correctly or not respectively. On click of right or wrong, the card is placed in a temporary array depending on the answer, i.e., if the user has clicked right, the card will be placed in the rights list. When the user has seen each card in the original list once, the decks restarts but the cards are in a different order. The order is determined by the time the user has taken to answer. For that both list, rights and wrongs, are sorted in descending order by the time and then the original list is reset in follwing order [wrongs, rights] then, the game starts agian. 

Note also, that the user is able to restart the deck, or chose anothter deck at any time. If the user whishes to restart again, the application will again sorts the rights and wrongs, depending if the user has already some and construct the original list again in the following way: 
[wrongs, remaining, rights]. While playing, the user is also able to add a card or delete a card, simply by entering the number of the card, which is displayed for any card's front side. 

Please notice here, that when a user adds a card, we need to add it additionally in the remaining list and regarding deleting of a card, we need to make sure to delete the card from the rights, wrongs and remaining list, otherwise the card would not be deleted if the user starst over again or decides to start again.


Note also, the same principle holds for deleting and renaming a deck of the DeckList Component. 
For deleting and adding a Card following Components are used: AddCard and DeleteCard respectively. 
Additionally, please note, that on adding a new Deck a Default Card is created. And also, if the user deletes a Card in a Deck that has only
this single card, a default card is added to that Deck. So, at each point in time, a Deck has at least 1 Card. 

//To run the application download the zip and copy the files in a folder that was created by expo. Because the Application will not
run without the node_modules folder, which is not possible to submit on GitHub

