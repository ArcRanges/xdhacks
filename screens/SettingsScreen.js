import React from 'react';

import {
  View,
  ScrollView,
  Text,
  Dimensions,
  PixelRatio
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "My Statistics"
  };

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

    this._getStatistics = this._getStatistics.bind(this);
    this._getInfridge = this._getInfridge.bind(this)
  }

  _getStatistics() {
    const url = 'http://foodapi20190209083632.azurewebsites.net/api/getStats';


  }

  _getInfridge() {
    const url = 'http://foodapi20190209083632.azurewebsites.net/api/getInfridge';
  }

  render() {
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      marginLeft: 5,
      marginRight: 5
    }
    const data = [
      { name: 'Wasted', population: 5, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Consumed', population: 70, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ]
    const data2 = [
      { name: 'Dairy', population: 5, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Vegetables', population: 70, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Meat', population: 70, color: 'pink', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Fruits', population: 70, color: 'purple', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ]
    return(
      <ScrollView>
        <PieChart
          data={data}
          width={width}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="white"
          paddingLeft="15"
        />
        <PieChart
          data={data2}
          width={width}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="white"
          paddingTop="20"
          paddingLeft="15"
        />
      </ScrollView>
    )
  }
}
