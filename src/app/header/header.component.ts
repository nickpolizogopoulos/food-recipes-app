import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    template: `
    
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a routerLink="" class="navbar-brand">Recipe Book</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li *ngIf="isAuthenticated" routerLinkActive="active"><a routerLink="/recipes">Recipes</a></li>
                        <li *ngIf="!isAuthenticated" routerLinkActive="active"><a routerLink="/auth">Login</a></li>
                        <li *ngIf="isAuthenticated" routerLinkActive="active"><a routerLink="/shopping-list">Shopping List</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <!-- <li *ngIf="isAuthenticated" appDropdown class="dropdown">
                        <a class="dropdown-toggle" role="button">Manage <span class="caret"></span></a>
                        <ul class="dropdown-menu cursor-pointer">
                        <li><a (click)="onSaveData()">Save Data</a></li>
                        <li><a (click)="onFetchData()">Fetch Data</a></li>
                        </ul>
                        </li> -->
                        <li *ngIf="isAuthenticated">
                            <a (click)="onLogout()" class="cursor-pointer">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    
    `
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated: boolean = false;
    private userSubscription: Subscription;

    constructor(
        // private dataStorageService:DataStorageService,
        private authService:AuthService,
    ) { }

    ngOnInit(): void {
        this.userSubscription = this.authService.user
            .subscribe({
                next: user => this.isAuthenticated = !!user
            });
    }

    // onSaveData():void {
    //     this.dataStorageService.storeRecipes()
    // }

    // onFetchData():void {
    //     this.dataStorageService
    //         .fetchRecipes()
    //         .subscribe()
    // }

    onLogout(): void {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
    
}
