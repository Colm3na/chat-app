#Errors encountered:

1. Can't bind to 'ngModel' since it isn't a known property of 'input':

According to the Angular's official documentation, 'Although ngModel is a valid Angular directive, it isn't available by default'. This means we need to import the FormsModule in the app.module.ts.

```
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
```
and then add it to our imports:

```
@NgModule({
    imports: [FormsModule]
```

IMPORTANT: every time a change is made to the app.module.ts a complete restart of the Angular app is needed. It won't be automatically applied. You need to kill the process and run 'ng serve' again.

IMPORTANT-II: in my case I also needed to add
```
import { FormsModule } from '@angular/forms';
```
in the auth.module.ts, as I was reaching this component through the auth-routing.module.

2. Can't bind to 'formGroup' since it isn't a known property of 'form'.

formGroup is a selector for directive named FormGroupDirective that is a part of ReactiveFormsModule, hence the need to import it (in our module). It is used to bind an existing FormGroup to a DOM element.

Answer found in: https://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form

3. Access to XMLHttpRequest ... has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

I could find the solution to this quite easily with a quick search. The problem lies on the fact that the request to the server is being made from another source different that the one of the server. In this case another localhost port. As explained in this blog post (https://daveceddia.com/access-control-allow-origin-cors-errors-in-angular/), the quickest solution for this is to change the server's configuration to add the header 'Access-Control-Allow-Origin: *'. That is, if you have access to the server.

The code to add this header within the Express framework is:

```
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```

4. TypeError: Cannot read property 'data' of undefined.
When trying to pass the token through the token service, using the ngx-cookie-library.

5. Uncaught ReferenceError: typing is not defined
    at HTMLInputElement.onchange (chat:19)

I was using the 'onchange' attribute on the input for the chat and getting this error. The reason for it is that in Angular these attributes have a slight different syntax. In short, we need to write them withouth the 'on' before the target event name and then this one inside parentheses. More on that in the official documentation: https://angular.io/guide/template-syntax#event-binding.

6. Access to XMLHttpRequest at 'http://localhost:3000/api/chatapp/username/${username}' from origin 'http://localhost:4200' has been blocked by CORS policy: Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response.

I was missing 'Authorization' as part of the "Access-Control-Allow-Headers" in my CORS options.

7. CSS not being applied to dynamically created HTML elements.

I was generating li elements in my message.component.ts file to create the chat bubbles. CSS wasn't being reflected. Apparently, this is due to how Angular is rendering files. The workaround to this can be found in this StackOverflow post: https://stackoverflow.com/questions/36265026/angular-2-innerhtml-styling.
In my case, I just needed to add ':host ::ng-deep' before the 'li' selector in my stylesheet file, like this:

```
:host ::ng-deep li {
  ...
}
```

8. "repassword" is not allowed

When trying to sign up a new user I got this error. It was because I was sending 'repassword' as part of the user object, while in the auth controller it wasn't being reflected.
The quick fix for this was deleting this property with the delete operator before calling the auth service.

# ChatApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
