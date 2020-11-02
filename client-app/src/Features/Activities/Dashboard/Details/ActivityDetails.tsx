import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import  LoadingComponent  from '../../../../App/Layout/LoadingComponent';
import ActivityStore from '../../../../App/Stores/activityStore';

interface IDetailParams {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<IDetailParams>> = ({
    match,
    history
}) => {
    const activityStore = useContext(ActivityStore);
    const {
        activity, 
        loadActivity, 
        loadingInitial
    } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id])

    if (loadingInitial || !activity) return <LoadingComponent content="Loading activity..."/>

    return (
    <Card fluid>
    <Image src={`/Assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
            <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
            {activity!.description}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths={2}>
                <Button basic 
                as={Link} to={`/manage/${activity.id}`}
                color='blue' 
                content='Edit'
                />
                <Button 
                basic 
                onClick={() => history.push('/activities')} 
                color='grey' 
                content='Cancel'/>
            </Button.Group>
        </Card.Content>
  </Card>
    )
}

export default observer(ActivityDetails);