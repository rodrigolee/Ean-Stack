import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

    constructor(private http:HttpClient) {
    }
    getProducts(){
      return this.http.get('/api/products');
    }
  
    createProduct(product) {
        let body = JSON.stringify(product);
        return this.http.post('/api/products/', body, httpOptions);
    }

    updateProduct(product) {
        let body = JSON.stringify(product);
        return this.http.put('/api/products/' + product.id, body, httpOptions);
    }

    deleteProduct(product) {
        return this.http.delete('/api/products/' + product.id);
    }

}
