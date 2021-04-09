TODO:
Include detailed instructions on how to go use the app, the role of users, and use ALL features

This pet adoption platform is made for every-day users who wish to adopt a pet, as well as Clinics who have pets to 

##### Home Page
This is the first page that you see. It has three main components to it.
1. The very top of the page is the navigation bar. At start, it only has two buttons: The "About" Button and the icon of a dog. Clicking on the Dog would redirect you to this current page that you are on, and "About" button would take you to the page about the creators of this website, which we will get to later in the readme.
2. The Center of the page greets you with a welcome message, following two buttons to Login and Signup. They are to either create new accounts to access our website or to go into existing accounts.
3. The lower part of this page is a carousel of pets displayed for attracting potential users for this pet adoption platform. These pictures however are for show and are not meant to be very interactive. There are arrows on the left and right ends of the carousel to navigate between the two sets of pets in case a user really likes to look at one of them.

##### About
We will click on the "About" Button on the very top of the page. This page only has one thing to explain about:
1. It's an set of pictures about the creators of this page and the names.

##### User Signup
Click Back onto the Dog Icon on the navigation bar, and then click on the signup page. In here we will:
1. Fill in the form with some information. The following should work:
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

##### First Questionnaire
Upon Signup, a questionnaire is to be filled to have this applicant be more acquaintable with Clinics when they go to adopt a pet. This questionnaire has a few hidden interactions, explained in the following questions:
1. What is your Age group?
    - Choose any age group
2. By selecting Yes

TIDI:
Briefly explain any edits you made to the features and any new features, how end user would use them (separate instruction for user and admin) and any other info about phase 2







List of Third-Party Libraries Used: material-ui, bootstrap, rc-slider, react-bootstrap, react-bootstrap-icons, react-card-flip, react-images-uploading, react-rounded-image, reactjs-popup, simple-react-lightbox, survey-react


Basic Functionalities for Regular Users (in sequential order): 



1. Login - To log in, click on the "Please login or create an account" prompt or the "Login" link in the upper left corner. The credentials are (email: test@test.com, password: test). Then, press the Login button. 

The landing page is the main view for regular users, which consists of a swiper that allows users to browse through various animals. 

2. Browsing Pets - Users can interact with the swiper by clicking on any of the 3 images of the pet at the bottom to view them in greater detail. Users can also click the icon next to the animal's name to flip the card and see more details about the animal. 

3. Applying for pet - Users can submit an application for a pet by clicking the blue 'Apply' button on the back of any pet card. This will prompt the user to enter any messages, and then submit their application. For now, the user remains on the swiper page after submission, which may change in future iterations. 

4. Viewing Profile - Users can view their profile by clicking on the user icon in the top right of the page, and then selecting 'Profile'. This brings the user to the profile page which has 3 sections. 

5. Changing Profile Pic - click on 'Add/Change Profile Pic' button in the 'User Info' tab, then upload an image. Profile pictures can be removed by clicking on the 'Remove Profile Pic' button. 

6. Changing User Preferences - in the user preferences tab on the profile page, users can select their preferred pet age by using the top slider, as well as their distance preferences using the second slider. They can also choose their pet type preferences using the top dropdown, and search for specific pet clinics in the lower dropdown. 


Basic Functionalities for Admin Users (in sequential order): 

1. Posting a pet (http://localhost:3000/postapet): this is the page that admin users would use to post a pet. Filling out the form with the applicable info, would add this new pet to the list of pet postings that the clinic has made available for regular users. 

2. Viewing Applications (http://localhost:3000/adminapps): allows users to view applications they have previously posted. 






