import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.serveice";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;

    isAuth = false;
    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

    ngOnInit() {
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuth = !!user;
      });
    }

    onSaveData() {
      this.dataStorageService.storeRecipes();
    }

    onFetchData() {
      this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy() {
      this.userSub.unsubscribe();
    }

}
