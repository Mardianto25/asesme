import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CKEditorModule } from 'ngx-ckeditor';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { PopoverModule } from "ngx-popover";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from '../controller/login/login-page.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from "angular-6-social-login";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { AllTesPageComponent } from '../controller/login/all-tes-page.component';
import { DashboardPageComponent } from '../controller/main/dashboard-page.component';
import { LokerPageComponent } from '../controller/main/loker-page.component';
import { MemePageComponent } from '../controller/main/meme-page.component';
import { SidebarProfileComponent } from '../controller/side-bar/sidebar-profile.component';
import { UpdateProfilePageComponent } from '../controller/main//update-profile-page.component';
import { TabDataDiriComponent } from '../controller/tab/tab-data-diri.component';
import { TabPengalamanComponent } from '../controller/tab/tab-pengalaman.component';
import { TabPendidikanComponent } from '../controller/tab/tab-pendidikan.component';
import { TabKemampuanComponent } from '../controller/tab/tab-kemampuan.component';
import { TabBahasaComponent } from '../controller/tab/tab-bahasa.component';
import { TabSertifikatComponent } from '../controller/tab/tab-sertifikat.component';
import { AlatTesDetailPageComponent } from '../controller/main/alat-tes-detail-page.component';
import { TesPageComponent } from '../controller/soal/tes-page.component';
import { DetailLokerPageComponent } from '../controller/main/detail-loker-page.component';
import { ChatPageComponent } from '../controller/main/chat-page.component';
import { DetailChatPageComponent } from '../controller/main/detail-chat-page.component';

import { EncrDecrServiceService } from '../service/encr-decr-service.service';
import { AuthGuard } from './auth.guard';
import { RegisterPageComponent } from '../controller/login/register-page.component';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';
import { AlatTesService } from '../service/alat-tes.service';
import { CertificateService } from '../service/certificate.service';
import { CustumerService } from '../service/custumer.service';
import { EducationService } from '../service/education.service';
import { ExperienceService } from '../service/experience.service';
import { JobService } from '../service/job.service';
import { LanguageService } from '../service/language.service';
import { LoginService } from '../service/login.service';
import { SkillService } from '../service/skill.service';
import { UsersService } from '../service/users.service';
import { AboutPageComponent } from '../controller/login/about-page.component';
import { ContactPageComponent } from '../controller/login/contact-page.component';
import { BerandaPageComponent } from '../controller/login/beranda-page.component';
import { MainBerandaPageComponent } from '../controller/login/main-beranda-page.component';
import { FormErrorComponent } from '../controller/login/form-error.component';
import { LupaPasswordPageComponent } from '../controller/login/lupa-password-page.component';
import { MasterClassModule } from './class';
import { LokerPilihanPageComponent } from '../controller/main/loker-pilihan-page.component';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("209508063331472")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("142508634868-og8209flmen58c1kq77gujacvi68hhce.apps.googleusercontent.com")
        },
        {
          id: LinkedinLoginProvider.PROVIDER_ID,
          provider: new LinkedinLoginProvider("81l0mmt4ke8tqh")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AllTesPageComponent,
    DashboardPageComponent,
    LokerPageComponent,
    MemePageComponent,
    SidebarProfileComponent,
    UpdateProfilePageComponent,
    TabDataDiriComponent,
    TabPengalamanComponent,
    TabPendidikanComponent,
    TabKemampuanComponent,
    TabBahasaComponent,
    TabSertifikatComponent,
    AlatTesDetailPageComponent,
    TesPageComponent,
    DetailLokerPageComponent,
    ChatPageComponent,
    DetailChatPageComponent,
    RegisterPageComponent,
    FilterPipe,
    SortPipe,
    AboutPageComponent,
    ContactPageComponent,
    BerandaPageComponent,
    MainBerandaPageComponent,
    FormErrorComponent,
    LupaPasswordPageComponent,
    LokerPilihanPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    SlickCarouselModule,
    CKEditorModule,
    PopoverModule,
    InfiniteScrollModule,
    NgbModule,
    AngularMultiSelectModule,
    ShareButtonsModule.withConfig({
      debug: true
    })
  ],
  providers: [
    AlatTesService,
    CertificateService,
    CustumerService,
    EducationService,
    ExperienceService,
    JobService,
    LanguageService,
    LoginService,
    SkillService,
    UsersService,
    EncrDecrServiceService,
    AuthGuard,
    MasterClassModule,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
