import { TestBed } from '@angular/core/testing';

import { SpeakerLinkService } from './speaker-link.service';

describe('SpeakerLinkService', () => {
  let service: SpeakerLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeakerLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
