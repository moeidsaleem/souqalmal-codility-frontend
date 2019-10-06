# Souqalmal Codility Frontend 

The project is based on Angular Material similar to the design request in the mockups, However, i have added login/signup components as extras. Also another addition of logout button in the dashboard, The dashboard is persistant based upon the token. 

Due to the constraint of time, I tried to complete the frontend in a hurry and because of that i had missed  good practice scenarios and defining proper types of some of the components. 


I have worked with many Design systems while Ant Design being my favorite. If the following code is not sufficient enough, You can go through my opensource contributions. 



## Working Modules 

- User can login ✅
- User can signup ✅ 
- User location update ✅ 
- Get Shops by distance ✅ 
- Like shops ✅ 
- user can logout ✅ 
- Fetching distance ✅ 



## Tools
- Angular 8 
- Angular Material


### Architecture 

The project consist of 3 modules which includes 
- **Login Module** - contains user authentication signin logic.
- **Signup Module** - containers user registration logic
- **Dashboard Module** - Cotains fetch nearby shop logic 

Services are as followed 
- **Helper Service** - Helping functions
- **API Service**  - All Http API calls 


Interfaces 
- **Shop**
- **User** 




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

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
