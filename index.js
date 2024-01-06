/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Signup from './src/screens/Signup';

AppRegistry.registerComponent(appName, () => Signup);
