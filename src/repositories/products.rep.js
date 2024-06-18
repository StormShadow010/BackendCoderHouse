//DAO - Assign corresponding manager
import dao from "../data/dao.factory.js";
import Repository from "./CustomRepository.js";

const { productsManager } = dao;
const productsRepository = new Repository(productsManager);
export default productsRepository;
