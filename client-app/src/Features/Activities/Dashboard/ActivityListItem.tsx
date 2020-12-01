import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../App/Models/activity'
import { format } from 'date-fns'

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Meta>{format(activity.date, 'dd.MM.yyyy')}</Item.Meta>
                            <Item.Description>
                                Hosted by Dragonball Z
                        </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </Segment>
            <Segment>
                <Icon name='clock' /> {format(activity.date, 'dd.MM.yyyy')}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                {/* 'onClick' uses the View button to return and display the activity */}
                <Button
                    as={Link} to={`/activities/${activity.id}`}
                    floated='right'
                    content='View'
                    color='blue'
                />
            </Segment>
        </Segment.Group>
    )
}

export default ActivityListItem
