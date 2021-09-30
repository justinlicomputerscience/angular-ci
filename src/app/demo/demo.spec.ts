import {
    ValueService,
    MasterService,
    LightswitchComponent
} from './demo';

export class FakeValueService extends ValueService {
    value = 'faked service value';
}

describe('demo, (no testbed)', () => {
    describe('ValueService', () => {
        let valueService: ValueService;
        beforeEach(() => valueService = new ValueService());

        it('#getValue should return a real value', () => {
            expect(valueService.getValue()).toBe('real value');
        });

        it(
            '#getObservableValue should return value from observable',
            (done: DoneFn) => {
                valueService.getObservableValue().subscribe(value => {
                    expect(value).toBe('observable value');
                    done();
                });
            }
        );

        it(
            '#getPromiseValue should return a value from promise',
            (done: DoneFn) => {
                valueService.getPromiseValue().then(value => {
                    expect(value).toBe('promise value');
                    done();
                });
            }
        );
    });

    /* 42 */ describe('MasterService without Angular testing support', () => {
        let masterService: MasterService;

        it('#getValue should return real value from real service', () => {
            masterService = new MasterService(new ValueService);
            expect(masterService.getValue()).toBe('real value');
        });

        it('#getValue should return a faked value from faked value service', () => {
            masterService = new MasterService(new FakeValueService);
            expect(masterService.getValue()).toBe('faked service value');
        });

        it('#getValue should return a stubbed value from spy', () => {
            const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
            const stubValue = 'stub value';

            valueServiceSpy.getValue.and.returnValue(stubValue);

            masterService = new MasterService(valueServiceSpy);

            expect(masterService.getValue())
                .toBe(stubValue, 'service returned stub value');
            expect(valueServiceSpy.getValue.calls.count())
                .toBe(1, 'spy method was called once');
            expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
                .toBe(stubValue);
        });
    });

    /* 81 */ describe('MasterService (no beforeEach)', () => {
        function setup() {
            const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
            const stubValue = 'stub value';
            const masterService = new MasterService(valueServiceSpy);

            valueServiceSpy.getValue.and.returnValue(stubValue);

            return { masterService, stubValue, valueServiceSpy };
        }

        it('#getValue should return stub value from spy', () => {
            const { masterService, stubValue, valueServiceSpy } = setup();

            expect(masterService.getValue())
                .toBe(stubValue, 'service returned stub value');
            expect(valueServiceSpy.getValue.calls.count())
                .toBe(1, 'spy method was called once');
            expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
                .toBe(stubValue);
        });
    });

    /* 119 */ describe(
        'LightswitchComponent',
        () => {
            it('#clicked() should toggle #isOn', () => {
                const lightswitchComponent = new LightswitchComponent();
                expect(lightswitchComponent.isOn).toBe(false, 'off at first');
                
                lightswitchComponent.clicked();
                expect(lightswitchComponent.isOn).toBe(true, 'on after click');
            });
        }
    );
});
