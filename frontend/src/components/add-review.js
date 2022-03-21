import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { useParams, Link, useLocation } from "react-router-dom";

const AddReview = props => { //user={user}
  const {id} = useParams();
//   <Route 
//   path="/restaurants/:id"
//   element={
//     <Restaurant user={user} />
//   }
// />
  const location = useLocation();
  const {currentReview} = location.state; //state
  console.log(location)
  let initialReviewState = ""
   
  let editing = false;
    
  
  if (currentReview) {
    editing = true;
    initialReviewState = currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id //props.match.params.id
    };
    
    if (editing) {
      data.review_id = currentReview._id // ?
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={`/restaurants/${id}`} className="btn btn-success">
              Back to Restaurant
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
            <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />
            </div>
            <button onClick={saveReview} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddReview;