import { TestBed } from '@angular/core/testing';

import { Country.ServiceService } from './country.service';

describe('Country.ServiceService', () => {
  let service: Country.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Country.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
