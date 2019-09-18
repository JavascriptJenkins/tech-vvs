import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {PaypalModel} from './paypal.model';
import {PaypalService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  displayedColumns = ['id', 'username', 'salary', 'age'];
  dataSource = new MatTableDataSource<PaypalModel>();
  constructor(private router: Router, private paypalService: PaypalService) {
  }

  myForm = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" id="formid">\n' +
//   myForm = '<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" id="formid">\n' +
    '  <input type="hidden" name="cmd" value="_cart">\n' +
    '  <input type="hidden" name="tx" value="transactionID">\n' +
    '  <input type="hidden" name="at" value="123412341234">\n' +
    '  <input type="hidden" name="upload" value="1">\n' +
    '  <input type="hidden" name="business" value="mcmahonworks@gmail.com">\n' +
    '  <!--<span data-ng-repeat="item in cartItems track by $index">-->\n' +
    '\t\t<!--<input type="hidden" name="item_name_{{$index + 1}}" value="{{item.name}} {{item.selectedVolume.volumeUnit}} ">-->\n' +
    '\t\t<!--<input type="hidden" name="item_number_{{$index + 1}}" value="{{item.productId}}">-->\n' +
    '\t\t<!--<input type="hidden" name="quantity_{{$index + 1}}" value="{{item.qty}}">-->\n' +
    '\t\t<!--<input type="hidden" name="amount_{{$index + 1}}" value="{{item.selectedVolume.price}}">-->\n' +
    '\t\t<!--<input type="hidden" name="shipping_{{$index + 1}}" value=".50">-->\n' +
    '\t<!--</span>-->\n' +
    '\n' +
    '    <input type="hidden" name="item_number" value="Item1">\n' +
    '    <input type="hidden" name="item_name_1" value="Item Name 1">\n' +
    '    <input type="hidden" name="item_number_1" value="Item Number 1">\n' +
    '    <input type="hidden" name="amount_1" value="1.00">\n' +
    '    <input type="hidden" name="shipping_1" value=".50">\n' +
    '    <input type="hidden" name="item_name_2" value="Item Name 2">\n' +
    '    <input type="hidden" name="item_number_2" value="Item Number 2">\n' +
    '    <input type="hidden" name="amount_2" value=".25">\n' +
    '    <input type="hidden" name="shipping_2" value=".25">\n' +
    '\n' +
    '  <input type="hidden" name="return" value="http://localhost:80/Code/WebContent/templates/paypal.html?orderId=SADGSAD"> <!-- WHEN THEY ARE DONE -->\n' +
    '  <input type="hidden" name="cancel_return" value="http://localhost:80/Code/WebContent/templates/paypal.html?orderId=CSADASF"> <!-- CANCEL  -->\n' +
    '  <input type="hidden" name="notify_url" value="website.com/ipn/ipn.php">  <!-- AFTER ORDER IS CONFIRMED -->\n' +
    // '  <input type="hidden" name="email" value="emailofthebuyer@gmail.com"> <!-- EMAIL OF THE BUYER -->\n' +
    '  <input type="hidden" name="first_name" value="peter">\n' +
    '  <input type="hidden" name="last_name" value="mcmahon">\n' +
    '  <input type="hidden" name="address1" value="234 fsdf rd ">\n' +
    '  <input type="hidden" name="address2" value="">\n' +
    '  <input type="hidden" name="city" value="sadf">\n' +
    '  <input type="hidden" name="state" value="MN">\n' +
    '  <input type="hidden" name="zip" value="53433">\n' +
    '  <div style="text-align:center;">\n' +
    '    <input type="submit" value="Pay Now" style="background-color:rgb(47, 47, 112);color:white;border:none;text-align:center;height: 50px;">\n' +
    '  </div>\n' +
    '</form>';



  ngOnInit(): void {
    this.paypalService.getPaypayModel().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }

}
