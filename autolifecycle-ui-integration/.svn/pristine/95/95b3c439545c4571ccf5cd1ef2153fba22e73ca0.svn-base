import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AutoService } from './auto.service'
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule   } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideleftComponent } from './sideleft/sideleft.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateReleaseComponent } from './create-release/create-release.component';
import { ListOfReleasesComponent } from './list-of-releases/list-of-releases.component';
import { CreateProductLineComponent } from './create-product-line/create-product-line.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ReleasesOverviewComponent } from './releases-overview/releases-overview.component';
import { CreateFeatureComponent } from './create-feature/create-feature.component';
import { ImportFeaturesComponent } from './import-features/import-features.component';
import { ListOfFeaturesComponent } from './list-of-features/list-of-features.component';
import { OnboardFeaturesComponent } from './onboard-features/onboard-features.component';
import { JiraComponent } from './jira/jira.component';
 
import { BugzillaComponent } from './bugzilla/bugzilla.component';
import { SyncFeaturesComponent } from './sync-features/sync-features.component';
import { SyncProductsComponent } from './sync-products/sync-products.component';
import { SyncReleasesComponent } from './sync-releases/sync-releases.component';
 


const appRoutes: Routes = [
  { path: 'Portfolio', component: ProfileComponent },
  { path: 'Create Product Line', component: CreateProductLineComponent },
  { path: 'Create Product', component: CreateProductComponent },
  { path: 'Product_Overview/:id', component: ProductOverviewComponent },
  { path: 'Create Release', component: CreateReleaseComponent },
  { path: 'List Of Releases', component: ListOfReleasesComponent },
  { path: 'Overview/:rid', component: ReleasesOverviewComponent },
  { path: 'Create Feature', component: CreateFeatureComponent },
  { path: 'Onboard Features', component: OnboardFeaturesComponent },
  { path: 'List Of Features', component: ListOfFeaturesComponent },
  { path: 'Import Features', component: ImportFeaturesComponent },
  { path: 'Jira', component: JiraComponent },
  { path: 'Bugzilla', component: BugzillaComponent },
  { path: 'Sync Products', component: SyncProductsComponent },
  { path: 'Sync Releases', component: SyncReleasesComponent },
  { path: 'Sync Features', component: SyncFeaturesComponent },
  { path: '', redirectTo: '/Portfolio', pathMatch: 'full' },
  { path: '**', redirectTo: '/Portfolio', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideleftComponent,
    BreadcrumbComponent,
    ProfileComponent,
    CreateReleaseComponent,
    ListOfReleasesComponent,
    CreateProductLineComponent,
    CreateProductComponent,
    ProductOverviewComponent,
    ReleasesOverviewComponent,
    CreateFeatureComponent,
    ImportFeaturesComponent,
    ListOfFeaturesComponent,
    OnboardFeaturesComponent,
    JiraComponent,
   
    BugzillaComponent,
   
    SyncFeaturesComponent,
   
    SyncProductsComponent,
   
    SyncReleasesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
     
    FormsModule,
    ReactiveFormsModule  ,
    RouterModule.forRoot(appRoutes,
      {
        useHash: true,
        enableTracing: true
      }),
  ],
  providers: [AutoService],
  bootstrap: [AppComponent]
})


export class AppModule { }
