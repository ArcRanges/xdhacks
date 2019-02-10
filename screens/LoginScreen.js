import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this._login = this._login.bind(this);
  }

  _login() {
    this.props.navigation.navigate("Main")
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.loginContainer}
        keyboardVerticalOffset={200}
        enabled>
        <View style={styles.logoContainer}>
          <Image
            style={{width: 250, height: 275}}
            source={require('../assets/images/home.png')} />
          <Image
            style={{width: 150, height: 50, marginLeft: 100}}
            source={require('../assets/images/logo.png')} />
        </View>

        <Input containerStyle={styles.inputStyle}
          placeholder='johndoe@mail.com'
        />
        <Input containerStyle={styles.inputStyle}
          placeholder='Password'
          secureTextEntry={true}
        />

        <Button
          containerStyle={styles.loginButtonContainer}
          buttonStyle={styles.buttonStyle}
          title="Continue"
          raised
          onPress={this._login}
        />
        <Button
          containerStyle={styles.loginButtonContainer}
          buttonStyle={styles.fbButtonStyle}
          title="Login With Facebook"
          titleStyle={styles.fbLoginTextStyle}
          raised
          icon={
            <Icon
              style={{paddingRight: 15}}
              name="facebook"
              size={15}
              color="rgb(90, 200, 250)"
            />
          }
          onPress={this._login}
        />
        {/* <Button
          title="Signup"
        /> */}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    marginTop: 75,
    alignItems: 'center'
  },
  logoContainer: {
    justifyContent: 'flex-end'
  },
  inputStyle: {
    width: 275,
    borderRadius: 5,
    borderColor: 'rgb(90, 200, 250)',
    margin: 5
  },
  inputContainer: {
    flex: 1
  },
  loginButtonContainer: {
    width: 275,
    margin: 5,
  },
  fbButtonStyle: {
    backgroundColor: '#FFF',
    borderRadius: 50
  },
  fbLoginTextStyle: {
    color: 'rgb(90, 200, 250)'
  },
  buttonStyle: {
    borderRadius: 50
  }
});
