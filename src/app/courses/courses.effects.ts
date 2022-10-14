import { allCoursesLoaded } from './courses.action';
import { concatMap, map } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { CoursesActions } from './action-types';
import { CoursesHttpService } from './services/courses-http.service';


@Injectable()
export class CoursesEffect{

    loadCourses$ = createEffect(
        ()=> this.action$.pipe(
                ofType(CoursesActions.loadAllCourses),
                concatMap(_action=> this.coursesHttpService.findAllCourses()),
                map(courses=> CoursesActions.allCoursesLoaded({courses}))
            )
    )

    updateCourses = createEffect(
        ()=> this.action$.pipe(
            ofType(CoursesActions.courseUpdated),
            concatMap(action=> this.coursesHttpService.saveCourse(action.update.id, action.update.changes))

        ),
        {dispatch:false}
    )


    constructor(private action$:Actions,
        private coursesHttpService:CoursesHttpService){

    }
}