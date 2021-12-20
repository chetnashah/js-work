

### installl cocoapod

gem install cocoapods

### to see any products i.e. app, framework

Right click on item > Show package contents

### Create your own pod

`pod lib create myfirstpod` - creates pod according to a template.

answer some questions and it will launch xcode with your pod
1. add class inside podname > classes > Myfile.swift (adjacent to Replaceme.swift)
2. assets like images etc can go into podname > assets folder

### podspec 

describes library, including sources to be part of this library,
as well as dependencies of this library

```
#
# Be sure to run `pod lib lint myfirstpod.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'myfirstpod'
  s.version          = '0.1.0'
  s.summary          = 'A short description of myfirstpod.'

# This description is used to generate tags and improve search results.
#   * Think: What does it do? Why did you write it? What is the focus?
#   * Try to keep it short, snappy and to the point.
#   * Write the description between the DESC delimiters below.
#   * Finally, don't worry about the indent, CocoaPods strips it!

  s.description      = <<-DESC
TODO: Add long description of the pod here.
                       DESC

  s.homepage         = 'https://github.com/chetnashah/myfirstpod'
  # s.screenshots     = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'chetnashah' => 'jayshah67@gmail.com' }
  s.source           = { :git => 'https://github.com/chetnashah/myfirstpod.git', :tag => s.version.to_s }
  # s.social_media_url = 'https://twitter.com/<TWITTER_USERNAME>'

  s.ios.deployment_target = '9.0'

  s.source_files = 'myfirstpod/Classes/**/*'
  
  # s.resource_bundles = {
  #   'myfirstpod' => ['myfirstpod/Assets/*.png']
  # }

  # s.public_header_files = 'Pod/Classes/**/*.h'
  # s.frameworks = 'UIKit', 'MapKit'
  # s.dependency 'AFNetworking', '~> 2.3'
end
```