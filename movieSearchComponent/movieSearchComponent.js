import { LightningElement, track, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import MOVIESEARCH from '@salesforce/messageChannel/movieSearch__c';

export default class MovieSearchComponent extends LightningElement {
    selectedSearch = '';
    selectedType = ' ';
    selectedMovieId = '';
    showErrorMessage = false;
    displaySearchResult = false;
    @track searchResult = [];
    @wire(MessageContext)messageContext;

    get options() {
        return [
            { label: 'None', value: '' },
            { label: 'Movie', value: 'movie' },
            { label: 'Series', value: 'series' },
            { label: 'Episode', value: 'episode' }
        ];
    }
    

    handleOnChange(event){
        let {name, value} = event.target;
        if(name === 'movieName'){
            this.selectedSearch = value;
        }
        else if(name === 'type'){
            this.selectedType = value;
        }
    }

    handleOnClick(){
        if(this.selectedSearch){
            this.searchMovie();
        }
    }

    async searchMovie(){
        let url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&apikey=8457d998`;
        let response = await fetch(url);
        let data = await response.json();
        console.log('data result is ', data);
        if(data.Response === 'True'){
            this.searchResult = data.Search;
            this.showErrorMessage = false;
            this.displaySearchResult = true;
        }else if(data.Response === 'False'){
            this.displaySearchResult = false;
            this.showErrorMessage = true;
        }      
    }
    handleSelectedMovie(event){
        this.selectedMovieId = event.detail;
        const payload = { imdbId: this.selectedMovieId };
        publish(this.messageContext, MOVIESEARCH, payload);
        console.log('data is sent');     
    }
}