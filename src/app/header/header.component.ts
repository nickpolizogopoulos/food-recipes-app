import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated:boolean = false;
    private userSubscription:Subscription;

    constructor(
        // private dataStorageService:DataStorageService,
        private authService:AuthService,
    ) { }

    ngOnInit():void {
        this.userSubscription = this.authService.user.subscribe(
            user => this.isAuthenticated = !!user,
        )
    }

    // onSaveData():void {
    //     this.dataStorageService.storeRecipes()
    // }

    // onFetchData():void {
    //     this.dataStorageService
    //         .fetchRecipes()
    //         .subscribe()
    // }

    onLogout():void {
        this.authService.logout()
    }

    ngOnDestroy():void {
        this.userSubscription.unsubscribe()
    }
    
}
