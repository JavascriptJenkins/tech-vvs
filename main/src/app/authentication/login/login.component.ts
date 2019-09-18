import { Component } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";
import {TokenStorage} from "../../core/token.storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService, private token: TokenStorage, private route: ActivatedRoute) {}

  loginform:boolean;
  recoverform:boolean;
  resetpasswordform:boolean;

  // errors
  userOrEmailTaken: boolean;
  errorMessageDisplay: string;

  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  rememberMe: boolean;

  usernameInvalid: boolean;

  messageList: string;
  resetFromEmailToken: string;
  validateFromEmailToken: string;

  // form control stuff
  loginForm: FormGroup;
  passwordResetForm: FormGroup;
  passwordRecoverForm: FormGroup;

  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(24)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  checkboxFormControl = new FormControl('', []);

  // password reset form specific controls
  usernameFormControlReset = new FormControl('', [ Validators.minLength(5), Validators.maxLength(24)]);
  emailFormControlReset = new FormControl('', [ Validators.minLength(6), Validators.maxLength(24)]);


  ngOnInit(): void {

    console.log("HJHHHFf",this.rememberMe);

    this.route.queryParams.subscribe(queryParams => {

      this.messageList = queryParams['messageList'];
      console.log(queryParams['messageList']);

      // clear out the existing error display before checking for new errors
      this.errorMessageDisplay = '';

      // only check for errors if this list has something in it
      if(this.messageList != null){
        this.checkForErrors()
      }

    });

    this.route.queryParams.subscribe(queryParams => {

      this.resetFromEmailToken = queryParams['resetFromEmailToken'];

      // these 2 params will come in together on the url from email activation email
      this.username = queryParams['username'];
      this.validateFromEmailToken = queryParams['validateFromEmailToken'];

      //console.log(queryParams['resetFromEmailToken']);

      if(this.resetFromEmailToken != null){
        this.executeResetFromEmailToken();
      } else if(this.validateFromEmailToken != null && this.username != null){
        this.executeValidateFromEmailToken(); // validate a new user's email
      } else {
        this.showLoginForm();
      }

    });




    // this should route user to a different page if they are already logged in

      console.log('FIRE INIT');
  }

  showLoginForm() {
    console.log('showLoginForm');
    this.loginform = true;
    this.recoverform = false;
    this.resetpasswordform = false;
    /* bind all our handy dandy mcRandy form controls */
    this.loginForm = new FormGroup({
      usernameFormControl: this.usernameFormControl,
      passwordFormControl: this.passwordFormControl,
      checkboxFormControl: this.checkboxFormControl
    });
  }

  showRecoverForm() {
    console.log('showRecoverForm');
    this.loginform = false;
    this.recoverform = true;
    this.resetpasswordform = false;
   // this.router.navigate(['login']);
    this.passwordRecoverForm = new FormGroup({
      emailFormControl: this.emailFormControlReset,
      usernameFormControl: this.usernameFormControlReset
    });
  }

  showResetPasswordForm() {
    console.log('showResetPasswordForm');
    this.loginform = false;
    this.recoverform = false;
    this.resetpasswordform = true;
    /* EXTREMELY IMPORTANT THAT FORM CONTROLS ARE BOUND SPECIFICALLY IN THE SCOPE OF THIS FUNCTION AND NOT ON INIT.
    * WILL THROW BUGS IF YOU ARE RUNNING MULTIPLE "FORMS" FROM ONE ANGULAR CLASS LIKE IN THIS CLASS HERE AND INIT ALL FORM GROUPS
    * IN THE MAIN INIT FUNCTION.
    *  */
    /* bind all our handy dandy mcRandy form controls */
    this.passwordResetForm = new FormGroup({
      password: this.passwordFormControl,
      confirmPassword: this.passwordFormControl
    });
  }

  login(): void {

    // this.route.queryParams.subscribe(queryParams => {
    //
    //   this.messageList = queryParams['messageList'];
    //   console.log(queryParams['messageList']);
    //
    //   // only check for errors if this list has something in it
    //   if(this.messageList != null){
    //     this.checkForErrors()
    //   }
    //
    // });

    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.router.navigate(['dashboard/dashboard1']);
      }
    );
  }

  initResetToken(): void {
    this.authService.sendResetToken(this.username, this.email).subscribe(data =>{
        console.log('GOT SOME DATA from sendResetToken');
        console.log(data);
    });
    this.showLoginForm();
  }

  initChangePassword(): void {
    this.authService.sendChangePassword(this.password).subscribe(data =>{
        console.log('GOT SOME DATA from sendChangePassword');
        console.log(data);
      });
    this.showLoginForm();
  }

  executeResetFromEmailToken(): void {
    // put token back in storage
    this.token.saveToken(this.resetFromEmailToken);

    this.showResetPasswordForm()
    // let obj = JSON.parse(this.messageList);

  }

  // call backend service to validate user's email address
  executeValidateFromEmailToken(): void {

    // put token in storage that came from user's email link
    this.token.saveToken(this.validateFromEmailToken);

    console.log("sendValidateUserEmail!!!");
    this.authService.sendValidateUserEmail(this.username).subscribe(data =>{
      console.log('GOT SOME DATA from executeValidateFromEmailToken');
      console.log(data);
    });

    console.log("EMAIL VALIDATED!!!");
    this.showLoginForm()
  }

  getErrorMessage(){
    //this.usernameFormControl = new FormControl('', [Validators.required]);
    console.log('getErrorMessage triggered');
    return 'Incorrect Username or Password'
  }


  checkForErrors(){
    console.log('Check for errors coming back from backend api server');
    console.log(this.messageList);
    // if error comes back from backend server with Username or Email error, display it on the ui
    this.userOrEmailTaken = this.messageList.includes("Username") || this.messageList.includes("Email") || this.messageList.includes("user") || this.messageList.includes("email")|| this.messageList.includes("username") || this.messageList.includes("Something");
    this.messageList = this.messageList.replace(/[\[\]"]+/g, ''); // get rid of any quotes from the backend server to make msg look nice on ui
    this.errorMessageDisplay = this.messageList;
  }

  clearUsername(){
    if(this.username){
      this.username = ""
    }
  }
  clearEmail(){
    if(this.email){
      this.email = ""
    }
  }

  // make sure the two passwords are the same when signing up
  passwordsMatch(){
    return this.password === this.confirmPassword;
  }
  // checkForErrors(){
  //   console.log('Check for errors coming back from backend api server');
  //   console.log(this.messageList);
  //
  //   let obj = JSON.parse(this.messageList);
  //
  //   console.log('usernameError');
  //   console.log(obj["usernameError"]);
  //   if(obj["usernameError"]){
  //     this.usernameInvalid = true;
  //   } else {
  //   }
  //  // this.usernameInvalid = true;
  // }

}
