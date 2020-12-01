export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

// using 'Partial' and giving it a type allow you to make the inside parameters optional
export interface IActivityForm extends Partial<IActivity> {
    time?: Date
}

export class ActivityFormValues implements IActivityForm {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: undefined;
    time?: undefined;
    city: string = '';
    venue: string = '';

    constructor(init?: IActivityForm) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init);
    }
}