import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';

import { Button, Header, Icon, Slider } from 'react-native-elements';

const BackButton = (props) => {
  console.log(props);
  return (
    <TouchableOpacity onPress={()=>props.back()}>
      <Icon
        name="chevron-left"
        color="#fff"
        size={30}
      />
    </TouchableOpacity>
  )
};
export default class ProductScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "id": 0,
      "quantity": 0,
      "categoryId":0,
      "name": "",
      "expireDays": 0,
      "category": "",
      "communities": "",
      "fridgeProducts": "",
      isChanged: false,
      submitting: false,
    }
    this._goBack = this._goBack.bind(this);
    this._updateQuantity = this._updateQuantity.bind(this);
    this._submitChanges = this._submitChanges.bind(this);
    this._deleteProduct = this._deleteProduct.bind(this);
    this._deleteWarning = this._deleteWarning.bind(this);
  }

  _goBack() {
    console.log("going back to my fridge");
    this.props.navigation.pop();
  }

  componentWillMount() {
    let props = this.props.navigation.state.params;
    let data = props.data;
    console.log(props);
    this.setState({
      "category": data.category,
      "categoryId": data.categoryId,
      "communities": data.communities,
      "expireDays": data.expireDays,
      "fridgeProducts": data.fridgeProducts,
      "id": props.id,
      "name": data.name,
      "quantity": data.quantity,
      "originalQuantity": data.quantity,
      "tip": data.nutritionDetails
    })
  }
  _updateQuantity() {
    console.log(this.state.quantity);
  }

  _submitChanges() {
    let url = 'http://foodapi20190209083632.azurewebsites.net/api/FridgeProduct/edit/' + this.state.id;
    console.log('submitting to ' + url);
    this.setState({
      submitting: true
    });
    fetch(url, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "Quantity": parseFloat(this.state.quantity),
        "Action": "infridge"
      })
    }).then((response)=>{
      // console.log(response);
      console.log("changes have been saved");
      console.log(this.props.navigation.state.params.nav);
      this.props.navigation.state.params.refreshParent();
      setTimeout(()=> {
        this.props.navigation.state.params.nav.pop();
      }, 500);

    }).catch(error=> {
      console.log("error during saving process");
      this.setState({
        submitting: false
      });
    })
  }

  _deleteWarning() {
    Alert.alert(
      'Congratulations',
      'This product will be removed from the fridge.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => this._deleteProduct()
        },
      ],
      {cancelable: false},
      );
  }

  _deleteProduct() {
    console.log('deleting product id ' + this.state.id);
    let url = 'http://foodapi20190209083632.azurewebsites.net/api/FridgeProduct/delete/' + this.state.id;

    fetch(url, {
      method: 'get',
    }).then(response => {
      console.log('successfully removed item from db');
      this.props.navigation.state.params.data.refreshParent();
      setTimeout(()=> {
        this.props.navigation.state.params.nav.pop();
      }, 500);
    }).catch(error=> {
      console.log('unable to remove item from db');
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          barStyle="light-content" // or directly
          leftComponent={
            <TouchableOpacity onPress={this._goBack}>
              <Icon
                name="chevron-left"
                color="#fff"
                size={30}
              />
            </TouchableOpacity>}
          centerComponent={{ text: `${this.state.name}`, style: { fontSize: 28, color: '#fff' } }}
          containerStyle={{
            backgroundColor: 'rgb(90, 200, 250)',
            justifyContent: 'space-around',
          }}
        />
        <View style={styles.productViewContainer}>
          <Image
            style={{width: 78, height: 170, marginTop: 75}}
            source={require('../assets/images/milk.png')} />
          <View style={styles.quantityContainer}>
            <Icon
              name="shopping-cart"
              size={20}
              containerStyle={{paddingTop: 5, paddingRight: 15,}}
              color="rgb(90, 200, 250)"
            />
            <Text style={styles.quantityTextStyle}>
              Quantity Left: {this.state.quantity}
            </Text>
          </View>
          <View style={{ flex: 1, height: 75, width: 250}}>
            {/* <Button
              title={this.state.nutritionDetails}
              color="rgb(90, 200, 250)"
              icon={{
                name: "lightbulb-o",
                size: 22,
                color: "white",
                type: "font-awesome"
              }}
            /> */}
            <View
              style={{
                borderRadius: 5,
                backgroundColor: "rgb(90, 200, 250)"
              }}>
              <Icon name="lightbulb-o"
                size={25}
                color="white"
                type="font-awesome"
              />
              <Text style={{color: 'white', fontSize: 22, textAlign: 'center'}}>
                {this.state.tip}
              </Text>
            </View>
            <View>
              <Slider
                value={this.state.quantity}
                maximumValue={this.state.originalQuantity}
                onValueChange={quantity => this.setState({
                  quantity: parseFloat(quantity.toFixed(2)),
                   isChanged: this.state.quantity != this.state.originalQuantity,
                })}
              />
            </View>

            <View style={styles.buttonsContainer}>
              <Button
                buttonStyle={{ backgroundColor: 'green'}}
                containerStyle={styles.discardButton}
                icon={{
                  name: 'check',
                  size: 22,
                  color: 'white',
                  type: 'font-awesome'
                }}
                onPress={this._deleteWarning}
              />
              <Button
                color="rgb(90, 200, 250)"
                title={this.state.submitting ? "Saving Changes ..." : "Save Changes"}
                disabled={!this.state.isChanged || this.state.submitting}
                onPress={this._submitChanges}
              />
            </View>

          </View>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productViewContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  quantityTextStyle: {
    paddingTop: 5,
    fontSize: 22,
    color: 'rgb(90, 200, 250)'
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  discardButton: {
    width: 50
  }
});
