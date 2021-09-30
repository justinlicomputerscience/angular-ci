import { toBase64String } from '@angular/compiler/src/output/source_map';
import { TestBed } from '@angular/core/testing';
import { ValueService, MasterService } from './demo';

describe('demo (with TestBed)', () => {
    describe('ValueService', () => {
        let valueService: ValueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [ValueService]
            });
            valueService = TestBed.inject(ValueService);
        });

        /* 48 */ it('should use ValueService', () => {
            expect(valueService.getValue()).toBe('real value');
        });



        /* 70 */ it(
            'test should wait for ValueService.getObservableDelayedValue',
            (done: DoneFn) => {
                valueService.getObservableDelayValue().subscribe(value => {
                    expect(value).toBe('observable delay value');
                    done();
                });
            }
        );


    });

    /* 85 */ describe('MasterService', () => {
        let masterService: MasterService;
        let valueServiceSpy: jasmine.SpyObj<ValueService>;

        /* 89 */ beforeEach(() => {
            let spy = jasmine.createSpyObj('ValueService', ['getValue']);

            TestBed.configureTestingModule({
                providers: [
                    MasterService,
                    { provide: ValueService, useValue: spy }
                ]
            });

            masterService = TestBed.inject(MasterService);
            valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
        });

        it('#getValue should return a stubbed value from a spy', () => {
            const stubValue = 'stub value';
            valueServiceSpy.getValue.and.returnValue(stubValue);

            expect(masterService.getValue())
                .toBe(stubValue, 'service returned stub value');
            expect(valueServiceSpy.getValue.calls.count())
                .toBe(1, 'spy method was called once');
            expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
                .toBe(stubValue);
        });

    });
});