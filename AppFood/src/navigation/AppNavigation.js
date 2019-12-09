
import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Mess from '../screens/Messenger';
import Chat from '../screens/ChatScreen';
import VideoCall from '../screens/ChatComponent/VideoCall';
import SoundPlayer from '../screens/ChatComponent/SoundPlayer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import ImageZoom from '../Component/ImageZoom';
import FooterTab from '../Component/Footertab';

const BottomNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: Home,
    },
    ProfileScreen: {
      screen: Profile,
    },
    MessScreen: {
      screen: Mess,
    }
  },
  {
    tabBarComponent: FooterTab
  }
)

const DrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: Home,
    ProfileScreen: Profile,
  }
)

const stackNavigator = createStackNavigator(
  {
    bottomScreen: BottomNavigator,
    chatScreen: Chat,
    drawer: DrawerNavigator,
    ImageZoomScreen: ImageZoom,
    VideoCallScreen: VideoCall,
    SoundPlayerScreen: SoundPlayer
  },
  { headerMode: 'none', navigationOptions: { headerVisible: false } }
);
const AppNavigation = createAppContainer(stackNavigator);
export default AppNavigation;