
List of Third-Party Libraries Used: material-ui, bootstrap, rc-slider, react-bootstrap, react-bootstrap-icons, react-card-flip, react-images-uploading, react-rounded-image, reactjs-popup, simple-react-lightbox. 


Basic Functionalities for Regular Users (in sequential order): 

The first page you see is an introductory page, showing you the various pets that is for adoption.

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






