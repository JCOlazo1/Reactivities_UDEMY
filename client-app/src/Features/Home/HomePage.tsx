import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Segment, Image } from 'semantic-ui-react'
import { RootStoreContext } from '../../App/Stores/rootStore';
import LoginForm from '../User/LoginForm';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                        Reactivities
                    </Header>
                {isLoggedIn && user ? (
                    <>
                        <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                        <Button as={Link} to='/login' size='huge' inverted>
                            Go to activities
                            </Button>
                    </>
                ) : (
                        <Fragment>
                            <Header as='h2' inverted content='Welcome to Reactivities' />
                            <Button onClick={() => openModal(<LoginForm />)} to='/login' size='huge' inverted>
                                Login
                            </Button>
                            <Button as={Link} to='/register' size='huge' inverted>
                                Register
                            </Button>
                        </Fragment>
                    )}
            </Container>
        </Segment>
    );
};

export default HomePage
