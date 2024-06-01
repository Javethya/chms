import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:any;

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers()
  {
    this.http.get('http://localhost:3000/users').subscribe((data)=>{
      console.log("My Users ",data);
      this.users=data;
    })
  }
}
