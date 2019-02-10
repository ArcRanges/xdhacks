import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const URLS = [
  {
    name: 'fresh',
    URL: 'http://foodapi20190209083632.azurewebsites.net/api/FridgeProduct/fresh'
  },
  {
    name: 'expiring',
    URL: 'http://foodapi20190209083632.azurewebsites.net/api/FridgeProduct/expiring'
  },
  {
    name: 'expired',
    URL: 'http://foodapi20190209083632.azurewebsites.net/api/FridgeProduct/expired'
  }
];

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "name": "",
    }

    this._viewProduct = this._viewProduct.bind(this);
  }

  _viewProduct() {
    // console.log(this.props.nav.navigate('Product'));
    this.props.nav.navigate('Product', this.props);
  }
  componentWillMount() {
    // console.log(this.props);
    this.setState({
      name: this.props.name,
    })
  }

  render() {
    return (
      <TouchableOpacity style={styles.productContainer}
        onPress={this._viewProduct}>
        <Text style={styles.productText}>
          {this.state.name}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default class MyFridgeScreen extends React.Component {
  static navigationOptions = {
    title: 'My Fridge',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      products: [],
      current: 0,
      refreshing: false,
    }

    this._getAllProducts = this._getAllProducts.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    // this._getProductById = this._getProductById.bind(this);
  }

  _getAllProducts() {
    const URL = 'http://foodapi20190209083632.azurewebsites.net/api/Product';

    fetch(URL).then(response => {
      let data = JSON.parse(response._bodyText);
      // console.log(data);
      this.setState({
        products: data,
        refreshing: false
      })
    }).catch(error => {
      console.log(error);
    });
  }

  _onRefresh() {
    console.log("im called after saving")
    this._updateFridge(this.state.current);
  }

  _updateFridge(current) {
    let url = URLS[current].URL;
    console.log(url);
    this.setState({current});
    this._unifiedGetRequest(url);
  }

  _unifiedGetRequest(url) {
    fetch(url).then(response => {
      let data = JSON.parse(response._bodyText);
      // console.log(data);
      this.setState({
        data: data
      })
    }).catch(error => {
      console.log(error);
    });
  }

  // async _getProductById(id) {
  //   let url = 'http://foodapi20190209083632.azurewebsites.net/api/Product/' + id;
  //   const response = await fetch(url, {});
  //   const data = await JSON.parse(response._bodyText);
  //
  //   return data;
  // }

  componentWillMount() {
    this.setState({
      refreshing: true
    });
    this._updateFridge(this.state.current);
    this._getAllProducts();
  }

  _keyExtractor = (item, index) => item.id + "";

  _renderItem = ({item}) => {
    let data = this.state.products.find( product => product.id === item.productId);
    // console.log(data);
    data.quantity = item.quantity;
    data.refreshParent = this._onRefresh;
    // console.log(item);
    return (
      <Product
        id={item.id}
        name={data.name}
        data={data}
        nav={this.props.navigation}
      />
    )
  }

  updateIndex (current) {
    this._updateFridge(current);
  }

  render() {
    const buttons = ['Fresh', 'Expiring', 'Expired'];
    const { current } = this.state;
    return (

      <View style={styles.container}>
        <View >
          {/* <Text style={styles.filterItem}>Fresh</Text>
          <Text style={styles.filterItem}>Expires Soon</Text>
          <Text style={styles.filterItem}>Expired</Text> */}
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={current}
            buttons={buttons}
            containerStyle={{height: 40}}
          />
        </View>
        { this.state.refreshing ? <ActivityIndicator size="small"/> :
          <FlatList
            style={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  filterItem: {
    height: 25,
    width: 100,
    textAlign: 'center',
    backgroundColor: 'rgb(90, 200, 250)',
    color: '#fff',
    fontSize: 15,
  },
  listContainer: {
    flex: 1,
  }
});
