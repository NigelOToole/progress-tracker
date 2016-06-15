# SASS Progress Tracker

A progress tracker written in SASS with flexbox to be flexible and responsive out of the box. This can be used to illustrate a multi stage process e.g. form, quiz or a timeline.


##Installation

###npm
```javascript
$ npm install progress-tracker --save-dev
```

###bower
```javascript
$ bower install progress-tracker --save-dev
```


##Usage
Once you have downloaded the code, you can run $ npm install and $ gulp serve to run this demo.

You can also just import progress-tracker.scss into your own project and modify as needed. Optional files are progress-tracker-animations.scss to add animations and progress-tracker-theme.scss for quicker theming.

Follow the code example below for basic usage, each demo sets the first two steps as complete, the third step as active and the last two steps as inactive. For additional styles add a modifier classes to the ul and add additional markup as needed in the examples.

```html
<ul class="progress-tracker">
  <li class="progress-step is-complete">
    <span class="progress-marker"></span>
  </li>
  <li class="progress-step is-complete">
    <span class="progress-marker"></span>
  </li>
  <li class="progress-step is-active">
    <span class="progress-marker"></span>
  </li>
  <li class="progress-step">
    <span class="progress-marker"></span>
  </li>
  <li class="progress-step">
    <span class="progress-marker"></span>
  </li>
</ul>
```


### License
MIT © Nigel O Toole
