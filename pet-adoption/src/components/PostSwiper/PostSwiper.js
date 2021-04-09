import React from "react";
import { Carousel} from "react-bootstrap";

import PostCard from "./PostCard";
import "./PostSwiper.css";

import { apiGetPosts, apiSubmitApplication } from "../../api/user";

class PostSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.submitApplication = this.submitApplication.bind(this);
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
