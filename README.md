## Step 1

This is "Hello World" application.
It is based on `react` library which is nice library for building user interface based on component.

### Structure

There is directory `public` where are static files. Check `index.html`. It contains minimal html code.
The js code is injected at end of head tag.

The source code (javascript) is placed in `src` directory. By default `index.js` is entry point.
Notice imports, especially `App` which is the first coded component.

```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

### React component

The code bellow (taken from file `app.js`) is exported constant. 
The value is anonymous function.
Return value is html segment.

```js
export const App = () => {
    return <div>Hello World</div>
}
```

### Conclusion

Now you have an application which returns `Hello world` on html page.