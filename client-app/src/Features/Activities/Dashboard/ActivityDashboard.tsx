import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { RootStoreContext } from '../../../App/Stores/rootStore';

const ActivityDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadActivities, loadingInitial } = rootStore.activityStore;

    // useEffect is the React Hooks version of 'componentDidMount'
    useEffect(() => {
        loadActivities();
    }, [loadActivities]);   // the '[]' prevents the client-side app from calling 'useEffect' in an endless loop

    if (loadingInitial) return <LoadingComponent content='Loading activities...' />
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