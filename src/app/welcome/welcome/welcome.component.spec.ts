import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { UserService } from '../../model/user.service';

class MockUserService {
  isLoggedIn = true;
  user = {
    name: 'Test User'
  };
}

describe('WelcomeComponent (class only)', () => {
  let welcomeComponent: WelcomeComponent;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WelcomeComponent,
        { provide: UserService, useClass: MockUserService }
      ]
    });

    welcomeComponent = TestBed.inject(WelcomeComponent);
    userService = TestBed.inject(UserService);
  });

  it('should only have welcome after constructor is called', () => {
    expect(welcomeComponent.welcome).toBe('');
  });

  it('should welcome logged in user after ngOnInit', () => {
    welcomeComponent.ngOnInit();
    expect(welcomeComponent.welcome).toContain(userService.user.name);
  });

  it('should ask user to log in if not logged in after ngOnInit', () => {
    userService.isLoggedIn = false;
    welcomeComponent.ngOnInit();

    expect(welcomeComponent.welcome).not.toContain(userService.user.name);
    expect(welcomeComponent.welcome).toContain('log in');
  });

});
