import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'vue-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  @ViewChild(PlaceholderDirective, { static: true }) alertHost: PlaceholderDirective;

  closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private cfr: ComponentFactoryResolver) {
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signup(form.value.email, form.value.password)
    }

    this.error = '';

    authObs.subscribe(x => {
      console.log(x);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorRes => {
      this.error = errorRes;
      this.isLoading = false;
      this.showErrorAlert(errorRes);
    });

    form.reset();
  }

  onHandleError() {
    this.error = '';
  }

  showErrorAlert(message: string) {
    let alertCmpFactory = this.cfr.resolveComponentFactory(AlertComponent);
    let alertHostRef = this.alertHost.vcRef;
    alertHostRef.clear();
    let componentRef = alertHostRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(_ => {
      this.closeSub.unsubscribe();
      alertHostRef.clear();
    });
  }
}
