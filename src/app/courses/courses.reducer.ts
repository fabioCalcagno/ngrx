
import { compareCourses, Course } from './model/course';
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CoursesActions } from './action-types';


export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course>{
  isAllCoursesLoaded:boolean
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: course=> course.id
})

export const initialCoursesState = adapter.getInitialState(
  {
    isAllCoursesLoaded:false
  }
);

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.allCoursesLoaded, (state, action)=>{
    return adapter.addMany(action.courses, {...state, isAllCoursesLoaded:true});
  }),
  on(CoursesActions.courseUpdated, (state, action)=>
    adapter.updateOne(action.update, state)
  )
)

export const {selectAll} = adapter.getSelectors()
