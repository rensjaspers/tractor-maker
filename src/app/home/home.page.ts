import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, startWith, tap } from 'rxjs/operators';
import { TractorStorageService } from '../services/tractor-storage.service';
import { DEFAULT_TRACTOR_CONFIG } from '../tractor/DEFAULT_TRACTOR_CONFIG';
import { TractorConfig } from '../tractor/tractor-config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  configForm = new FormGroup({
    wheelSize: new FormControl(),
    rimSize: new FormControl(),
    color: new FormControl(),
    cabinWidth: new FormControl(),
    hoodHeight: new FormControl(),
    width: new FormControl(),
    height: new FormControl(),
    exhaustLocation: new FormControl<'front' | 'back' | null>(null),
    frontBackRatio: new FormControl(),
    bolts: new FormControl(null),
  });
  config$ = this.configForm.valueChanges.pipe(
    startWith(''),
    map(() => this.configForm.value),
    tap((config) => {
      this.configSnapshot = config as TractorConfig;
      this.router.navigate([], {
        queryParams: config,
      });
    })
  );
  defaultConfig: TractorConfig = DEFAULT_TRACTOR_CONFIG;
  configSnapshot: TractorConfig;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public tractorStorageService: TractorStorageService
  ) {
    this.configForm.patchValue(this.defaultConfig);
  }

  ngOnInit(): void {
    this.configForm.patchValue(this.route.snapshot.queryParams);
  }

  saveCurrentTractor() {
    const name = prompt('What should we call this tractor?');
    if (!name) {
      alert('Tractor name required');
      return;
    }
    this.tractorStorageService.saveTractor({
      name,
      config: this.configSnapshot,
    });
    alert('Tractor saved!');
  }

  deleteTractor(id: number) {
    this.tractorStorageService.deleteTractor(id);
  }
}
