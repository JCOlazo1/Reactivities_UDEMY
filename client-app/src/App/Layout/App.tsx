import React, {useState, useEffect, Fragment} from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { IActivity } from '../Models/activity';
import NavBar from '../../Features/Nav/NavBar';
import { ActivityDashboard } from '../../Features/Activities/Dashboard/ActivityDashboard'


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Select a specific Activity by its ID
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  useEffect(() => {   // useEffect is the React Hooks version of 'componentDidMount'
    axios
    .get<IActivity[]>('http://localhost:5000/api/activities')
        .then(response => {
            let activities: IActivity[] = [];
            response.data.forEach(activity => {
              activity.date = activity.date.split('.')[0]
            })
            setActivities(response.data)     // 'response' comes from Axios
        });
  }, []);   // the '[]' prevents the client-side app from calling 'useEffect' in an endless loop

  // use "this" because we reference a class property
  // in an unordered list (<ul>), the 'li' must have a key or inspect console will complain
    return (
      <Fragment>
        <NavBar openCreateForm={handleOpenCreateForm}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
           activities={activities}
           selectActivity={handleSelectActivity}
           selectedActivity={selectedActivity}
           editMode={editMode}
           setEditMode={setEditMode}
           setSelectedActivity={setSelectedActivity}
           createActivity={handleCreateActivity}
           editActivity={handleEditActivity}
           deleteActivity={handleDeleteActivity}
           /> 
        </Container>
        
      </Fragment>
    );
  
}

export default App;
