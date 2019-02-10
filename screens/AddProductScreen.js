import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Picker
} from 'react-native';

export default class AddProductScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }
  componentWillMount() {
    this._getAllProducts();
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

  _keyExtractor = (item, index) => item.id + "";

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.productContainer}>
        <Text style={styles.productText}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.products}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  productContainer: {
    padding: 5,
    margin: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgb(90, 200, 250)',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    width: 275
  },
  productText: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center'
  },
});
