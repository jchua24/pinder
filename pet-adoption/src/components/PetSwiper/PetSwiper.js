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
          age: "17 years",
          tagline: "This is a lit puppy", 
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
          clinicName: "Dogs for Days",
          clinicAddress: "123 Front Street",
          addInfo: "Biscuit loves to walk and is a very active animal. Potential adopters should be prepared to take Biscuit on a way at least 2-3 times a day."
        },
        {
          name: "Big Brain", 
          type: "Goldfish", 
          breed: "Oranda", 
          age: "0.5 years",
          tagline: "Super easy to maintain!", 
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
          clinicName: "Fishie Friends",
          clinicAddress: "359 Queen Street West",
          addInfo: "Oranda Goldfish are particularly sensitive to overfeeding and their portion sizes must be monitored actively."
        },
        {
          name: "Bradley the Bunny", 
          type: "Bunny", 
          breed: "American", 
          age: "3 years",
          tagline: "Just a fun bundle of joy!", 
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
          clinicName: "Bob's Pet Clinic",
          clinicAddress: "223 Westmore Crescent",
          addInfo: "Bradley has a tendency to run off on his own, but this is a common tendency among bunnies and is not a cause of concern." 
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
