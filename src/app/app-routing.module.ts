import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lottery/inicio',
    pathMatch: 'full'
  },
  {
    path: 'folder/:lottery/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'sorteos',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./sorteo/sorteo.module').then( m => m.SorteoPageModule)
  },
  {
    path: 'inicio/:lottery',
    canActivate: [AuthGuard],
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'game',
    canActivate: [AuthGuard],
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'file/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./file-viewer/file-viewer.module').then( m => m.FileViewerPageModule)
  },
  {
    path: 'config',
    canActivate: [AuthGuard],
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./loggin/loggin.module').then( m => m.LogginPageModule)
  },
  {
    path: 'publish/:lottery',
    canActivate: [AuthGuard],
    loadChildren: () => import('./publish/publish.module').then( m => m.PublishPageModule)
  },
  {
    path: 'lottery/:route',
    canActivate: [AuthGuard],
    loadChildren: () => import('./lottery/lottery.module').then( m => m.LotteryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
