# Honestly

It’s time for all of us to do business and consume, Honestly.

## Video
********
[![Rechargd: a proposed aid to climate change. Video edited and voiced by Connor Russell (University of Sydney).](./images/video-thumbnail.png)](https://youtube.com)
Video edited and voiced by Connor Russell (University of Sydney).

## Contents

1. [Whats's the Problem?](#what's-the-problem?)
2. [Solution](#solution)
3. [Diagrams](#diagrams)
4. [Documents](#documents)
5. [Technology](#technology)
6. [Getting started](#getting-started)
7. [License](#license)

## What's the Problem?

Despite a growing demand from consumers for ethical, sustainable and transparent business practices, there exists no simple and effective means to reliably display how businesses operate. Thus, consumers are unable to easily identify and avoid practices that they may disagree with. This problem has been proliferated throughout covid, particularly with the rise in online shopping. 

For example, Yash, one of the young online shoppers we interviewed, was horrified to find out that his regular online purchases might support modern slavery, water wastage or excessive carbon emission. Yash is not alone, and as the global material footprint rose nearly 18 percent from 2010 to 2017 (UN), supply chain management is a bigger problem now than ever before. 


## Solution
### The Idea

Introducing “Honestly”! Honestly is an online browser extension aimed at passing supply chain transparency to individuals like Yash. It acts as an assistant throughout the shopping process, altering the user to any bad news that the brand has been linked to, displaying a list of relevant ratings compiled from external bodies, and aggregating and benchmarking supply chain data on the selected product against industry standards. This is all displayed in a purposefully impartial and digestible form, to support the user in their decision making process. 

Furthermore, for a small subscription fee, Honestly provides businesses a verified platform to share ethical or sustainable practices, thereby building positive brand value and attracting more customers. In particular, as 9 in 10 Australian consumers are more likely to “purchase ethical and sustainable products” (CouriersPlease Survey), there exists a legitimate business case for adoption.

### How it works

The goal of the application is to provide a convenient EV recharging solution for all EV drivers, while enabling charging station owners to register on the app and earn a profit by renting out their charging station to other EV drivers.
 
A user has the option of registering as a “driver” or “provider” or as both. The user can choose to login as a driver or provider, and can easily switch between their two accounts at any time. 
 
As a driver, the user would be able to locate available nearby charging stations on the app’s live interactive map. When the driver clicks on their preferred station, they can see more details about the station (including a rating out of 5 stars), and can make a booking to charge their car at designated times. The driver will receive a reminder when it approaches the time they have booked. After recharging their car, the driver will have the option of rating the station provider out of 5 stars, and provide a short review of their charging experience.
 
As a provider, the user can list their charging station, including the availability times. After listing their station, other users will be able to locate their station on the app’s live interactive map, and make a booking during the available times. Providers can also manage their bookings on the app. Drivers and providers can message each other, enabling drivers to ask questions (such as about speed of charge, location etc.) prior to, during and after the charge. 
 
Payment will be made via the app. 

### Existing Solutions
Almost no solutions encompassing our entire functionality exist. Thus, Honestly remains superior to any existing solution as it simply aggregates and displays essential metrics to users, rather than collecting or assessing data and passing judgements.

Good on you is an example of a relatively similar local solution. It acts as a rating platform that collects data and produces ethicality ratings on various fashion brands. Despite offering similar insights, organisations like Good on you often operate solely as a website, requiring users to actively seek out its information, rather than being passively updated throughout their regular browsing. Furthermore, they don’t offer users the ability to further research their findings, which Honestly allows through its newsAPI interface. As such, Honestly has the potential to become the go-to platform for Good on You and the many other certifying and rating organisations out there.

## Diagrams
![CFC_Subcomp_2021_Architectural_Diagram](https://user-images.githubusercontent.com/74993848/127756954-03944d9d-478c-4539-8a99-946fbf5ae7ef.png)

This solution is an all-in-one sharing platform, built on a React Native front-end and Node back-end, and integrating Google Maps, Auth0, Stripe and Twilio. It is hosted on the IBM Cloud.

1. The user launches the mobile app and can either list their station or rent out a station.
1. The user can either search their nearby vicinity, a specific location or en route to a location for charging stations. Furthermore, when listing stations they can be geocoded and reverse geocoded as needed.
1. The user can login securely, and trust that their details are in good hands.
1. The user can trust that their payment details are handled securely.
1. The user can message their renter easily in case of any issue, and can easily authenticate their account.

## Documents

- [ClimateWorks Australia “The State of Electric Vehicles in Australia” report](https://www.climateworksaustralia.org/wp-content/uploads/2018/06/climateworks_australia_state_of_electric_vehicles2_june_2018.pdf)
- [The Guardian “Electric cars produce less CO2 than petrol vehicles, study confirms” article](https://www.theguardian.com/environment/2020/mar/23/electric-cars-produce-less-co2-than-petrol-vehicles-study-confirms)
- [The Driven - “Norway horrified as new rates make ev charging prices higher than petrol” article](https://thedriven.io/2020/01/20/norway-horrified-as-new-rates-make-ev-charging-prices-higher-than-petrol/)

## Technology
Honestly is run on a Node engine with a Sequel database.The critical news events are scraped by the News API and parsed by the Watson Natural Language Understanding engine. Ratings are pulled from various APIs and the web. The supply chain information of each individual product is plugged through a key into the business’ supply chain management software, and compared against industry benchmarks.

**IBM Cloud Services**
- [IBM Watson Natural Language Understanding](https://www.ibm.com/cloud/watson-natural-language-understanding)
- [IBM Cloud Foundry](https://www.ibm.com/au-en/cloud/cloud-foundry)
- [IBM PostgreSQL Database](https://www.ibm.com/au-en/cloud/databases-for-postgresql)

**IBM Blockchain Services**
- [IBM Food Trust](https://www.ibm.com/au-en/blockchain/solutions/food-trust)

**News**
- [News API](https://newsapi.org/)

**Wikipedia**
- [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki)

**Auth0**
- [Auth0 Universal Login](https://auth0.com/universal-login/)

**Ratings APIs**
- [ESG API](https://www.esgenterprise.com/esg-analytics/esg-api-developer/)

**Javascript**
- [Vue.js](https://vuejs.org/)
- [Node.js](https://nodejs.org/en/)

## Getting started

Use the following steps to get Honestly Extension up and running.

### Prerequisite

- Install [Google Chrome](https://www.google.com.au/intl/en_au/chrome/)
- Install [Node.js](
- Install [React Native CLI dependencies](https://reactnative.dev/docs/getting-started.html).
    - [Node.js](https://nodejs.org/en/)
    - [Watchman](https://facebook.github.io/watchman/docs/install)
    - **iOS only**
        - [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
        - [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
    - **Android only**
        - [Java Development Kit](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html)
        - [Android Studio](https://developer.android.com/studio/index.html) - add Android 9 (Pie) SDK & configure `ANDROID_HOME`
        - [Create an Android Virtual Device (AVD)](https://developer.android.com/studio/run/managing-avds.html) - with Pie image (API Level 28)
- Clone the [repository](https://github.com/Call-for-Code/Solution-Starter-Kit-Disasters-2020).

### Run the mobile application on Expo

To run the mobile application (using the Xcode iOS Simulator or Android Studio Emulator):

From a terminal:
1. Go to the root directory.
1. Install the dependencies: `npm install`.
1. **iOS only**: Go to the `ios` directory: `cd ios`.
1. **iOS only**: Install pod dependencies: `pod install`.
1. **iOS only**: Return to the `mobile-app` directory: `cd ../`.
1. Launch the app in the simulator/emulator:
    - **iOS only**: `npm run ios`
        > **Note**: You should be running at least iOS 13.0. The first time you launch the simulator, you should ensure that you set a Location in the Features menu.
    - **Android only**: `npm run android`
        > **Note**: Your Android Studio needs to have the `Android 9 (Pie)` SDK and a `Pie API Level 28` virtual device.


## License

This solution is made available under the [Apache 2 License](LICENSE).
