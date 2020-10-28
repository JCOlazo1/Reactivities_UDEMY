import React, {useEffect, Fragment, useContext} from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import NavBar from '../../Features/Nav/NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard'
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../Stores/activityStore';
import { observer } from 'mobx-react-lite'; // this is the higher order component


const App = () => {
  const activityStore = useContext(ActivityStore);

  // useEffect is the React Hooks version of 'componentDidMount'
  useEffect(() => {   
    activityStore.loadActivities();
  }, [activityStore]);   // the '[]' prevents the client-side app from calling 'useEffect' in an endless loop

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>

  // use "this" because we reference a class property
  // in an unordered list (<ul>), the 'li' must have a key or inspect console will complain
    return (
      <Fragment>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard /> 
        </Container>
      </Fragment>
    );
  
}

export default observer(App);

