import React from "react";
import { Carousel} from "react-bootstrap";

import PostCard from "./PostCard";
import "./PostSwiper.css";

import { apiGetPosts, apiSubmitApplication } from "../../api/user";

class PostSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          pet: {
            name: "Biscuit", 
            type: "dog", 
            breed: "Pomeranian", 
            age: "17 years",
            tagline: "This is a lit puppy", 
            description: "https://wallpapercave.com/wp/wp5310691.jpg", 
            images: [
              "https://i.pinimg.com/originals/c7/47/40/c74740040226563c7d25276780549ae1.png", 
              "https://s3.amazonaws.com/petcentral.com/wp-content/uploads/2016/09/09131009/wide-picture-of-a-white-pomeranian-spitz-at-the-blooming-meadow-picture-id1014940472-1330x711.jpg", 
              "https://wallpapercave.com/wp/wp5722866.jpg"
            ]
          }, 
          clinicName: "Dogs for Days",
          clinicAddress: "123 Front Street",
          additionalInfo: "Biscuit loves to walk and is a very active animal. Potential adopters should be prepared to take Biscuit on a way at least 2-3 times a day."
        },
        {
          pet: {
            name: "Big Brain", 
            type: "Goldfish", 
            breed: "Oranda", 
            age: "0.5 years",
            description: "Super easy to maintain!", 
            images: [
              "https://www.fishkeepingworld.com/wp-content/uploads/2019/02/Red-Cap-Oranda-Goldfish.jpg", 
              "https://wallpaperaccess.com/full/1434139.jpg", 
              "https://c4.wallpaperflare.com/wallpaper/216/262/379/goldfish-aquarium-hd-wallpaper-wallpaper-preview.jpg"
            ]
          }, 
          clinicName: "Fishie Friends",
          clinicAddress: "359 Queen Street West",
          additionalInfo: "Oranda Goldfish are particularly sensitive to overfeeding and their portion sizes must be monitored actively."
        },
        {
          pet: {
            name: "Bradley the Bunny", 
            type: "Bunny", 
            breed: "American", 
            age: "3 years",
            description: "Just a fun bundle of joy!", 
            images: [ 
              "https://i.pinimg.com/originals/7c/e0/22/7ce022b496444d3551b02db72baebd35.jpg", 
              "https://wallpapercave.com/wp/KNiixrs.jpg", 
              "https://wallpaperaccess.com/full/157385.jpg"
            ]
          }, 
          clinicName: "Bob's Pet Clinic",
          clinicAddress: "223 Westmore Crescent",
          additionalInfo: "Bradley has a tendency to run off on his own, but this is a common tendency among bunnies and is not a cause of concern." 
        }
      ]
    };
  }

  //get posts to display in swiper 
  async componentDidMount() {
    await this.getPosts(); 
  }

  async getPosts() {

    try {
      const posts = await apiGetPosts();
      if(posts && posts.length > 0) {
        this.setState({posts: posts}); 
        this.forceUpdate();
      } else {
        alert("No posts found! Try adjusting your search preferences.");
      }

    } catch (error) {
      console.log(error);
    }

  }

  async submitApplication(postData) {
    
    try {
      await apiSubmitApplication(postData.id, postData.clinicID);
      alert("Application submitted successfully!"); 
    } catch (error) {
      console.log(error);
      alert("Could not submit application."); 
    }

    //reload posts
    await this.getPosts(); 
  }

  render() {
    return (
      <div className="swiperContainer">

        {this.state.posts && 
         <Carousel className="swiper" indicators={false}>

          {this.state.posts.map((post) => (
            <Carousel.Item interval={50000}>
              <PostCard postData={post} submitApplication={this.submitApplication}/> 
            </Carousel.Item>
          ))}

        </Carousel>
        }
       
      </div>
    );
  }
}

export default PostSwiper;
