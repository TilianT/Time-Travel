# time-travel

## Sortable post list and List of commited actions
The left side component (post list) should load its initial state from https://jsonplaceholder.typicode.com/posts,
allow the user to update the state via manipulating the UI, and emit the list of actions committed on the right side component (list of actions committed). 

### Functional requirements
- Only the first 5 posts should be displayed.
- Cell titles should be named as `Post id`, where `id` is set by the `id` of a post on https://jsonplaceholder.typicode.com/posts, e.g. `Post 1`.
- The order of the posts can be changed by clicking the up/down arrows.
- When a user changes the order of the posts, the action should be added to the top of the “List of actions committed” component on the right.
    - e.g. When a user moves the `Post 1` below `Post 2`, then an action card saying “Moved `Post 1` from `index 0` to `index 1`” should be added to the top of the list.
- Users can can click on the “Time Travel” button on one of the action cards, which rewinds the order of the posts as it was before that action was taken. This action should also remove the clicked action card and the action cards above that.

## Demo
[Time Travel app](https://main--sparkly-dieffenbachia-f3b1c4.netlify.app/)

## Technologies
### Uses Node: v16.14.0 (npm v8.3.1)
### I used this instruments:
- `Vue 3` + `TypeScript` + `Scss`.
- `normalize.css` for the default styles reset.
- `Pinia` as a state manager.
- `Jest` for Unit Testing.
- `BEM` for the style naming convention.

## Accessibility
![Lighthouse](/images/lighthouse.png)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
