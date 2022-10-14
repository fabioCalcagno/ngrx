import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AppState } from '../reducers';
import { CoursesActions } from './action-types';
import { areCoursesLoaded } from './courses.selectors';



@Injectable()
export class CoursesResolver implements Resolve<any>{

    private loading=false;

    constructor(private store:Store<AppState>){ }
   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        return this.store.pipe(
            select(areCoursesLoaded),
            tap((coursesLoaded)=>{
                if(!this.loading && !coursesLoaded){
                    this.loading=true;
                    this.store.dispatch(CoursesActions.loadAllCourses())
                }
            }),
            filter(coursesLoaded=>coursesLoaded), // somente retorna o observable quando a flag coursesLoaded for true
            first(),
            finalize(()=> this.loading=false)
        )
    }

}