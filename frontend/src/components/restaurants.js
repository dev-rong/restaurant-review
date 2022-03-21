import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { useParams, Link } from "react-router-dom";

const Restaurant = props => { //user={user}

  const {id} = useParams();  
  //   <Route 
//   path="/restaurants/:id"
//   element={
//     <Restaurant user={user} />
//   }
// /> 
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  const deleteReview = (reviewId, index) => { //index of reviews array variable from the state
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1) // delete one index item
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link to={`/restaurants/${id}/review`} className="btn btn-primary">
            Add Review
          </Link>
          
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? ( //리뷰 있음
             restaurant.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {props.user && props.user.id === review.user_id && //로그인 && 로그인 사용자 아이디=리뷰 작성자 아이디 _id:
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                                                        {/* index of [reviews] */}
                            <Link 
                            to={`/restaurants/${id}/review`} //<AddReview/>
                            state= {{currentReview : review }}
                             className="btn btn-primary col-lg-5 mx-1 mb-1">Edit
                            </Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : ( //리뷰 없음
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;