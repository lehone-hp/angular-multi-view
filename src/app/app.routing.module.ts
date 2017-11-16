import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { DesktopFrontpageComponent } from './frontpage/desktop/desktop-frontpage.component';
import { ProductAComponent } from './products/product-a/product-a.component';
import { ProductBComponent } from './products/product-b/product-b.component';
import { AboutComponent } from './about/about.component';
import { MobileFrontpageComponent } from './frontpage/mobile/mobile-frontpage.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ApplicationStateService } from '../services/application-state-service/applicationState.service';

const desktop_routes: Routes = [
  {
    path: '', component: DesktopFrontpageComponent, children:
          [
            {path: 'producta', component: ProductAComponent},
            {path: 'productb', component: ProductBComponent}
          ]
  },
  {path: 'about', component: AboutComponent}
];

const mobile_routes: Routes = [
  {path: '', component: MobileFrontpageComponent},
  {path: 'producta', component: ProductAComponent},
  {path: 'productb', component: ProductBComponent},
  {path: 'about', component: AboutComponent},
  {path: 'user-profile', component: UserProfileComponent}
];

@NgModule({
  // as default we set the desktop routing configuration. if mobile will be started it will be replaced below.
  // note that we must specify some routes here (not an empty array) otherwise the trick below doesn't work...
  imports: [RouterModule.forRoot(desktop_routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppBrowserRoutingModule {

  public constructor(private router: Router,
    private applicationStateService: ApplicationStateService) {

    if (applicationStateService.getIsMobileResolution()) {
      router.resetConfig(mobile_routes);
    }
  }
}

