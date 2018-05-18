import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  data: any;

  constructor(private http: HttpClient) {
    this.http.get(`${environment.apiUrl}/topics/whatever`).subscribe(s =>
      this.data = s);
  }
}
