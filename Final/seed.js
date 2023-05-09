import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as usersData from "./data/users.js"
import * as reviewsData from "./data/reviews.js"
import * as housesData from "./data/houses.js"

//add 10 users, 10 houses and 1 review.
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
    
    const user2InsertedInfo = await usersData.createUser(
      'Tom',
      'Dam',
      'tomdam@example.com',
      'Password123!'
    );
    const user2 = user2InsertedInfo.user;

    const user3InsertedInfo = await usersData.createUser(
      'Liam',
      'John',
      'liamjohn@example.com',
      'Password123!'
    );
    const user3 = user3InsertedInfo.user; 

    const user4InsertedInfo = await usersData.createUser(
      'Noah',
      'Smith',
      'Noahsmith@example.com',
      'Password123!'
    );
    const user4 = user4InsertedInfo.user; 

    const user5InsertedInfo = await usersData.createUser(
      'William',
      'Johnson',
      'Williamjohnson@example.com',
      'Password123!'
    );
    const user5 = user5InsertedInfo.user;

    const user6InsertedInfo = await usersData.createUser(
      'James',
      'Brown',
      'jamesbrown@example.com',
      'Password123!'
    );
    const user6 = user6InsertedInfo.user;
    
    const user7InsertedInfo = await usersData.createUser(
      'Logan',
      'Jones',
      'loganjones@example.com',
      'Password123!'
    );
    const user7 = user7InsertedInfo.user;

    const user8InsertedInfo = await usersData.createUser(
      'Benjamin',
      'Brown',
      'benjiaminbrown@example.com',
      'Password123!'
    );
    const user8 = user8InsertedInfo.user;

    const user9InsertedInfo = await usersData.createUser(
      'Mason',
      'Doe',
      'Masondoe@example.com',
      'Password123!'
    );
    const user9 = user9InsertedInfo.user;

    const user10InsertedInfo = await usersData.createUser(
      'Jacob',
      'Garcia',
      'jacobgarcia@example.com',
      'Password123!'
    );
    const user10 = user10InsertedInfo.user;

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

    const house2 = await housesData.create({
      roomType: '2BHK',
      roomCategory: 'Shared',
      gender: 'male',
      city: 'city',
      state: 'Alaska',
      rent: '1800',
      address: '1123 Main St, City Center',
      description: 'A good house in the city',
      imageUrl: 'https://example.com/house2.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user2.emailAddress);

    const house3 = await housesData.create({
      roomType: '3BHK',
      roomCategory: 'Shared',
      gender: 'male',
      city: 'city',
      state: 'Alabama',
      rent: '1480',
      address: '203 Main St, City Center',
      description: 'A good place in the city',
      imageUrl: 'https://example.com/house3.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user3.emailAddress);

    const house4 = await housesData.create({
      roomType: '3BHK',
      roomCategory: 'Shared',
      gender: 'male',
      city: 'city',
      state: 'Arizona',
      rent: '1280',
      address: '203 Main St, City Center',
      description: 'A good place in the city',
      imageUrl: 'https://example.com/house4.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user4.emailAddress);

    const house5 = await housesData.create({
      roomType: '3BHK',
      roomCategory: 'Shared',
      gender: 'male',
      city: 'city',
      state: 'Arkansas',
      rent: '1180',
      address: '2013 Main St, City Center',
      description: 'A good place in the city',
      imageUrl: 'https://example.com/house5.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user5.emailAddress);

    const house6 = await housesData.create({
      roomType: '1BHK',
      roomCategory: 'Private',
      gender: 'Female',
      city: 'city',
      state: 'California',
      rent: '1280',
      address: '2011 Main St, City Center',
      description: 'A good place in the city',
      imageUrl: 'https://example.com/house6.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user6.emailAddress);

    const house7 = await housesData.create({
      roomType: '2BHK',
      roomCategory: 'Shared',
      gender: 'Female',
      city: 'city',
      state: 'Connecticut',
      rent: '1280',
      address: '2011 Main St, City Center',
      description: 'A good place in the city',
      imageUrl: 'https://example.com/house7.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user7.emailAddress);

    const house8 = await housesData.create({
      roomType: '2BHK',
      roomCategory: 'Shared',
      gender: 'Female',
      city: 'city',
      state: 'Delaware',
      rent: '1310',
      address: '1021 Main St, City Center',
      description: 'A good place in the city',
      imageUrl: 'https://example.com/house8.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user8.emailAddress);

    const house9 = await housesData.create({
      roomType: '3BHK',
      roomCategory: 'Shared',
      gender: 'Female',
      city: 'city',
      state: 'Florida',
      rent: '1800',
      address: '1021 Main St, City Center',
      description: 'A good place in the city',
      imageUrl: 'https://example.com/house9.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user9.emailAddress);

    const house10 = await housesData.create({
      roomType: '1BHK',
      roomCategory: 'Private',
      gender: 'Female',
      city: 'city',
      state: 'Hawaii',
      rent: '1450',
      address: '1011 Main St, City Center',
      description: 'A good place in the city',
      imageUrl: 'https://example.com/house10.jpg',
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user10.emailAddress);

    console.log('Database seeded successfully');
    await closeConnection();
  } catch (error) {
    console.error('Error during database seeding:', error);
  }
}

main();