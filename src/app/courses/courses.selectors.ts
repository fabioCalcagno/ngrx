import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState, selectAll } from './courses.reducer';



export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectAllCourses = createSelector(
    selectCoursesState,
    selectAll
)

export const selectBeginnersCourses = createSelector(
    selectAllCourses,
    courses=> courses.filter(course=> course.category == "BEGINNER")
)

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses=> courses.filter(course=> course.category == "ADVANCED")
)

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses=> courses.filter(course=> course.promo).length
)

export const areCoursesLoaded = createSelector(
    selectCoursesState,
    state=> state.isAllCoursesLoaded
)
