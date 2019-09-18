import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";
import {TokenStorage} from "../../core/token.storage";
import {Component} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table"; // this is where the data comes from
import * as tableData from "./product-data-table";
import {ProductService} from "../service/product.service";
@Component({
  templateUrl: './product.component.html'
})
export class ProductComponent {
constructor(private router: Router, private authService: AuthService, private productService: ProductService, private token: TokenStorage, private route: ActivatedRoute) {}
settings = tableData.settings;
  source = new LocalDataSource(); // this is the table data that we will fill with data from the api server

  // this holds a list of messages to alert the user of something on a page (wrong password, validation issues, etc.)
  messageList: string;
  errorMessageDisplay: string;

  ngOnInit(): void {

    this.loadTableData();

    this.source.onUpdated().subscribe( item => {
      this.productService.editObject(item).subscribe(data => {
        console.log("GOT DATA BACK FROM EDIT"+data);
        this.loadTableData(); // load the table data from server
      });
      }
    );

    this.source.onAdded().subscribe( item => {
        this.productService.editObject(item).subscribe(data => {
          console.log("GOT DATA BACK FROM ADD"+data);
          this.loadTableData();
        });
      }
    );

    this.source.onRemoved().subscribe( item => {
        this.productService.deleteObject(item).subscribe(data => {
          console.log("GOT DATA BACK FROM DELETE"+data);
          this.loadTableData(); // load the table data from server
        });
      }
    );


    // subscribe to route parameters
    this.route.queryParams.subscribe(queryParams => {
      this.messageList = queryParams['messageList'];
      console.log(queryParams['messageList']);
      // only check for errors if this list has something in it
      if(this.messageList != null){
        this.checkForErrors()
      }
    });
    console.log('Init ProductComponent');
  }

  // this should be depreciated and we should use the build in error module that comes with this app
  checkForErrors(){
    console.log('Check for errors coming back from backend api server');
    console.log(this.messageList);
    this.messageList = this.messageList.replace(/[\[\]"]+/g, ''); // get rid of any quotes from the backend server to make msg look nice on ui
    this.errorMessageDisplay = this.messageList;
  }

  loadTableData(){
    this.productService.getAll().subscribe( arrayofdata => {
        console.log("Items from server: "+arrayofdata);
        this.source.load(arrayofdata); // bind the server data into the table source data
      }
    );
  }

}
// define the data structure coming back from the api server
export class Product {
  product_id: number;
  product_type_id: number;
  name: string;
  description: string;
  barcode: string;
  price: string;
}
