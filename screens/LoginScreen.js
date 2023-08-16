import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { CheckBox, Input, Button, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { baseUrl } from '../shared/baseUrl';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from '../components/DarkModeContext';


import logo from '../assets/img/logo.png'; // need to change this img later on!

const LoginTab = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    //actual logic

    // const handleLogin = () => {
    //     console.log('email: ', email);
    //     console.log('password: ', password);
    //     console.log('remember: ', remember);

    //     if (remember) {
    //         SecureStore.setItemAsync(
    //             'userinfo',
    //             JSON.stringify({
    //                 username,
    //                 password
    //             })
    //         ).catch((error) => console.log('Could not save user info', error));
    //     } else {
    //         SecureStore.deleteItemAsync('userinfo').catch((error) =>
    //             console.log('Could not delete user info', error));
    //     }
    // };

    const handleLogin = () => {
        // Dummy email and password for testing
        const dummyEmail = 'email';
        const dummyPassword = 'password';
    
        if (email === dummyEmail && password === dummyPassword) {
            console.log('Login successful');
            navigation.navigate('Profile');
        } else {
            console.log('Invalid credentials');
            // show an error message to the user
        }
    };

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);

            if (userinfo) {
                setEmail(userinfo.email);
                setPassword(userinfo.password);
                setRemember(true);
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                containerStyle={styles.formIcon}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
                secureTextEntry={!showPassword} 
                rightIcon={
                    <Icon
                        name={showPassword ? 'eye-slash' : 'eye'}
                        type='font-awesome'
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

<CheckBox
                title='Remember Me'
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.fromCheckbox}
            />
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleLogin()}
                    title='Login'
                    color='#5637DD'
                    buttonStyle={{ backgroundColor: '#5637DD' }}
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{ margin: 10 }}
                        />
                    }
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    title='Register'
                    type='clear'
                    titleStyle={{ color: 'blue' }}
                    icon={
                        <Icon
                            name='user-plus'
                            type='font-awesome'
                            color='blue'
                            iconStyle={{ margin: 10 }}
                        />
                    }
                />
            </View>
        </View>
    )
};
const RegisterTab = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [remember, setRemember] = useState(false);
    const [imageUrl, setImageUrl] = useState(baseUrl + 'image/logo.png');

    const handleRegister = () => {
        
        const userInfo = {
            username,
            password,
            email,
            remember
        };
        console.log(JSON.stringify(userInfo));

        if (remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username,
                    password
                })
            ).catch((error) => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch((error) =>
                console.log('Could not delete user info', error));
        }
    };

    const getImageFromCamera = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                processImage(capturedImage.uri);
            }
        }
    };

    const processImage = async (imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(imgUri, [{ resize: { width: 400 }}], {format: SaveFormat.PNG});
        console.log({processedImage});

        setImageUrl(processedImage.uri);
    };

    const getImageFromGallery = async () => {
        const mediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaLibraryPermissions.status === 'granted') {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                processImage(capturedImage.uri);
            }
        }
    };

    return (
        <ScrollView>
            <View style={StyleSheet.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUrl }}
                        loadingIndicatorSource={logo}
                        style={styles.image}
                    />
                    <Button title='Camera' onPress={getImageFromCamera} 
                    />
                    <Button title='Gallery' onPress={getImageFromGallery}
                    />
                </View>
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    containerStyle={styles.formIcon}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.fromCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleRegister()}
                        title='Register'
                        color='#5637DD'
                        buttonStyle={{ backgroundColor: '#5637DD' }}
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ margin: 10 }}
                            />
                        }
                    />
                </View>
            </View>
        </ScrollView>
    )
};

const Tab = createBottomTabNavigator();

const LoginScreen = () => {
    const tabBarOptions = {
        activeBackgroundColor: '#5637DD',
        inactiveBackgroundColor: '#CEC8FF',
        activeTintColor: '#fff',
        inactiveTintColor: '#808080',
        labelStyle: { fontSize: 16 }
    };

    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name='Login'
                component={LoginTab}
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color={props.color}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name='Register'
                component={RegisterTab}
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color={props.color}
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8,
        height: 60
    },
    formCheckBox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alightItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default LoginScreen;