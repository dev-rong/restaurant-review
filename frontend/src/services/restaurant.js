//CRUD with Axios
import http from "../http-common";

//make API calls - return information from the API call
class RestaurantDataService {
    // getAll(page = 0) { //default page - get page you want
    //     return http.get(`?page=${page}`); // baseURL + ~
    //   }
    
    //   get(id) {
    //     return http.get(`/id/${id}`);
    //   }
    
    //   //by = name,zipcode query=food,number
    //   find(query, by = "name", page = 0) {
    //     return http.get(`?${by}=${query}&page=${page}`);
    //   } 
    
    //   createReview(data) {
    //     return http.post("/review", data);
    //   }
    
    //   updateReview(data) {
    //     return http.put("/review", data);
    //   }
    
    //   deleteReview(id, userId) {
    //     return http.delete(`/review?id=${id}`, {data:{user_id: userId}});
    //   }
    
    //   getCuisines(id) {
    //     return http.get(`/cuisines`);
    //   }
    
  getAll(page = 0) { //default page - get page you want
    return http.get(`restaurants?page=${page}`); // baseURL + ~
  }

  get(id) {
    return http.get(`/restaurant?id=${id}`);
  }

  //by = name,zipcode query=food,number
  find(query, by = "name", page = 0) {
    return http.get(`restaurants?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    return http.post("/review-new", data);
  }

  updateReview(data) {
    return http.put("/review-edit", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }

}

export default new RestaurantDataService();