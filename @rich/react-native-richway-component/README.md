
# react-native-richway-component

## Getting started

`$ npm install react-native-richway-component --save`

### Mostly automatic installation

`$ react-native link react-native-richway-component`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-richway-component` and add `RNRichwayComponent.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNRichwayComponent.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNRichwayComponentPackage;` to the imports at the top of the file
  - Add `new RNRichwayComponentPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-richway-component'
  	project(':react-native-richway-component').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-richway-component/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-richway-component')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNRichwayComponent.sln` in `node_modules/react-native-richway-component/windows/RNRichwayComponent.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Richway.Component.RNRichwayComponent;` to the usings at the top of the file
  - Add `new RNRichwayComponentPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNRichwayComponent from 'react-native-richway-component';

// TODO: What to do with the module?
RNRichwayComponent;
```
  