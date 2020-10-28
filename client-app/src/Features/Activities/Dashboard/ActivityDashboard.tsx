import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import  ActivityList  from './ActivityList'
import  ActivityDetails  from './Details/ActivityDetails';
import  ActivityForm  from './Form/ActivityForm';
import ActivityStore from '../../../App/Stores/activityStore';

const ActivityDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {editMode, selectedActivity} = activityStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                {/* '<ActivityList/>' returns a list of activities. Anything after that is bonus features  */}
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {/* 'ActivityDetails' by itself returns a simple generic display but when given 'selectedActivity' will display that activity in full detail  */}
                {selectedActivity && !editMode && (
                     <ActivityDetails />
                     )}
                {/* Only display form if in Edit Mode */}
                {editMode && (
                <ActivityForm 
                    key={selectedActivity && selectedActivity.id || 0}
                    activity={selectedActivity!} 
                    />
                )}
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);