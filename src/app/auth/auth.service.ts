import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./model/user.model";
import { authFeatureKey } from "./reducers";




@Injectable()
export class AuthService {

    constructor(private http:HttpClient) {

    }

    login(email:string, password:string): Observable<User> {
        return this.http.post<User>('/api/login', {email,password});
    }

    getUserProfileFromStorage(){
        return JSON.parse(localStorage.getItem(authFeatureKey)) as User || undefined;
    }

    setUserProfileToStorage(user:User){
        return localStorage.setItem(authFeatureKey, JSON.stringify(user))
    }

    removeUserProfileFromStorage(){
        localStorage.removeItem(authFeatureKey);
    }



}
