import 'react-native-gesture-handler';
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
import CustomDrawer from '../Component/Drawer';
import Caro from '../screens/Game/Caro';
import ChessBoard from '../screens/Game/Chess/ChessBoard';

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

const stackNavigator = createStackNavigator(
  {
    bottomScreen: BottomNavigator,
    chatScreen: Chat,
    ImageZoomScreen: ImageZoom,
    VideoCallScreen: VideoCall,
    SoundPlayerScreen: SoundPlayer,
    CaroScreen: Caro,
    ChessScreen: ChessBoard,
  },
  { headerMode: 'none', navigationOptions: { headerVisible: false } }
);

const DrawerNavigator = createDrawerNavigator(
  {
    MainStack: stackNavigator
  },
  {
    contentComponent: CustomDrawer,
    drawerWidth: 200,
    
  }
)

const AppNavigation = createAppContainer(DrawerNavigator);
export default AppNavigation;