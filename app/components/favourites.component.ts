import 'reflect-metadata';
import { Component, OnInit, AfterViewInit } from "angular2/core";
import { Router } from "angular2/router";
import { PoundPipe } from "../pipes/pound-pipe";
import { Listing } from "../models/listing";
import { FavouritesModel } from "../models/favourites-model";
 
@Component({
    selector: "favourites",
    templateUrl: "views/favourites.xml",
    pipes: [PoundPipe]
})
export class FavouritesComponent implements OnInit, AfterViewInit {
    
    public favourites: Array<Listing> = [];
    
    constructor(private _favouritesModel: FavouritesModel, private _router: Router) {
        
        console.log("FavouritesComponent constructor");
    }

    ngOnInit() {
        console.log("FavouritesComponent onInit");
        this._favouritesModel.favourites$.subscribe(favourites => this.resetFavourites(favourites));
        this._favouritesModel.get();
        //this.favourites = this._favouritesService.getFavourites();
    }
    
    private resetFavourites(favs: Array<Listing>) {
        console.log("In resetFavourites");
        console.log(JSON.stringify(favs));
        this.favourites = [];
        favs.forEach(listing => this.favourites.push(listing));
        console.log(JSON.stringify(this.favourites));
    }
    
    ngAfterViewInit() {
        console.log("FavouritesComponent afterViewInit");
    }
    
    displayDetails(listing: Listing) {
        this._router.navigate(["Details", {guid: listing.guid, fromFavs: true}]);
    }
}