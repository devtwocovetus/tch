import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
// { path: '',redirectTo: 'login' ,pathMatch:'full'},
{ path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
{ path: 'login/:slug', loadChildren: () => import('./login-user/login-user.module').then(m => m.LoginUserModule) },
{ path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
{ path: 'booking', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule), canActivate: [AuthGuard] },
{ path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
{ path: 'in/:id/:formId', loadChildren: () => import('./view-patient-forms/view-patient-forms.module').then(m => m.ViewPatientFormsModule) },
{ path: 'r/:id/:uniqueId', loadChildren: () => import('./redirect-page/redirect-page.module').then(m => m.RedirectPageModule) },
{ path: 'notification-passcode/:id', loadChildren: () =>import('./notification-passcode/notification-passcode.module').then(m => m.NotificationPasscodeModule) },
{ path: 'form-passcode/:id', loadChildren: () =>import('./form-passcode/form-passcode.module').then(m => m.FormPasscodeModule) },
{ path: 'reset-password/:id', loadChildren: () =>import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
{ path: 'vc-book', loadChildren: () => import('./vc-book/vc-book.module').then(m => m.VcBookModule), canActivate: [AuthGuard] },
{ path: '**', redirectTo: 'not-found'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes,{useHash: false})],
	exports: [RouterModule]
})
export class AppRoutingModule { }