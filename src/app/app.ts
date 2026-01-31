import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './Components/sidebar/sidebar';
import { ManagePage } from './Components/manage-page/manage-page';
import { ReviewPage } from './Components/review-page/review-page';
import { PersonalizePage } from './Components/personalize-page/personalize-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, ManagePage, ReviewPage, PersonalizePage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-angular-20-app');
}
