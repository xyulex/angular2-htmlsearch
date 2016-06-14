import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {SearchPipe} from './filter.search';
import 'rxjs/add/operator/map';

@Component({
    selector: 'searchBox',
    pipes: [SearchPipe],
    template: `
        <h1>Search input</h1>
        <input type="text" placeholder="Text to search" id="searchInput" #searchInput>
        <button (click)="changeSearch()">Search</button>
        <p>{{ searchInput.value }}</p>       
        <div class="searchResults" *ngIf="initialized">	
        	<ul>
        		<li *ngFor="#data of datas | filterSearch:{ sourceCode: searchTerm }"><a href="{{ data.url }}" target="_blank">{{ data.ocurrenceTitle }}</a></li>
        	</ul>
        </div>
        `
})

export class AppComponent {
	initialized = false;
	jsonFile	= 'file.json';
	
    constructor(private http: Http) {  
    	http.get(this.jsonFile)
    		.map(res => res.json())
    		.subscribe( datas => this.datas = datas,
    					err   => this.createJSON(),
    					()    => this.initialized = true;
    				);
   	}       		

   	changeSearch() {
   		let searchTerm;
   		this.searchTerm = searchTerm = document.getElementById('searchInput').value;;
   		return searchTerm;
   	}

   	createJSON() {
   		console.log('Not found, creating JSON');
   	}
}