This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Fancy Broker Agency

The original task is [here](https://github.com/allquantor/sc-frontend-challenge)

A working prototype is available [here](https://antonlapshin.github.io/fancy-broker-agency/)

A few notes:

* Random delays have been added to make possible seeing asynchronous processes when getting the mock data (Home and Contacts page). Widgets are loaded and calculated simultaneously.

* It is possible to click at Google Maps markers and rows of the table on the Contacts page to go to the Contact page (the page is not implemented though)

* For full-text search [Fuse.js](http://fusejs.io/) library was used which is configurable and that works pretty nice with default config even though you might not expect sometimes why you are getting certain results :) 

* All components (`src/components/` folder) were implemented in a separate [project](https://github.com/AntonLapshin/react-component-viewer/tree/fancy-broker). The live demo of the sandbox station is available [here](https://antonlapshin.github.io/react-component-viewer/). Some thoughts about this idea I put in a post on medium.com which is available here https://medium.com/@antvallap/how-to-create-clean-and-reusable-react-components-in-your-project-9885cbc29dde

* I spent more than 4 hours (~14 hours) but I think I did pay too much attention to the details because I was really enjoying and wanted to do a good job. 

# Instruction

## Install

```
yarn install
```

## Test

```
yarn test
```
The script also starts tests watcher automatically

## Start 

```
yarn start
```

## Build

```
yarn build
```

## Pull components from [Components viewer station](https://github.com/AntonLapshin/react-component-viewer/tree/fancy-broker)

```
yarn pull-components
```

A few notes:

* Note: The Component viewer project has to be configured. Follow the instruction in the readme section of the mentioned GitHub repo. 

* This step is not required. The components could be modified directly in the project if you do not want to follow that nice concept of working on components independently.

# Answers

> What are the critical structures of the application, what are the possible bottlenecks, what you had did when you had more time. We are curious of your thoughts!

* This is just a prototype that of course works nicely with small amount of data. Even though UI is not blocked by any sync action in the APP (there are some, but we can easily fix that) the bottleneck is definitely in getting big amount of data from the server and manipulating the data on the client side. Considering a really big amount of data I would prefer to implement a real server side pagination and search requests. By this we can guarantee that we deliver a small amount of data to the client which will make the app work really fast. It would also make sense to move the heavy math operations (std, full-text search) to the web workers. This is a perfect tool for that. Depending on the server side and client side roles in that of course.

* Server side rendering would also help to improve the loading time additionally to the other common practices (code splitting, tree shaking, caching and many more)

* If I had more time I would also go with another styles approach, maybe something more modular, Styled components for instance.

* TypeScript or Flow would be definitely a move forward. 

* Having a global state (redux or context) would be very practical (Time travelling, easy debugging, immutability that can be provided by Immutable.JS, minimizing side effects)

* I don't like so much that handmade solution for the client-server communication that I created. Eventually it will grow to a real framework then why don't use something tried-and-true that is already out there and supported by the community (Redux Saga, Apiary, RxJs or something else).

Have you got bored to death reading the whole thing? Hope not. xD

