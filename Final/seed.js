import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as usersData from "./data/users.js"
import * as reviewsData from "./data/reviews.js"
import * as housesData from "./data/houses.js"

//add one user, house and review.
async function main() {
  try {
    const db = await dbConnection();
    await db.dropDatabase();

    const user1InsertedInfo = await usersData.createUser(
      'John',
      'Doe',
      'johndoe@example.com',
      'Password123!'
    );
    console.log(user1InsertedInfo, 'user1 created successfully');
    const user1 = user1InsertedInfo.user;
    console.log('user1.emailAddress:', user1.emailAddress);    

    const house1 = await housesData.create({
      roomType: '1BHK',
      roomCategory: 'private',
      gender: 'male',
      city: 'city',
      state: 'Idaho',
      rent: '1500',
      address: '123 Main St, City Center',
      description: 'A beautiful house in the city center',
      imageUrl: 'https://example.com/house1.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user1.emailAddress);
    console.log(house1, 'house1 created successfully');

    const review1 = {
      rating: 4,
      review: 'Great place to stay!'
    };

    await reviewsData.createReview(user1, house1._id, review1);

    console.log('Database seeded successfully');
    await closeConnection();
  } catch (error) {
    console.error('Error during database seeding:', error);
  }
}

main();