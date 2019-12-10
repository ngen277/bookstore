import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookstoreSharedModule } from 'app/shared/shared.module';
import { EBookComponent } from './e-book.component';
import { EBookDetailComponent } from './e-book-detail.component';
import { EBookUpdateComponent } from './e-book-update.component';
import { EBookDeleteDialogComponent } from './e-book-delete-dialog.component';
import { eBookRoute } from './e-book.route';

@NgModule({
  imports: [BookstoreSharedModule, RouterModule.forChild(eBookRoute)],
  declarations: [EBookComponent, EBookDetailComponent, EBookUpdateComponent, EBookDeleteDialogComponent],
  entryComponents: [EBookDeleteDialogComponent]
})
export class BookstoreEBookModule {}
