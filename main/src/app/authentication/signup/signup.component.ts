import { Component } from '@angular/core';
import {AppComponent} from "../../app.component";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";
import {TokenStorage} from "../../core/token.storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  constructor(private router: Router, private authService: AuthService, private token: TokenStorage, private route: ActivatedRoute) {}

  // this holds a list of messages to alert the user of something on a page (wrong password, validation issues, etc.)
  messageList: string;

  userOrEmailTaken: boolean;
  errorMessageDisplay: string;

  // form fields
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  acceptTerms: boolean;

  // form control stuff
  signUpForm: FormGroup;
  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(24)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  checkboxFormControl = new FormControl('', [Validators.required]);

  // ngOnInit() fires on intialization of page.
  ngOnInit(): void {

    AppComponent.getServiceHost();

    this.route.queryParams.subscribe(queryParams => {

      this.messageList = queryParams['messageList'];
      console.log(queryParams['messageList']);

      // only check for errors if this list has something in it
      if(this.messageList != null){
        this.checkForErrors()
      }

    });

    // this.route.queryParams.subscribe(queryParams => {
    //
    //   this.resetFromEmailToken = queryParams['resetFromEmailToken'];
    //   console.log(queryParams['resetFromEmailToken']);
    //
    //   // only check for errors if this list has something in it
    //   if(this.resetFromEmailToken != null){
    //
    //     this.executeResetFromEmailToken();
    //
    //     // this.router.navigate(['login']);
    //
    //
    //   } else {
    //     this.showLoginForm();
    //   }
    //
    // });

    // this should route user to a different page if they are already logged in

    /* bind all our handy dandy mcRandy form controls */
    this.signUpForm = new FormGroup({
      usernameFormControl: this.usernameFormControl,
      passwordFormControl: this.passwordFormControl,
      confirmPassword: this.passwordFormControl,
      emailFormControl: this.emailFormControl,
      checkboxFormControl: this.checkboxFormControl
    });

    console.log('FIRE INIT SIGNUP COMPONENT');
  }


  checkForErrors(){
    console.log('Check for errors coming back from backend api server');
    console.log(this.messageList);
    // if error comes back from backend server with Username or Email error, display it on the ui
    this.userOrEmailTaken = this.messageList.includes("Username") || this.messageList.includes("Email") || this.messageList.includes("username") || this.messageList.includes("Something");
    this.messageList = this.messageList.replace(/[\[\]"]+/g, ''); // get rid of any quotes from the backend server to make msg look nice on ui
    this.errorMessageDisplay = this.messageList;
  }

  signUpNewUser(): void {

    console.log('signUpNewUser() triggered!');

    this.authService.createAccount(this.username, this.password, this.email).subscribe(
      data => {
        console.log('data 555555: ',data);
        this.token.saveToken(data.token);

        // JSONify the error message from backend server so the ui can display it
        // let navextras: NavigationExtras={
        //   queryParams:{"messageList":JSON.stringify("Success creating new account!")}
        // };

        this.router.navigate(['dashboard/dashboard1']); // navigate this to a new page to enter secret token to validate email
      }
    );

    // subscribe to any errors that come back from the backend api server
    this.route.queryParams.subscribe(queryParams => {

      this.messageList = queryParams['messageList'];
      console.log(queryParams['messageList']);

      // only check for errors if this list has something in it
      if(this.messageList != null){
        this.checkForErrors()
      }

    });

  }

  // make sure the two passwords are the same when signing up
  passwordsMatch(){
    return this.password === this.confirmPassword;
  }

  termsChecked(){
    return this.acceptTerms;
  }

  noErrors(){

  }

}
