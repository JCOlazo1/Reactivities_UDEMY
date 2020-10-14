import React, {Component} from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';


class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        this.setState({   // interacts with 'state' above
          values: response.data   // 'setState' re-renders these values and sends them to 'values' above to display on screen
        })
      })
    
  }
  // use "this" because we reference a class property
  // in an unordered list (<ul>), the 'li' must have a key or inspect console will complain
  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header> 
        <List>
        {this.state.values.map((value: any) => (
              <List.Item key={value.id}>{value.name}</List.Item>
            ))}         
        </List>  
      </div>
    );
  }
}

export default App;
