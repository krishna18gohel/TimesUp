import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';
import { ManageOrdersComponent } from './components/admin/manage-orders/manage-orders.component';
import { ManageTockensComponent } from './components/admin/manage-tockens/manage-tockens.component';

export const routes: Routes = [
    { path: 'login', component: AdminLoginComponent },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'products', component: ManageProductsComponent },
            { path: 'orders', component: ManageOrdersComponent },
            { path: 'tockens', component: ManageTockensComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '' }
];
