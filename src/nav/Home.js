import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Animated,
  Dimensions
} from 'react-native'

import { connect } from 'react-redux'

import { colors, fonts } from '../theme'
const { width, height } = Dimensions.get('window')

class Home extends React.Component {
  static navigationOptions = {
    header: null
  }
  AnimatedScale = new Animated.Value(1)
  componentDidMount() {
    this.animate()
  }
  navigate() {
    this.props.navigation.navigate('Route1')
  }
  animate() {
    Animated.timing(
      this.AnimatedScale,
      {
        toValue: .8,
        duration: 1250,
        useNativeDriver: true
      }
    ).start(() => {
      Animated.timing(
        this.AnimatedScale,
        {
          toValue: 1,
          duration: 1250,
          useNativeDriver: true
        }
      ).start(() => this.animate())
    })
  }
  render() {
    const { userConfirmed } = this.props
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>Welcome</Text>
          <Animated.Image
            source={require('../assets/boomboxcropped.png')}
            style={{ tintColor: colors.primary, width: width / 2, height: width / 2, transform: [{scale: this.AnimatedScale}]}}
            resizeMode='contain'
          />
          {
            !userConfirmed && (
              <Text style={styles.registration}>Please check your email to confirm your registration</Text>
            )
          }
          {/* <Text onPress={this.navigate.bind(this)}>Navigate</Text> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  welcome: {
    fontFamily: fonts.light,
    color: 'rgba(0, 0, 0, .85)',
    marginBottom: 26,
    fontSize: 22,
    textAlign: 'center'
  },
  registration: {
    fontFamily: fonts.base,
    color: 'rgba(0, 0, 0, .5)',
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Home)