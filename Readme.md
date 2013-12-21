
# gravy

```js
gravy('project-name', 'user-name', 'access-key')
  .browser('ie9..11')
  .browser('safari')
  .browser('chrome')
  .browser('firefox')
  .reporter(gravy.reporters.grid())
  .test('http://localhost:3000');
```

![](https://i.cloudup.com/MQH9EeXAC3.png)

## Installation

  Install with [component(1)](http://component.io):

    $ component install yields/gravy
    $ npm install gravy

## API

### Gravy(project, user, key)

  Initialize with `project` name `user` and `key`.

#### #reporter(fn)

  Set the reporter.

#### #add / #browser

  Add a browser.

  ```js
  add('ie6...11');
  add('safari7');
  add('chrome');
  add('chrome31 OSX 10.9');
  ```

#### #test(url)

  Point webdriver at `url`.

## License

  MIT
