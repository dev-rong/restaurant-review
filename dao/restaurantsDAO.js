import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let restaurants // store reference to db

export default class RestaurantsDAO {
  static async injectDB(conn) { // as soon as server start, get reference to restaurants db
    if (restaurants) { // already is reference
      return
    }
    try { // name of the db(environment variables) - get collection(table) // mongodb atlas ui - collections
      restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`,
      )
    }
  }

  static async getRestaurants({ //get a list of all the restaurants in the db
    filters = null, // sort
    page = 0,
    restaurantsPerPage = 20, // default per pages at once
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) { // name에 해당하는 field 어떻게 찾냐면 mongodb에서 설정
        query = { $text: { $search: filters["name"] } } // no db fields - how to know which db field? set up in mongodb atlas
      } else if ("cuisine" in filters) { 
        query = { "cuisine": { $eq: filters["cuisine"] } } // cuisine, address.zipcode = db field equals
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor
    
    try {
      cursor = await restaurants
        .find(query) // find all the restaurants in the db with query
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }
                                        //20            // to get the specific page of the results
    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

    try {
      const restaurantsList = await displayCursor.toArray()
      const totalNumRestaurants = await restaurants.countDocuments(query) // count the number of rows

      return { restaurantsList, totalNumRestaurants } // count the documents in the query
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }
  }
  static async getRestaurantByID(id) {
    try {
      const pipeline = [ // helps match different collections
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              { //mongodb aggregation pipeline - framework for data aggregation (data processing pipelines)
                //documents enter a multi-stage pipeline that transforms documents into aggregated results
                  $lookup: { // join in sql
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$restaurant_id", "$$id"], // find all the reviews that match the id
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews", // set that to be reviews
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await restaurants.aggregate(pipeline).next() // pipeline to collect together(restaurant-reviews)
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    let cuisines = []
    try {
      cuisines = await restaurants.distinct("cuisine") // get each cuisine one time
      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }
 }
