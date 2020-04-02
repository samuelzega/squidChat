import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert
} from 'react-native'
import { customMargin, screenWidth } from '../helper'
import { REGISTER } from '../graphql/query'
import { useMutation } from '@apollo/react-hooks'

export default ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [register, { loading }] = useMutation(REGISTER, {
        onCompleted(data) {
            if (data.registerCustomer) {
                Alert
                    .alert(
                        'Success',
                        'Successfull register an account',
                        [
                            { text: 'OK', onPress: () => navigation.navigate('SignIn'), style: 'default' }
                        ]
                    )
            } else {
                Alert
                    .alert(
                        'Failed',
                        'Register failed',
                        [
                            { text: 'OK', style: 'cancel' }
                        ]
                    )
            }
        },
        onError(e) {
            Alert
                .alert(
                    'Failed',
                    e.message,
                    [
                        { text: 'OK', style: 'cancel' }
                    ]
                )
        }
    })

    function handleRegister() {
        let variables = {
            name: username,
            email,
            password,
            image_url: ''
        }
        register({ variables })
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
                        placeholder="Name"
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    <TextInput
                        placeholderTextColor="rgba(56,56,56, .75)"
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        placeholderTextColor="rgba(56,56,56, .75)"
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        value={password} />
                    <TouchableOpacity
                        onPress={() => handleRegister()}
                        disabled={loading}
                        style={{
                            ...styles.register,
                            backgroundColor: loading ? 'rgba(120, 120, 120, .5)' : '#20776B',
                        }}>
                        {loading &&
                            <ActivityIndicator
                                style={{ marginRight: customMargin.m2 }}
                                size="small"
                                color="#FFF"
                            />
                        }
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>Register</Text>
                    </TouchableOpacity>
                    <View
                        style={{ alignItems: 'center' }}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity
                            disabled={loading}
                            onPress={() => navigation.navigate('SignIn')}
                            style={{
                                paddingVertical: customMargin.m2,
                                paddingHorizontal: customMargin.m4
                            }}>
                            <Text
                                style={{
                                    fontWeight: '700',
                                    color: '#20776B'
                                }}>Login here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
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
    register: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 6,
        alignItems: 'center',
        padding: customMargin.m3,
        marginVertical: customMargin.m2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    }
})