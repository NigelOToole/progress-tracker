# SASS Progress Tracker
### A HTML component to illustrate the steps in a multi step process e.g. a multi step form, a timeline or a quiz.

### [View demo](http://nigelotoole.github.io/progress-tracker/)



## Installation

```javascript
$ npm install progress-tracker --save
```

### Import

After installation you can import it into your SASS files with the statement below.

```scss
@import "node_modules/progress-tracker/src/styles/progress-tracker.scss";
```

The JS that is part of this site is just for demonstration purposes, add your own JS as needed to toggle the classes for the step states.

### Markup

Follow the HTML code example below for basic usage; each demo sets the first two steps as complete, the third step as active and the last two steps as inactive.

For additional styles add modifier classes and additional markup as needed in the examples below. You can add multiple modifier classes to achieve additional styles that those shown below.

```html
<ul class="progress-tracker">
  <li class="progress-step is-complete">
    <div class="progress-marker"></div>
  </li>
  <li class="progress-step is-complete">
    <div class="progress-marker"></div>
  </li>
  <li class="progress-step is-active">
    <div class="progress-marker"></div>
  </li>
  <li class="progress-step">
    <div class="progress-marker"></div>
  </li>
  <li class="progress-step">
    <div class="progress-marker"></div>
  </li>
</ul>
```


### Demo site

Clone or download from Github.

```javascript
    $ npm install
    $ gulp serve
```


### License
MIT © Nigel O Toole
