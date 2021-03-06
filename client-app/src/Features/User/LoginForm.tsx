import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header, Label } from 'semantic-ui-react';
import TextInput from '../../App/common/form/TextInput';
import { IUserFormValues } from '../../App/Models/user';
import { RootStoreContext } from '../../App/Stores/rootStore';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({
                handleSubmit,
                submitting,
                submitError,
                invalid,
                pristine,
                dirtySinceLastSubmit
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Header
                        as='h2'
                        content='Login to Reactivities'
                        color='teal'
                        textAlign='center'
                    />
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    {submitError && !dirtySinceLastSubmit && <Label color='red' basic content={submitError.statusText} />}
                    <Button
                        disabled={invalid && !dirtySinceLastSubmit || pristine}
                        loading={submitting}
                        positive content='Login'
                        fluid
                    />
                </Form>
            )}
        />
    )
}

export default LoginForm
