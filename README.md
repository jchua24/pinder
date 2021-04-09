
#### Basic credentials note:
We use an email/password login system. Because emails need the \@ symbol in them, the credentials cannot only have 'user' or 'admin' in the username, but 'user\@user' and 'admin\@admin' instead

#### Third party libraries
```material-ui, bootstrap, rc-slider, react-bootstrap, react-bootstrap-icons, react-card-flip, react-images-uploading, react-rounded-image, reactjs-popup, simple-react-lightbox, survey-react```

## Intro
This pet adoption platform is made for every-day users who wish to adopt a pet, as well as Clinics who have pets to 

### Home Page
This is the first page that you see. It has three main components to it.
1. The very top of the page is the navigation bar. At start, it only has two buttons: The "About" Button and the icon of a dog. Clicking on the Dog would redirect you to this current page that you are on, and "About" button would take you to the page about the creators of this website, which we will get to later in the readme.
2. The Center of the page greets you with a welcome message, following two buttons to Login and Signup. They are to either create new accounts to access our website or to go into existing accounts.
3. The lower part of this page is a carousel of pets displayed for attracting potential users for this pet adoption platform. These pictures however are for show and are not meant to be very interactive. There are arrows on the left and right ends of the carousel to navigate between the two sets of pets in case a user really likes to look at one of them.

### About
We will click on the "About" Button on the very top of the page. This page only has one thing to explain about:
1. It's an set of pictures about the creators of this page and the names.

#### User Signup
Click Back onto the Dog Icon on the navigation bar, and then click on the signup page. In here we will:
1. Fill in the form with some information. The following should work: (If it does not, choose a different email)
Name: John Smith
Email: john@email.com
Password: 123
PhoneNumber: 416-905-1800
Address: 100 John Street
City: Toronto
Province: Choose Ontario
Postal Code: A1B2C3
Registering a Clinic: No
2. Click the SignUp Button. This will create a user account. 
**Note: **After logging in, the icon of a dog on the navigation bar will redirect them to the Pet Adoption page described below instead of the home page
###### User Navigation bar update:
You are now greeted with the following new options:
1. Pet Adoption
    - Where you may search pets who needs to be adopted
2. User Applications
    - Where you may see all the pets you have considered for adoption.
3. Profile
    - On the right top corner, you may go to your profile

#### User Questionnaire
Upon Signup, a questionnaire is to be filled to have this applicant be more acquaintable with Clinics when they go to adopt a pet. This questionnaire has a few hidden interactions, explained in the following questions:
1. What is your Age group?
    - Choose your age group
2. Have you had a pet before? 
    - By selecting No, you may move onto question 3, but upon selecting Yes, you are brought up with another question.
    - It will ask if you in fact currently own a pet. By selecting Yes, it brings you two more question.
    - It will ask you how many pets you currently own and if they are up to date with vaccines.
        - You may only input numbers in 'How many pets do you currently own'
        - You may choose either yes or no in 'Are your pets up to date with vaccines'
3. What best describes your living environment?
    - Choose the environment most closely described to your living condition
4. Please input the number of people in your household in their age group:
    - Any number for all three inputs are fine
5. Do you have access to a Veterinarian?
    - By selecting No, you may move onto question 6, but upon selecting Yes, You are brought up with another question.
    - It will ask how often should your pet be examined by a veterinarian
        - You may choose any of the options
6. What is the best diet for your pet?
    - This question is meant to have a preference for pets that you adopt. Some pet owners strictly prefer a vegetarian diet for themselves and would not be able to prepare a carnivorous diet for their pet.
7. How much do you think you'll spend annually on your pet?
    - Choose any of the options
8. It is very important that my pet...
    - Select any of the following
9. Which of the following would you be willing to train your pet with?
    - Select any of the following
10. Please Input your Full Legal Name
    - This is a signature to acknowledge the person who filled this questionnaire. This in theory may be different than the name of the profile because it may be a different person who fills this questionnaire, but is the same party as the user.
Upon clicking Preview, you will be notified if you left any questions blank. If you did not, then you are able to preview your submittions before finally clicking Complete. Upon clicking Complete, you are redirected to the Pet Adoption page described below.

#### User Pet Adoption


#### User Applications 
Each application is formatted as a card.
1. On the left side of the card, we have a picture of the pet and below it, a cancel application button. Below that, a status. This status turns into approved if the clinic decides that this user is a good adopter for this pet. If the user changes decision and no longer wishes to pursue this pet, they may press the cancel button.
2. On the right side of the card, we have the name of the cat and a comment about it. By mousing over this region, the card shows more detail about this pet.

#### User Profile
By clicking the profile icon on the very top right on the navigation bar, we have two options: Profile and LogOut. Press the profile button
Here you will see a profile Icon, which is filled with blue by default. There are three tabs here:
1. User Info
    - Has your email, address, city, and province. You may also upload your own profile picture here
2. Preferences
    - Can declare an age preference, a radius preference, and preference of pet types
3. Applications
    - A redirect button to the questionnaire that you have filled it before. By pressing this, you can fill it out again, but your previous options are filled in there for you so you do not have to refill the same answers every time
    
#### Logout
By clicking the profile icon on the very top right on the navigation bar, we have two options: Profile and LogOut. Press the Logout button
Here you are greeted with a confirm message. Press Yes. This will bring you back to the home page.

#### Admin Login
We will use the following credentials to login
Email: admin\@admin
Password: admin
**Note: **After logging in, the icon of a dog on the navigation bar will redirect them to the Applications page described below instead of the home page
###### Admin Navigation bar update:
You are now greeted with the following new options:
After logging in, you are redirected to the Admin Applications page and your navigation bar is updated with the following:
1. Applications
    - The admin applications page
2. Post a pet
    - Where admins can put pets up for adoption
3. Profile
    - On the right top corner, you may go to your profile
#### Admin Applications
This page is to organize all of the applications by users for the pets that this clinic offers. The cards in this page is very similar to the User Applications cards, which one major difference: The ability to accept and reject an application. By pressing accept, the User sees the approved status, and by pressing reject, the status becomes rejected from the User's side.

#### Admin Post a pet 
On the navigation bar, there exists a button that says "Post a Pet".
In here, the admin may put a pet up for adoption. It has the following questions:
1. Affiliated Clinic
    - A read only field that displays the name of the clinic
2. Name
    - The name of the Pet
3. Pet Type
    - A dropdown that displays the types of pet, such as 'dog' or 'cat'
4. Breed
    - The breed of the pet. Example: Golden Retriever
5. Age
    - The number of human years that it has lived
6. Additional Pet Information
    - A large field for special instructions for this pet, for the user to acknowledge
7. Additional Clinic Descriotipn
    - For the user to understand more about the adoption process at this particular clinic, or any additional information
8. Images
    - On the right hand side, the admin may put in as many pictures as they want by clicking "Click or Drop here" or dropping the image directly on the button. It will highlight red if it detects the image being hovered over while being dragged by the mouse
9. Submit
    - With all fields made, you can put it up for adoption, and the User will see it in the User Pet Adoption

#### Admin Profile
By clicking the profile icon on the very top right on the navigation bar, we have two options: Profile and LogOut. Press the profile button
This page is very similar to the User Profile. Here you will see a profile Icon, which is filled with blue by default. There is however only one tab:
1. User Info
    - Has your email, address, city, and province. You may also upload your own profile picture here
An admin does not require the other functionality such as 'preferences' or 'questionnaire' since the admin does not need either.

## Notes on progress made from phase 1

#### Improvement of UI 
1. The home page was very minimalistic before, featuring only a carousel and a login button. We have added extra styling to have a background picture and made the styling fit all the content into one screen
2. User and Admin Applications look like actual cards that have interactivity upon hovering. This is a significant improvement to the previous design, where there was no interactivity other than a button to remove the application.

#### New features
In addition to backend implementation...
1. Questionnaire
    - In addition to basic information, a large questionnaire was made for the user to fill, and for the admins to see so that the admins have more than just basic information to look upon when deciding which applicant may adopt the pet.
2. 

TIDI:
Briefly explain any edits you made to the features and any new features, how end user would use them (separate instruction for user and admin) and any other info about phase 2








Basic Functionalities for Admin Users (in sequential order): 

1. Posting a pet (http://localhost:3000/postapet): this is the page that admin users would use to post a pet. Filling out the form with the applicable info, would add this new pet to the list of pet postings that the clinic has made available for regular users. 

2. Viewing Applications (http://localhost:3000/adminapps): allows users to view applications they have previously posted. 






