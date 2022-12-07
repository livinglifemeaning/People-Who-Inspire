# People Who Inspire Me
My first web application I made entirely myself, from conception, to design, to code! 

## Features
- Users can sign up with Google or with email and password, authenticated with Firebase

![Sign in ](https://i.ibb.co/7rjwZ8f/sign-in.png)
***
- Users can create boards about people who inspire them, with their data stored under a unique id only they can access, via Firebase's Realtime Database

![Homepage](https://i.ibb.co/NVdGxJ2/homescreen.png)
***
- Users add a new board or edit a current board by filling out a form. The board will be prefilled with existing data if its being edited, and form actions are handled within a reducer. 

![Form](https://i.ibb.co/LNdch7G/form.png)
***
- Users can delete and edit boards within account settings and also delete their account, which will remove their account as well as their data from Firebase

![Account Settings](https://i.ibb.co/Fwnp4NP/manage-boards.png)

## Known Issues

1. The authentification context and the boards' data context both wrap around the entire app. Ideally, the boards' data context should not wrap around the sign in screen. 

2. The UI uses dummy data before the user's data is loaded for the app to work. Ideally, the app should load until the user's data is fetched. Solving this issue relies on solving the first issue, however. 

3. The user's data deletes after a user delete's their account. However, Firebase does not allow deletion of account unless the user's sign in was recent. So if the user's last sign in is old, then the account won't be deleted and all the data will be deleted, causing the website to crash for that user. 

4. Form validation is done by use of an alert, but instead should be done within the UI itself, and this is just something I need to put some time into. 
