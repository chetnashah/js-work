

community/cli-platform-android has gradle logic for `applyNativeModules` which helps in auto linking.
`react-native config` is used by tools to auto Generate packages file in android and helps in autolinking.

In ios side, it is used via `cli-platform-ios/native_modules.rb` makes use of `react-native config` command to do autolinking.

## Podfile

In podfile we call `use_native_modules!` which is defined in `cli-platform-ios/native_modules.rb` and returns a full react-native config object.

Another important call made from Podfile is `use_react_native` which is defined in `node_modules/react-native/scripts/react_native_pods.rb`.
It is a Function that setup all the react native dependencies.

Finally in post_install hook, `react_native_post_install` is invoked, which also defined in `node_modules/react-native/scripts/react_native_pods.rb`.

## Many node_modules will contain android project/ ios podspec

A sample case where node_modules point to a podspec is following:
`/Users/jayshah/RNIntegrations/node_modules/appcenter/appcenter-core.podspec` whose contents looked like following:
```rb
require 'json'

package = JSON.parse(File.read(File.join(__dir__, './package.json')))

Pod::Spec.new do |s|
  # The name is hardcoded due to a name conflict, resulting in the error 'Errno::ENOENT - No such file or directory @ rb_sysopen - appcenter.podspec.json' error.
  # See https://github.com/microsoft/appcenter-sdk-react-native/issues/760
  s.name              = 'appcenter-core'
  s.version           = package['version']
  s.summary           = package['description']
  s.license           = package['license']
  s.homepage          = package['homepage']
  s.documentation_url = "https://docs.microsoft.com/en-us/appcenter/"

  s.author           = { 'Microsoft' => 'appcentersdk@microsoft.com' }

  s.source            = { :git => "https://github.com/microsoft/appcenter-sdk-react-native.git" }
  s.source_files      = "ios/AppCenterReactNative/**/*.{h,m}"
  s.platform          = :ios, '9.0'
  s.requires_arc      = true

  s.vendored_frameworks = 'AppCenterReactNativeShared/AppCenterReactNativeShared.framework'
  s.dependency 'AppCenterReactNativeShared', '~> 4.0'
  s.dependency 'React-Core'
  s.static_framework = true
end
```

pod declarations can optionally have a path telling where to look for the podspecs.
e.g.
```

```

