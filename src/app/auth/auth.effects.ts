import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {

    logIn$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(AuthActions.loginAction),
            tap( action => this.authService.setUserProfileToStorage(action.user) )
        )
    },{dispatch:false});

    logOut$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(AuthActions.logoutAction),
            tap(action => {
                this.authService.removeUserProfileFromStorage();
                this.router.navigateByUrl('/login');
            })
        );
    },{dispatch:false});

    constructor( private action$:Actions,
                 private authService:AuthService,
                 private router:Router ){ }

}