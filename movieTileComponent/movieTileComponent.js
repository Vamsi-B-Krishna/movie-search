import { LightningElement, api } from 'lwc';

export default class MovieTileComponent extends LightningElement {

    @api movie;
    @api selectedMovieId;

    get dynamicClass(){
        return this.selectedMovieId === this.movie.imdbID ? 'tile selected' : 'tile';
    }

    handleOnClick(event){
            const element = this.template.querySelector('.tile');
            //console.log('type is '+ typeof element);
            element.classList.toggle("selected");   
            this.dispatchEvent(new CustomEvent('selectedmovie',{detail:this.movie.imdbID}));
    }
}