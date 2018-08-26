import { Season3Component } from './content/season3/season3.component';
import { Season2Component } from './content/season2/season2.component';
import { Season1Component } from './content/season1/season1.component';
import { ContentComponent } from './content/content.component';
import { ProductsComponent } from './admin-panel/products/products.component';
import { UsersComponent } from './admin-panel/users/users.component';

import { Component } from '@angular/core';
import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ConsumerPanelComponent } from './consumer-panel/consumer-panel.component';
import { StoreComponent } from './consumer-panel/store/store.component';
import { CartComponent } from './consumer-panel/cart/cart.component';

//each path with AuthGuard should log-in (to get a token)
//roles is a string[] and a property of data
//data object is a property inside next
//next is one of 2 parameters of canActivate in auth.guard.ts
export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
    { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard] },
    { path: 'content', redirectTo:'/season1',canActivate:[AuthGuard]},
    { path: 'season1', component: ContentComponent,
    children: [{ path: '', component: Season1Component }], 
    canActivate: [AuthGuard] },
    { path: 'season2', component: ContentComponent,
    children: [{ path: '', component: Season2Component }],
    canActivate: [AuthGuard]}, 
    { path: 'season3', component: ContentComponent,
    children: [{ path: '', component: Season3Component }], 
    canActivate: [AuthGuard]},
    { path: 'adminPanel', redirectTo:'/users', canActivate: [AuthGuard] , data: { roles: ['Admin'] }},
    { path: 'users', component: AdminPanelComponent,
     children: [{ path: '', component: UsersComponent }], 
     canActivate: [AuthGuard] , data: { roles: ['Admin'] }},
    { path: 'products', component: AdminPanelComponent,
     children: [{ path: '', component: ProductsComponent }], 
     canActivate: [AuthGuard] , data: { roles: ['Admin'] }},
    { path: 'consumerPanel', redirectTo:'/store', 
     canActivate: [AuthGuard] , data: { roles: ['Consumer'] }},
    { path: 'store', component: ConsumerPanelComponent,
     children: [{ path: '', component: StoreComponent }], 
     canActivate: [AuthGuard] , data: { roles: ['Consumer'] }},
    { path: 'cart', component: ConsumerPanelComponent,
     children: [{ path: '', component: CartComponent }], 
     canActivate: [AuthGuard] , data: { roles: ['Consumer'] }},
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    /*{
        path: 'side', component: HomeComponent,
        children: [{ path: '', component: SideComponent }],
        canActivate:[AuthGuard]
    },*/
    { path : '', redirectTo:'/login', pathMatch : 'full'}// without this in the beginning we will move to index.html which
    // contains only the background and the app.html which contains nothing
    // now the default component in entrance will be UserComponent which contains 2 components: signin(the default) and signup
];