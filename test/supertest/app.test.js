import { expect } from "chai";
import supertest from "supertest";
import variablesEnviroment from "../../src/utils/env/env.util.js";
import { readByEmailService } from "../../src/services/auth.service.js";
import { readService } from "../../src/services/products.service.js";

const requester = supertest(`http://localhost:${variablesEnviroment.PORT}/api`);

describe("Testeando STORM API", function () {
  this.timeout(20000);
  const user = {
    username: "camilo2023",
    email: "cami2023@hotmail.com",
    password: "hola1234",
    role: 1,
    verify: true,
  };
  const newProduct = {
    title: "Testing 15.0",
    price: 1000,
    stock: 100,
    category: "Electronics",
    photo: "https://example.com/photo1.jpg",
  };
  const dataNewProduct = {
    price: 110,
  };
  let token = "";
  console.log(variablesEnviroment.PORT);

  it("Registro de un usuario", async () => {
    const response = await requester.post("/auth/register").send(user);
    const { _body } = response;
    console.log(_body);
    expect(_body.statusCode).to.be.equals(201);
  });
  it("Inicio de sesión de un usuario", async () => {
    const response = await requester.post("/auth/login").send(user);
    const { _body, headers } = response;
    token = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });
  it("Crear un nuevo producto:", async () => {
    const response = await requester
      .post("/products/")
      .send(newProduct)
      .set("Cookie", token);
    const { _body } = response;
    // console.log(_body);
    expect(_body.statusCode).to.be.equals(201);
  });
  //   it("Actualizar un nuevo producto:", async () => {
  //     const found = await readService({ title: newProduct.title });
  //     console.log(found);

  //     const response = await requester
  //       .put(`/product/66b198b580b4b947f77e8d86`)
  //       .send(dataNewProduct)
  //       .set("Cookie", token);
  //     const { _body } = response;
  //     // console.log(_body);
  //     expect(_body.statusCode).to.be.equals(201);
  //   });
  it("Eliminación de un usuario", async () => {
    const foundUser = await readByEmailService(user.email);
    const response = await requester.delete("/auth/" + foundUser._id);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
});
