import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  KeyboardAvoidingView
} from 'react-native';
import { Camera, ImagePicker, Permissions } from 'expo';
import { Button, Divider, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      selected: 0,
      quantity: 0,
    }

    this._scanReceipt = this._scanReceipt.bind(this);
    this._scanItem = this._scanItem.bind(this);
    this._addProduct = this._addProduct.bind(this);
  }

  selectPhotoTapped = async () => {
    const cameraroll_permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const camera_permission = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({ hasCameraPermission: cameraroll_permission === 'granted' && camera_permission === 'granted' });

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ data: result});
    }
  }

  componentWillMount() {
    this._getAllProducts();
    console.log(this.props.navigation);
  }

  _scanReceipt() {
    this.selectPhotoTapped();
  }

  _scanItem() {

  }

  _addProduct() {
    const URL = 'http://foodapi20190209083632.azurewebsites.net/api/FridgeProduct';

    console.log(this.state);

    fetch(URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "ProductId": this.state.selected,
        "Quantity": this.state.quantity
      })
    }).then( ()=> {
      console.log("successfully added product");
      this.setState({
        selected: 0,
        quantity: 0,
      })
    }).catch(error => {
      console.log("unable to add product");
    });
  }

  _getAllProducts() {
    const URL = 'http://foodapi20190209083632.azurewebsites.net/api/Product';

    fetch(URL).then(response => {
      let data = JSON.parse(response._bodyText);
      // console.log(data);
      this.setState({
        products: data,
      })
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={100}
        enabled>
        <View style={styles.photoPickerContainer}>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={{ color: 'white' }}
            type="outline"
            title="Scan your receipt"
            onPress={this._scanReceipt}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={{ color: 'white' }}
            type="outline"
            title="Scan your Item"
            onPress={this._scanReceipt}
          />
        </View>

        <Divider style={{ marginTop: 10, width: '90%', height: 1, backgroundColor: 'white' }} />
        {/* <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={{ color: 'white' }}
          type="outline"
          title="Add Item Manually"
          onPress={this._addProduct}
        /> */}
        <View style={styles.addManuallyContainer}>
          <Picker
            selectedValue={this.state.selected}
            style={styles.pickerContainer}
            itemStyle={{ color: 'white'}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({
                selected: itemValue,
              })
            }>
            {this.state.products.map((product, index)=> {
              return (
                <Picker.Item
                  key={index}
                  label={product.name}
                  value={product.id}
                />
              )
            })}

          </Picker>
          <Input
            label="Quantity"
            labelStyle={{ color: 'white'}}
            inputStyle={this.inputStyle}
            containerStyle={styles.inputContainerStyle}
            placeholder='1'
            onChangeText={(quantity) => this.setState({
              quantity: parseFloat(quantity)
            })}
          />
        </View>
        <Button
          type="outline"
          buttonStyle={styles.addManuallyButton}
          title="Add Item Manually"
          titleStyle={{ color: 'white'}}
          onPress={this._addProduct}
        />
      </KeyboardAvoidingView>
    );
  }


  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  // };
  //
  // _handleHelpPress = () => {
  //   WebBrowser.openBrowserAsync(
  //     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
  //   );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(90, 200, 250)',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonStyle: {
    borderRadius: 50,
    width: 175,
    margin: 5,
    borderColor: 'white'
  },
  photoPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addManuallyContainer: {
     flex: 1,
     flexDirection: 'row',
     width: '95%',
     justifyContent: 'center',
     alignItems: 'center'
  },
  pickerContainer: {
    borderRadius: 50,
    width: 175,
  },
  inputStyle: {
    color: 'white',
    borderColor: 'white',
    margin: 5
  },
  inputContainerStyle: {
    width: 100,
    marginBottom: 15,
  },
  addManuallyButton: {
    borderRadius: 50,
    width: 200,
    borderColor: 'white',
    marginBottom: 50,
  }
});
