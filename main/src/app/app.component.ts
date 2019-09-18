import {Component, Pipe} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  static getServiceHost(){
    if(environment.production == true){
      console.log("starting with prod!!!");
      return environment.apiServiceHost
    } else {
      console.log("starting with dev!!!");
      return "http://localhost:8080"
    }
  }

}

@Pipe({name: 'safeHtmlPipe'})
export class Safe {
  constructor(private sanitizer: DomSanitizer) {}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}
