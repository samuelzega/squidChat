import React, { useState, useContext } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator
} from 'react-native'
import { customMargin, screenWidth } from '../helper'
import { AuthContext } from '../context'
import { LOGIN } from '../graphql/query'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'

export default ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useContext(AuthContext);
    const dispatch = useDispatch()
    const [login, { loading }] = useMutation(LOGIN, {
        onCompleted(data) {
            if (data.loginCustomer) {
                dispatch({ type: 'SET_TOKEN', payload: { token: data.loginCustomer.payload.token } })
                signIn(data.loginCustomer.payload.token)
            } else {
                Alert
                    .alert(
                        'Notification',
                        'Invalid username or password',
                        [{ text: 'OK', style: 'cancel' }]
                    )
            }
        },
        onError(error) {
            Alert
                .alert(
                    'Notification',
                    error.message,
                    [{ text: 'OK', style: 'cancel' }]
                )
        }
    })

    function handleLogin() {
        const variables = { email, password }
        login({ variables })
    }

    return (
        <ImageBackground
            source={require('../../assets/login_background.png')}
            style={{
                flex: 1,
                justifyContent: 'center',
            }}>
            <KeyboardAvoidingView
                behavior="padding">
                <Image
                    resizeMode="contain"
                    style={{
                        alignSelf: 'center',
                        height: screenWidth * .25,
                        width: screenWidth * .5,
                    }}
                    source={require('../../assets/text_logo2.png')} />
                <View
                    style={styles.form}>
                    <TextInput
                        placeholderTextColor="rgba(56,56,56, .75)"
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        keyboardType='email-address'
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholderTextColor="rgba(56,56,56, .75)"
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        value={password} />
                    <TouchableOpacity
                        disabled={loading}
                        onPress={() => handleLogin()}
                        style={{ ...styles.login, backgroundColor: loading ? 'rgba(120, 120, 120, .5)' : '#20776B', }}>
                        {loading &&
                            <ActivityIndicator
                                style={{ marginRight: customMargin.m2 }}
                                size="small"
                                color="#FFF" />}
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>Login</Text>
                    </TouchableOpacity>
                    <View
                        style={{ alignItems: 'center' }}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity
                            disabled={loading}
                            onPress={() => navigation.navigate('Register')}
                            style={{
                                paddingVertical: customMargin.m2,
                                paddingHorizontal: customMargin.m4
                            }}>
                            <Text
                                style={{
                                    fontWeight: '700',
                                    color: '#20776B'
                                }}>Register here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    form: {
        padding: customMargin.m4
    },
    input: {
        paddingHorizontal: customMargin.m4,
        marginVertical: customMargin.m2,
        height: screenWidth * .125,
        backgroundColor: 'rgba(63, 191, 155, .25)',
        borderRadius: 6
    },
    login: {
        borderRadius: 6,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: customMargin.m3,
        marginVertical: customMargin.m2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    }
})