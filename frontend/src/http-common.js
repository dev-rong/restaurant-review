import axios from "axios";
//baseURL: backend server
export default axios.create({
  baseURL: //"http://localhost:5000/api/v1/restaurants",
  "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant-reviews-evuay/service/restaurants/incoming_webhook/",
  headers: {
    "Content-type": "application/json"
  }
});