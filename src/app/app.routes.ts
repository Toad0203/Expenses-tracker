import { Routes } from '@angular/router';
import { ManagePage } from './Components/manage-page/manage-page';
import { ReviewPage } from './Components/review-page/review-page';
import { PersonalizePage } from './Components/personalize-page/personalize-page';

export const routes: Routes = [
  {
    path: '',
    component: ManagePage,
  },
  {
    path: 'review',
    component: ReviewPage,
  },
  {
    path: 'personalize',
    component: PersonalizePage,
  },
];
