import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module'
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogLatestComponent } from './blog-latest/blog-latest.component';
import { BlogFeaturedComponent } from './blog-featured/blog-featured.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';



@NgModule({
  declarations: [
    BlogListComponent,
    BlogDetailComponent,
    BlogLatestComponent,
    BlogFeaturedComponent,
    BlogCategoryComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule
  ],
  exports: [BlogLatestComponent]
})
export class BlogsModule { }
