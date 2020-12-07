import { observable, action, computed, configure, runInAction } from 'mobx';
import agent from '../Api/agent';
import { IActivity } from '../Models/activity';
import { makeAutoObservable } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { history } from '../..';
import { toast } from 'react-toastify';

configure({ enforceActions: 'always' });

export class ActivityStore {

    constructor() {
        makeAutoObservable(this);
    }

    @observable activityRegistry = new Map(); // like a HashMap
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    // @computed is used to determine what something should do given values that already exist
    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
    }

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        )

        // groups activities by date and groups them
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as { [key: string]: IActivity[] }));
    }

    // asynchronus method
    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach((activity) => {
                    activity.date = new Date(activity.date);
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            })
            // so you can see what we're doing using the 'array reduce' method
            // console.log(this.groupActivitiesByDate(activities));
        }
        catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);

        }
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
        }

        try {
            activity = await agent.Activities.details(id);
            runInAction(() => {
                activity.date = new Date(activity.date)
                this.activity = activity;
                this.activityRegistry.set(activity.id, activity);
                this.loadingInitial = false;
            })
            return activity;
        }
        catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    @action clearActivity = () => {
        this.activity = null;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false;
            });
            history.push(`/activities/${activity.id}`)

        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error('Problem submitting data')
            console.log(error.response);
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
            });
            history.push(`/activities/${activity.id}`)
        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error('Problem submitting data')
            console.log(error.response);
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })

        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            })

            console.log(error);
        }

    }
}

export default createContext(new ActivityStore())