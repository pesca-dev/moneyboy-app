# MoneyBoy App

[![Build](https://github.com/H1ghBre4k3r/moneyboy-app/actions/workflows/build.yml/badge.svg)](https://github.com/H1ghBre4k3r/moneyboy-app/actions/workflows/build.yml)
[![Docs](https://github.com/H1ghBre4k3r/moneyboy-app/actions/workflows/docs.yml/badge.svg)](https://h1ghbre4k3r.github.io/moneyboy-app)
[![iOS](https://github.com/H1ghBre4k3r/moneyboy-app/actions/workflows/ios.yml/badge.svg)](https://github.com/H1ghBre4k3r/moneyboy-app/actions/workflows/ios.yml)
[![Android](https://github.com/H1ghBre4k3r/moneyboy-app/actions/workflows/android.yml/badge.svg)](https://github.com/H1ghBre4k3r/moneyboy-app/actions/workflows/android.yml)

MoneyBoy is a cross-platform app for tracking spending between groups of people.

## Development

First, make sure to have the following installed on your system:

* Node.js and NPM
* Ruby and Bundler (for Fastlane)
* Python 3 (for scripts)
* For iOS development:
  * Xcode
  * Homebrew
* For Android development:
  * Java

To bootstrap a development environment, run `scripts/setup --ios` or `scripts/setup --android`, depending on which platform you want to build for. This should e.g. generate the corresponding Xcode project and install the required dependencies.

To run the application, you can now e.g. use `npm run ios` or `npm run android`, or directly run the project from Xcode, in case you develop for iOS.

To build the application from the command line, you can use the provided build lanes with `fastlane`, or invoke `xcodebuild`/`gradle` directly. Refer to the [CI workflows](.github/workflows) for examples.

For further instructions, check out [the official docs](https://reactnative.dev/docs/environment-setup).
