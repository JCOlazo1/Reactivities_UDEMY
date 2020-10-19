import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../App/Models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from './Details/ActivityDetails';
import { ActivityForm } from './Form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
    activities, 
    selectActivity, 
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                {/* '<ActivityList/>' returns a list of activities. Anything after that is bonus features  */}
                <ActivityList 
                activities={activities} 
                selectActivity={selectActivity} 
                deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {/* 'ActivityDetails' by itself returns a simple generic display but when given 'selectedActivity' will display that activity in full detail  */}
                {selectedActivity && !editMode && (
                     <ActivityDetails 
                        activity={selectedActivity}
                        setEditMode={setEditMode} 
                        setSelectedActivity={setSelectedActivity}/>
                     )}
                {/* Only display form if in Edit Mode */}
                {editMode && (
                <ActivityForm 
                    key={selectedActivity && selectedActivity.id || 0}
                    setEditMode={setEditMode} 
                    activity={selectedActivity!}
                    createActivity={createActivity}
                    editActivity={editActivity}  />
                )}
            </Grid.Column>
        </Grid>
    );
};
