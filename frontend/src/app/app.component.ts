import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  // Make the HTTP request:
  this.http.get('http://127.0.0.1:5000/menu').subscribe(data => {
    // Read the result field from the JSON response.
    console.log('*************');
    console.log(data);
    console.log('*************');
  });
}

}
