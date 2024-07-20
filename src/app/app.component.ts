import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private http = inject(HttpClient)
  news = signal<any>([]);
  url = environment.apiUrl

  constructor() {
    this.http.get(`${environment.apiUrl}/api/news?populate=preview`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${environment.apiToken}`,
      },
    }).subscribe(val => {
      console.log(val)
      this.news.set(val as [])
    })
  }

}
