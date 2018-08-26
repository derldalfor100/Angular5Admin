import { Season3Component } from './content/season3/season3.component';
import { Season2Component } from './content/season2/season2.component';
import { Season1Component } from './content/season1/season1.component';
import { ProductsComponent } from './admin-panel/products/products.component';
import { UsersComponent } from './admin-panel/users/users.component';

import { Serv1Service } from './shared/serv1.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ConsumerPanelComponent } from './consumer-panel/consumer-panel.component';
import { StoreComponent } from './consumer-panel/store/store.component';
import { CartComponent } from './consumer-panel/cart/cart.component';
import { HttpModule } from '@angular/http';
import { AboutComponent } from './about/about.component';
//import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule} from '@angular/material';
import { NgxGalleryModule } from 'ngx-gallery';
import { GalleryComponent } from './gallery/gallery.component';
import { AppendTRDirective } from './appendTR.directive';
import { MaterializeModule } from 'angular2-materialize';
import { ContentComponent } from './content/content.component';


@NgModule({
   declarations: [
      //forcomponents/directives/pipes\\nAppComponent,
      AppComponent,
      SignUpComponent,
      UserComponent,
      SignInComponent,
      HomeComponent,
      AdminPanelComponent,
      ForbiddenComponent,
      ConsumerPanelComponent,
      StoreComponent,
      CartComponent,
      AboutComponent,
      GalleryComponent,
      UsersComponent,
      ProductsComponent,
      AppendTRDirective,
      ContentComponent,
      Season1Component,
      Season2Component,
      Season3Component,
   ],
   imports: [
      //formodules\\nBrowserModule,
      FormsModule,
      HttpClientModule,
      HttpModule,
      //forSQL\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nHttpModule,
      //formySQL\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nToastrModule.forRoot(\\\\\\\\\\\\\\\\nBrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      ToastrModule.forRoot(),
      BrowserAnimationsModule,
      //MatMenuModule, 
      //MatButtonModule,
      //MatIconModule,
      //MatCardModule,
      NgxGalleryModule,
      MaterializeModule,
   ],
   // for services, authentications
  providers: [Serv1Service,UserService,AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],

  bootstrap: [AppComponent]
})
export class AppModule { }
