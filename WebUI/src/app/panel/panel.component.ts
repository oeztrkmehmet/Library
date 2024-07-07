import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

  constructor(

    private router: Router
  ) {}

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }

    this.router.navigateByUrl('/login');
  }
}
