import { Injectable, Component } from '@angular/core';

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

@Injectable()
export class MasterService {
    constructor(private valueService: ValueService){}

    getValue(): string {
        return this.valueService.getValue();
    }
}

/* 92 */ @Component({
    selector: 'lightswitch-comp',
    template: `
        <button (click)="clicked()">click me</button>
        <p>{{message}}</p>
    `
})
export class LightswitchComponent {
    isOn = false;
    clicked(){
        this.isOn = !this.isOn;

    }

    get message(){
        return `the light is ${this.isOn ? 'on' : 'off'}`;
    }
}