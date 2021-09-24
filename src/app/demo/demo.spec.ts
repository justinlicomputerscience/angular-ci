import { 
    ValueService
} from './demo';

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
});
