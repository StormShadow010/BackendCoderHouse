const UsersManager = require("../../data/fs/UsersManager.fs");

const testUsersManager = async () => {
  const users = new UsersManager();

  console.log("Data from file:");
  let fileTotal = await users.read();
  console.log(fileTotal);

  console.log("Creation of the users");
  await users.create({
    photo: "default-image-url",
    email: "user1@example.com",
    password: "<PASSWORD>",
    role: "admin",
  });
  await users.create({
    photo: "default-image-url",
    email: "user2@example.com",
    password: "<PASSWORD>",
    role: "admin",
  });
  await users.create({
    photo: "default-image-url",
    email: "user3@example.com",
    password: "<PASSWORD>",
    role: "employee",
  });
  console.log("User 4 without photo parameter");
  await users.create({
    email: "user4@example.com",
    password: "<PASSWORD>",
    role: "employee",
  });

  console.log("Data from file:");
  fileTotal = await users.read();
  console.log(fileTotal);

  console.log(
    "Search a user by id,in this case, the product of position 3 will be extracted from the read method."
  );
  console.log("User found:", await users.readOne(fileTotal[2].id));
  console.log(
    "Delete a user by id,in this case, the product of position 5 will be extracted from the read method."
  );
  const remaining_products = await users.destroy(fileTotal[3].id);
  console.log("Remaining users:", remaining_products);

  //Expected errors
  console.log(
    "Search for a user by an ID that does not exist, in this case 2025"
  );
  console.log(await users.readOne(2025));
  console.log("Destroy a user by an ID that does not exist, in this case 2025");
  console.log(await users.destroy(2025));
};

testUsersManager();
