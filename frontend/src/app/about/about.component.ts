import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  providers: [
  ],
  styles: [`
  `],
  template: `
    <h1>About Us</h1>
    <div>
      Junction Nerdics
    </div>
  `
})
export class AboutComponent implements OnInit {

  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        /**
         * Your resolved data from route.
         */
      });
  }

}
