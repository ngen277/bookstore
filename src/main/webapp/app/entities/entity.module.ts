import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.BookstoreAuthorModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.BookstoreBookModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.BookstoreCategoryModule)
      },
      {
        path: 'cover',
        loadChildren: () => import('./cover/cover.module').then(m => m.BookstoreCoverModule)
      },
      {
        path: 'discount',
        loadChildren: () => import('./discount/discount.module').then(m => m.BookstoreDiscountModule)
      },
      {
        path: 'e-book',
        loadChildren: () => import('./e-book/e-book.module').then(m => m.BookstoreEBookModule)
      },
      {
        path: 'gift',
        loadChildren: () => import('./gift/gift.module').then(m => m.BookstoreGiftModule)
      },
      {
        path: 'language',
        loadChildren: () => import('./language/language.module').then(m => m.BookstoreLanguageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.BookstoreNewsModule)
      },
      {
        path: 'publisher',
        loadChildren: () => import('./publisher/publisher.module').then(m => m.BookstorePublisherModule)
      },
      {
        path: 'rating',
        loadChildren: () => import('./rating/rating.module').then(m => m.BookstoreRatingModule)
      },
      {
        path: 'sale',
        loadChildren: () => import('./sale/sale.module').then(m => m.BookstoreSaleModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BookstoreEntityModule {}
