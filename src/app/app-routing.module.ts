import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from '../controller/login/login-page.component';
import { AllTesPageComponent } from '../controller/login/all-tes-page.component';
import { DashboardPageComponent } from '../controller/main/dashboard-page.component';
import { LokerPageComponent } from '../controller/main/loker-page.component';
import { MemePageComponent } from '../controller/main/meme-page.component';
import { SidebarProfileComponent } from '../controller/side-bar/sidebar-profile.component';
import { UpdateProfilePageComponent } from '../controller/main//update-profile-page.component';
import { AlatTesDetailPageComponent } from '../controller/main/alat-tes-detail-page.component';
import { TesPageComponent } from '../controller/soal/tes-page.component';
import { DetailLokerPageComponent } from '../controller/main/detail-loker-page.component';
import { ChatPageComponent } from '../controller/main/chat-page.component';
import { DetailChatPageComponent } from '../controller/main/detail-chat-page.component';
import { AuthGuard } from './auth.guard';
import { RegisterPageComponent } from '../controller/login/register-page.component';
import { BerandaPageComponent } from '../controller/login/beranda-page.component';
import { AboutPageComponent } from '../controller/login/about-page.component';
import { ContactPageComponent } from '../controller/login/contact-page.component';
import { MainBerandaPageComponent } from '../controller/login/main-beranda-page.component';
import { LupaPasswordPageComponent } from '../controller/login/lupa-password-page.component';
import { LokerPilihanPageComponent } from '../controller/main/loker-pilihan-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainBerandaPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'beranda',
        pathMatch: 'full' 
      },
      {
        path: 'beranda',
        component: BerandaPageComponent
      },
      {
        path: 'about',
        component: AboutPageComponent
      },
      {
        path: 'contact',
        component: ContactPageComponent
      },
      {
        path: 'all-tes',
        component: AllTesPageComponent
      },
      {
        path: 'me',
        component: SidebarProfileComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: DashboardPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'loker',
            component: LokerPageComponent,
            // canActivate: [AuthGuard],
            
          },
          {
            path: 'detail-loker/:id',
            component: DetailLokerPageComponent,
            // canActivate: [AuthGuard],
            
          },
          {
            path: 'meme',
            component: MemePageComponent,
            canActivate: [AuthGuard],
            
          },
          {
            path: 'chat',
            component: ChatPageComponent,
            canActivate: [AuthGuard],
            
          },
          {
            path: 'detail-chat/:id',
            component: DetailChatPageComponent,
            canActivate: [AuthGuard],
            
          },
          {
            path: 'loker-pilihan',
            component: LokerPilihanPageComponent,
            canActivate: [AuthGuard],
            
          }
        ]
      },
      
      {
        path: 'update-profile',
        component: UpdateProfilePageComponent,
        canActivate: [AuthGuard],
        
      },
      {
        path: 'alat-tes-detail/:id',
        component: AlatTesDetailPageComponent
        
      },

      {
        path: 'tes',
        component: TesPageComponent,
        canActivate: [AuthGuard],
        
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },

  {
    path: 'lupa-password',
    component: LupaPasswordPageComponent
  },
  
  {
    path:'**',
    component: ContactPageComponent
  }
  ///

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
