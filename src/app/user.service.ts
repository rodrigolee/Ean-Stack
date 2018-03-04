import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    constructor(private http:HttpClient) {
    }
    getUsers() {
      return this.http.get('/api/users');
    }

    // send a POST request to the API to create a new data object
    createUser(user) {
        let body = JSON.stringify(user);
        return this.http.post('/api/users/', body, httpOptions);
    }

    // send a PUT request to the API to update a data object
    updateUser(user) {
        let body = JSON.stringify(user);
        return this.http.put('/api/users/' + user.id, body, httpOptions);
    }

    // send a DELETE request to the API to delete a data object
    deleteUser(user) {
        return this.http.delete('/api/users/' + user.id);
    }

}
