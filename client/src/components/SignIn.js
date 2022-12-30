import {
    Alert, AlertDescription, AlertIcon, AlertTitle,
    Box, Button, CloseButton, FormControl, FormLabel,
    Heading, Input, Link,
    Stack, Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React, {FormEventHandler, useState} from "react";
import {userLogin} from "../utils/api/api.flask";
import {useNavigate} from "react-router-dom";

function SignIn() {
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event)  => {
        event.preventDefault();

        const resp = userLogin({ email, password });
        resp.then(response => {
            console.log(`successfully login, access_token: ${response.data.access_token}`)
            localStorage.setItem("access_token", response.data.access_token)
            navigate('/board')
        }).catch(error => {
            setShowAlert(true)
            console.error('login request error', error)
        });
    };

    return (
        <>
            {showAlert && (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>Some login error...</AlertDescription>
                    <CloseButton onClick={() => setShowAlert(false)} position="absolute" right="8px" top="8px" />
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl isRequired id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" onChange={event => setEmail(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl isRequired id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" onChange={event => setPassword(event.currentTarget.value)}  />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign In
                                </Button>
                                <Text align={'center'}>
                                    Don't have an account yet? <Link href={'/sign-up'} color={'blue.400'}>Sign Up!</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </>
    );
}

export default SignIn;