import SignUp from "../screens/SignUpScreen";
import ForgetPW from "../screens/ForgetPWScreen";
import Login from '../screens/LoginScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const stackNavigator = createStackNavigator(
    {
      loginScreen: Login,
      signUpScreen: SignUp,
      ForgetPWScreen: ForgetPW,
    },
    { headerMode: 'none', navigationOptions: { headerVisible: false } }
);

const WrapperNavigation = createAppContainer(stackNavigator)
export default WrapperNavigation;