import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../../App/Layout/LoadingComponent';
import ActivityStore from '../../../../App/Stores/activityStore';
import { RootStoreContext } from '../../../../App/Stores/rootStore';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

interface IDetailParams {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<IDetailParams>> = ({
    match,
    history }) => {
    const rootStore = useContext(RootStoreContext);
    const {
        activity,
        loadActivity,
        loadingInitial
    } = rootStore.activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id, history]);

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />

    if (!activity) return <h2>Activity not found</h2>



    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat activity={activity} />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDetails);