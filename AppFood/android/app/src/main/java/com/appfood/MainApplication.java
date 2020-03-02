package com.appfood;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
// import com.oney.WebRTCModule.WebRTCModulePackage;
import com.facebook.react.ReactApplication;
import com.rnfingerprint.FingerprintAuthPackage; //<- Dòng này
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;//<- Dòng này
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;//<- Dòng này
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// import com.twiliorn.library.TwilioPackage;
// import com.rnim.rn.audio.ReactNativeAudioPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          // packages.add(new SplashScreenReactPackage());
          packages.add(new RNFirebaseMessagingPackage());//<- Dòng này
          packages.add(new RNFirebaseNotificationsPackage());//<- Dòng này
          // packages.add(new TwilioPackage());//<- Dòng này
          // packages.add(new ReactNativeAudioPackage());
          // packages.add(new WebRTCModulePackage()); // <-- Add this line
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
