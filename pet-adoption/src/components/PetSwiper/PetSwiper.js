import React from "react";
import { Carousel} from "react-bootstrap";

import PetCard from "./PetCard";
import "./PetSwiper.css";

class PetSwiper extends React.Component {
  constructor() {
    super();
    this.state = {
      pets: [
        {
          name: "Biscuit", 
          type: "dog", 
          breed: "Pomeranian", 
          coverImage: "https://wallpapercave.com/wp/wp5310691.jpg", 
          images: [
          {
            "src": "https://i.pinimg.com/originals/c7/47/40/c74740040226563c7d25276780549ae1.png", 
            "caption": "Fluffy as can be!"
          }, 
          {
            "src": "https://s3.amazonaws.com/petcentral.com/wp-content/uploads/2016/09/09131009/wide-picture-of-a-white-pomeranian-spitz-at-the-blooming-meadow-picture-id1014940472-1330x711.jpg", 
            "caption": "So well behaved."
          },
          {
            "src": "https://wallpapercave.com/wp/wp5722866.jpg", 
            "caption": "Awe just look at him"
          }], 
          addInfo: "This is a lit puppy"
        },
        {
          name: "Big Brain", 
          type: "Goldfish", 
          breed: "Oranda", 
          coverImage: "https://www.aquariumsource.com/wp-content/uploads/2020/08/oranda-goldfish.jpg", 
          images: [
            {
              "src": "https://www.fishkeepingworld.com/wp-content/uploads/2019/02/Red-Cap-Oranda-Goldfish.jpg", 
              "caption": "That side profile tho"
            }, 
            {
              "src": "https://wallpaperaccess.com/full/1434139.jpg", 
              "caption": "One word description - majestic"
            },
            {
              "src": "https://c4.wallpaperflare.com/wallpaper/216/262/379/goldfish-aquarium-hd-wallpaper-wallpaper-preview.jpg", 
              "caption": "When Big Brain was still a baby awe"
            }], 
          addInfo: "Super easy to maintain!"
        },
        {
          name: "Bradley the Bunny", 
          type: "Bunny", 
          breed: "American", 
          coverImage: "https://i.pinimg.com/originals/f8/0a/5e/f80a5e8da15e19fb0dd263345296d5fc.jpg", 
          images: [
            {
              "src": "https://i.pinimg.com/originals/7c/e0/22/7ce022b496444d3551b02db72baebd35.jpg", 
              "caption": "He likes to eat grass"
            }, 
            {
              "src": "https://wallpapercave.com/wp/KNiixrs.jpg", 
              "caption": "Close-up time!"
            },
            {
              "src": "https://wallpaperaccess.com/full/157385.jpg", 
              "caption": "Mesmerized by the humans"
            }], 
          addInfo: "Just a fun bundle of joy!" 
        }
      ]
    };
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="swiper">
        <Carousel indicators={false}>

          {this.state.pets.map((pet) => (
            <Carousel.Item interval={5000}>
              <PetCard petData={pet}/> 
            </Carousel.Item>
          ))}

        </Carousel>
      </div>
    );
  }
}

export default PetSwiper;
