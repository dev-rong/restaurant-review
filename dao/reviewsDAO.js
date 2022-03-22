import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId //convert a string to a mongodb object id

let reviews

export default class ReviewsDAO {
  static async injectDB(conn) {  // as soon as server start, get reference to reviews collection
    if (reviews) {
      return
    }
    try {                       //access the db         //access the reviews collection
      //mongodb에 없어도 document 넣으려고 하면 알아서 자동 생성
        reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = { 
          name: user.name,
          user_id: user._id,
          date: date,
          text: review,
          restaurant_id: ObjectId(restaurantId), } //create an object id(converted to mongodb object id)

      return await reviews.insertOne(reviewDoc) // insert it into the db
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId)},
        { $set: { text: text, date: date  } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId, userId) {

    try {
      const deleteResponse = await reviews.deleteOne({ //product에선 안 넣어도 됨
        _id: ObjectId(reviewId),
        user_id: userId,
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

}