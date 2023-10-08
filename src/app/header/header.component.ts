import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";

@Component({
  selector: 'vue-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;

  isAuthenticated: boolean = false;

  authSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
