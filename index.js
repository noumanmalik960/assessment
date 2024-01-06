/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';

AppRegistry.registerComponent(appName, () => Signup);
