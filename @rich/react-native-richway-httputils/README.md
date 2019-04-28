
# react-native-richway-httputils

## Getting started

`$ npm install react-native-richway-httputils --save`

### Mostly automatic installation

`$ react-native link react-native-richway-httputils`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-richway-httputils` and add `RNRichwayHttputils.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNRichwayHttputils.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNRichwayHttputilsPackage;` to the imports at the top of the file
  - Add `new RNRichwayHttputilsPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-richway-httputils'
  	project(':react-native-richway-httputils').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-richway-httputils/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-richway-httputils')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNRichwayHttputils.sln` in `node_modules/react-native-richway-httputils/windows/RNRichwayHttputils.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Richway.Httputils.RNRichwayHttputils;` to the usings at the top of the file
  - Add `new RNRichwayHttputilsPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNRichwayHttputils from 'react-native-richway-httputils';

// TODO: What to do with the module?
RNRichwayHttputils;
```
  