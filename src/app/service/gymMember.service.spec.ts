import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GymmemberService } from './gymMember.service';
import { GymMember } from '../model/GymMember';
import { environment } from 'src/environments/environment';

describe('GymmemberService', () => {
  let service: GymmemberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GymmemberService],
    });
    service = TestBed.inject(GymmemberService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    // Arrange & Act & Assert
    expect(service).toBeTruthy();
  });

  describe('GetMembers()', () => {
    it('should return an Observable<GymMember[]>', () => {
      // Arrange
      const mockData: GymMember[] = [];

      // Act
      service.GetMembers().subscribe((members: GymMember[]) => {
        // Assert
        expect(members).toEqual(mockData);
      });

      // Arrange
      const req = httpMock.expectOne(`${environment.ApiUri}`);

      // Assert
      expect(req.request.method).toEqual('GET');

      // Act
      req.flush(mockData);
    });
  });
});
