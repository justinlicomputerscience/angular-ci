import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class ValueService {
    value = 'real value';

    getValue(){
        return this.value;
    }

    setValue(newValue: string): void {
        this.value = newValue;
    }

    getObservableValue(): Observable<string>{
        return of('observable value');
    }

    getPromiseValue(): Promise<string>{
        return Promise.resolve('promise value');
    }

    getObservableDelayValue(): Observable<string>{
        return of('observable delay value').pipe(delay(1000));
    }
}