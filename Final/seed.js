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

    let house1ImageUrls=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683685901/pnipa1hvhjzkgqh1308k.jpg","https://res.cloudinary.com/djnwq0ee6/image/upload/v1683687309/ybjwgl9mkis6c0rztqty.jpg"]
    const house1 = await housesData.create({
      roomType: '1BHK',
      roomCategory: 'private',
      gender: 'male',
      city: 'Boise',
      state: 'Idaho',
      rent: '1500',
      address: '123 Main St, City Center',
      description: 'A beautiful house in the city center',
      imageUrls: house1ImageUrls,
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user1.emailAddress);
    console.log(house1, 'house1 created successfully');

    const review1 = {
      rating: 4,
      review: 'Great place to stay!'
    };

    await reviewsData.createReview(user1, house1._id, review1);

    let house2ImageUrls=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683685902/rjtsyekksgbphxtiyd3j.jpg","https://res.cloudinary.com/djnwq0ee6/image/upload/v1683687212/bskt6dqwatpxdx2zwcmm.jpg"]
    const house2 = await housesData.create({
      roomType: '2BHK',
      roomCategory: 'Shared',
      gender: 'male',
      city: 'Boise',
      state: 'Idaho',
      rent: '1800',
      address: '1123 Main St, City Center',
      description: 'A good house in the city',
      imageUrls: house2ImageUrls,
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user2.emailAddress);

    let hosue3ImageUrls=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683685903/ngy3firyfdatys5nqwyo.jpg","https://res.cloudinary.com/djnwq0ee6/image/upload/v1683686838/fiookdvm2psrvy5m946b.jpg"]
    const house3 = await housesData.create({
      roomType: '3BHK',
      roomCategory: 'Shared',
      gender: 'male',
      city: 'Tempe',
      state: 'Arizona',
      rent: '1480',
      address: '203 Main St, City Center',
      description: 'A good place in the city',
      imageUrls: hosue3ImageUrls,
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user3.emailAddress);

    let house4ImageUrl=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683685903/khpyfdiahgdxalyt754t.jpg","https://res.cloudinary.com/djnwq0ee6/image/upload/v1683668236/dhmzh48qrxs3xv9gqane.jpg"]
    const house4 = await housesData.create({
      roomType: '3BHK',
      roomCategory: 'Shared',
      gender: 'male',
      city: 'Tempe',
      state: 'Arizona',
      rent: '1280',
      address: '203 Main St, City Center',
      description: 'A good place in the city',
      imageUrls: house4ImageUrl,
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user4.emailAddress);

    let house5ImageUrl=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683685904/xhdqwerxbw5azhevoota.jpg"]
    const house5 = await housesData.create({
      roomType: '3BHK',
      roomCategory: 'Shared',
      gender: 'male',
      city: 'San Francisco',
      state: 'California',
      rent: '1180',
      address: '2013 Main St, City Center',
      description: 'A good place in the city',
      imageUrls: house5ImageUrl,
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user5.emailAddress);

    let house6ImageUrls=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683668237/ady3ahwzxjhx2xnw9mod.jpg","https://res.cloudinary.com/djnwq0ee6/image/upload/v1683685904/vutug3lff2fnp82zpmff.jpg",
    "https://res.cloudinary.com/djnwq0ee6/image/upload/v1683668236/dhmzh48qrxs3xv9gqane.jpg"]
    const house6 = await housesData.create({
      roomType: '1BHK',
      roomCategory: 'Private',
      gender: 'Female',
      city: 'San Francisco',
      state: 'California',
      rent: '1280',
      address: '2011 Main St, City Center',
      description: 'A good place in the city',
      imageUrls: house6ImageUrls,
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user6.emailAddress);

    let house7ImageUrls=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683685905/wlpwgprjwuzphkqnq9d5.jpg","https://res.cloudinary.com/djnwq0ee6/image/upload/v1683673488/gc6i33ubkgsuxdubafzu.jpg"]
    const house7 = await housesData.create({
      roomType: '2BHK',
      roomCategory: 'Shared',
      gender: 'Female',
      city: 'Stamford',
      state: 'Connecticut',
      rent: '1280',
      address: '2011 Main St, City Center',
      description: 'A good place in the city',
      imageUrls: house7ImageUrls,
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user7.emailAddress);

    let imageshouse8=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683686838/fiookdvm2psrvy5m946b.jpg",
  "https://res.cloudinary.com/djnwq0ee6/image/upload/v1683686839/zlmvczgoo52wcteas4i1.jpg","https://res.cloudinary.com/djnwq0ee6/image/upload/v1683686840/d2ug0ftuw0pppikaicx2.jpg"]
    const house8 = await housesData.create({
      roomType: '2BHK',
      roomCategory: 'Shared',
      gender: 'Female',
      city: 'Newton',
      state: 'Delaware',
      rent: '1310',
      address: '1021 Main St, City Center',
      description: 'A good place in the city',
      imageUrls: imageshouse8,
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user8.emailAddress);

    let imageshouse9=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683687212/bskt6dqwatpxdx2zwcmm.jpg","https://res.cloudinary.com/djnwq0ee6/image/upload/v1683687212/k4pro4bwzqoqqfz4mtad.jpg"]
    const house9 = await housesData.create({
      roomType: '3BHK',
      roomCategory: 'Shared',
      gender: 'Female',
      city: 'Orlando',
      state: 'Florida',
      rent: '1800',
      address: '1021 Main St, City Center',
      description: 'A good place in the city',
      imageUrls: imageshouse9,
      postDate: new Date().toLocaleString(),
      interest: 'general',
    }, user9.emailAddress);

    let imageshouse10=["https://res.cloudinary.com/djnwq0ee6/image/upload/v1683687309/ybjwgl9mkis6c0rztqty.jpg","https://res.cloudinary.com/djnwq0ee6/image/upload/v1683687310/j7ej7rhf3h1zkarsitbv.jpg"]
    const house10 = await housesData.create({
      roomType: '1BHK',
      roomCategory: 'Private',
      gender: 'Female',
      city: 'Honolulu',
      state: 'Hawaii',
      rent: '1450',
      address: '1011 Main St, City Center',
      description: 'A good place in the city',
      imageUrls: imageshouse10,
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