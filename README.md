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
