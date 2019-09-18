import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {User} from './user.model';
import {UserService} from '../app.service';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token.storage';

@Component({
  selector: 'app-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns = ['id', 'username', 'salary', 'age', 'email'];
  dataSource = new MatTableDataSource<User>();
  constructor(private router: Router, private userService: UserService, private tokenStorage: TokenStorage) {
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        console.log("FIRING users/users");
        this.dataSource.data = data;
      }
    );
  }

  signOut(): void {
      this.tokenStorage.signOut()
  }

}

