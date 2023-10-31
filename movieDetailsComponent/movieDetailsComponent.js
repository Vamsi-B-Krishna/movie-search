import { LightningElement, wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import MOVIESEARCH from '@salesforce/messageChannel/movieSearch__c';

export default class MovieDetailsComponent extends LightningElement {

    subscription;
    imdbId;
    movieDetails = {};
    loadComponent = false;
    @wire(MessageContext) messageContext;
    
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
        console.log('disconnected callback is called.')
    }
    

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                MOVIESEARCH,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    handleMessage(message) {
        if(message.imdbId != this.imdbId){
            this.imdbId = message.imdbId;
            this.searchMovie();
        }else if(message.imdbId === this.imdbId){
            this.loadComponent = false;
            this.imdbId = '';
        }
        
        
    }
    async searchMovie(){
        let url = `https://www.omdbapi.com/?i=${this.imdbId}&plot=full&apikey=8457d998`;
        let response = await fetch(url);
        let data = await response.json();
        console.log('data result is ', data);
        if(data.Response === 'True'){
            this.movieDetails = data;
            this.loadComponent = true;
        }
        
    }
    
}