import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import NavBar from '../../Features/Nav/NavBar';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'; // this is the higher order component
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../Features/Home/HomePage';
import ActivityForm from '../../Features/Activities/Dashboard/Form/ActivityForm';
import ActivityDetails from '../../Features/Activities/Dashboard/Details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';


const App: React.FC<RouteComponentProps> = ({ location }) => {
  // in an unordered list (<ul>), the 'li' must have a key or inspect console will complain
  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}
                />
                <Route component={NotFound} />
              </Switch>

            </Container>
          </Fragment>
        )} />
    </Fragment>
  );
}

export default withRouter(observer(App));

