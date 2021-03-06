import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faCar,
  faCarSide,
  faCircleDot,
  faScaleUnbalanced,
  faScaleUnbalancedFlip,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { Platform } from '@ionic/angular';
import { map, startWith, tap } from 'rxjs/operators';
import { StoredTractor } from '../services/stored-tractor.interface';
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
        queryParams: { config: this.encodeConfig() },
        replaceUrl: true,
      });
    })
  );
  defaultConfig: TractorConfig = DEFAULT_TRACTOR_CONFIG;
  configSnapshot: TractorConfig;
  icons = {
    car: faCar,
    carSide: faCarSide,
    circle: faCircle,
    circleDot: faCircleDot,
    spinner: faSpinner,
    balanceLeft: faScaleUnbalanced,
    balanceRight: faScaleUnbalancedFlip,
  };
  trackByTractorId: TrackByFunction<StoredTractor> = (_index, tractor) =>
    tractor.createdAt;

  get isWidescreen() {
    return this.platform.width() > 500;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public tractorStorageService: TractorStorageService,
    public platform: Platform
  ) {
    this.configForm.patchValue(this.defaultConfig);
  }

  ngOnInit(): void {
    this.configForm.patchValue(
      this.decodeConfig(this.route.snapshot.queryParams.config)
    );
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

  async share() {
    const url = `${window.location.origin}/#/?config=${this.encodeConfig()}`;
    if (!navigator.share) {
      alert('Sharing not available');
      console.log(url);
      return;
    }
    try {
      await navigator.share?.({
        title: 'Check out my Tractor!',
        url,
      });
    } catch (e) {
      console.log(e);
    }
  }

  reset() {
    if (!confirm('Reset tractor?')) {
      return;
    }
    this.configForm.reset(this.defaultConfig);
  }

  private encodeConfig(): string {
    const configStr = JSON.stringify(this.configForm.value);
    return btoa(configStr);
  }

  private decodeConfig(encodedConfig: string): TractorConfig {
    try {
      return JSON.parse(atob(encodedConfig)) as TractorConfig;
    } catch {
      return this.defaultConfig;
    }
  }
}
