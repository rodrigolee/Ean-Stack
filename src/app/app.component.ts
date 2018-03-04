import { Component } from '@angular/core';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    public product;
    public users;
  
    public product_name;
  
    constructor(private _userService: UserService, private _productService: ProductService) { }
  
    ngOnInit() {
      this.getUsers();
      this.getProducts();
    }
  
    getProducts() {
      this._productService.getProducts().subscribe(
        // the first argument is a function which runs on success
        data => { this.product = data},
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => console.log('done loading foods')
      );
    }
    createProduct(name) {
      let product = {name: name};
      this._productService.createProduct(product).subscribe(
         data => {
           // refresh the list
           this.getProducts();
           return true;
         },
         error => {
           console.error("Error saving product!");
           return Observable.throw(error);
         }
      );
    }
    updateProduct(product) {
      this._productService.updateProduct(product).subscribe(
         data => {
           // refresh the list
           this.getProducts();
           return true;
         },
         error => {
           console.error("Error saving product!");
           return Observable.throw(error);
         }
      );
    }
  
    deleteProduct(product) {
      if (confirm("Are you sure you want to delete " + product.name + "?")) {
        this._productService.deleteProduct(product).subscribe(
           data => {
             // refresh the list
             this.getProducts();
             return true;
           },
           error => {
             console.error("Error deleting product!");
             return Observable.throw(error);
           }
        );
      }
    }
  
    getUsers() {
      this._userService.getUsers().subscribe(
        // the first argument is a function which runs on success
        data => { this.users = data},
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => console.log('done loading products')
      );
    }
  
    createUser(name, email, work, city, address, dob) {
      let user = {name: name, email: email, work: work, city: city, address: address, dob: dob};
      this._userService.createUser(user).subscribe(
         data => {
           // refresh the list
           this.getUsers();
           return true;
         },
         error => {
           console.error("Error saving user!");
           return Observable.throw(error);
         }
      );
    }
  
    updateUser(user) {
      this._userService.updateUser(user).subscribe(
         data => {
           // refresh the list
           this.getUsers();
           return true;
         },
         error => {
           console.error("Error saving user!");
           return Observable.throw(error);
         }
      );
    }
  
    deleteUser(user) {
      if (confirm("Are you sure you want to delete " + user.name + "?")) {
        this._userService.deleteUser(user).subscribe(
           data => {
             // refresh the list
             this.getUsers();
             return true;
           },
           error => {
             console.error("Error deleting food!");
             return Observable.throw(error);
           }
        );
      }
    }
  }
  