import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import  ActivityList  from './ActivityList'
import ActivityStore from '../../../App/Stores/activityStore';
import LoadingComponent from '../../../App/Layout/LoadingComponent';

const ActivityDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore);

    // useEffect is the React Hooks version of 'componentDidMount'
    useEffect(() => {   
      activityStore.loadActivities();
    }, [activityStore]);   // the '[]' prevents the client-side app from calling 'useEffect' in an endless loop
  
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>
    return (
        <Grid>
            <Grid.Column width={10}>
                {/* '<ActivityList/>' returns a list of activities. Anything after that is bonus features  */}
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);