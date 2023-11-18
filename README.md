## Step 2

This is "Hello World" application.
It is based on `react` library which is nice library for building user interface based on component.

### Parametrized components

The way we define components imply that if the function has a parameter it can be used inside the function.
React components could be classes but components defined as functions are preferred.
Componets can have only one parameter. 
This parameter is dictionary. 
In case bellow, this dictionary is decomposed and value of key `user` is passed to body.
Parameters can have any type.

```js
export const UserSimple = ({user}) => {
    return (
        <div>Hello {user.name}</div>
    )
}
```
### Code structure

There are different approaches how to structure a code.
Avoid long files and try to place one component in one file.
Notice that directories can behave like a single file.
It is possible to export imported components.
By this way a really large libraries can be created.
It is also common to make more complex structures where components are grouped into variables which are exported.

```js
export * from './UserSimple'
```

### How to run
if not initilized:
```bash
npm init
```

then 

```bash
npm run start
```

### Conclusion

We introduce a component with parameters.