import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  configForm = new FormGroup({
    wheelSize: new FormControl(80),
    rimSize: new FormControl(0.5),
    color: new FormControl('#FF0000'),
    cabinWidth: new FormControl(50),
    hoodHeight: new FormControl(50),
    exhaustLocation: new FormControl<'front' | 'back'>('front'),
    frontBackRatio: new FormControl(50),
    bolts: new FormControl(4),
  });
  config$ = this.configForm.valueChanges.pipe(
    startWith(''),
    map(() => this.configForm.value),
    tap((config) => {
      this.router.navigate([], {
        queryParams: config,
      });
    })
  );

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.configForm.patchValue(this.route.snapshot.queryParams);
  }
}
