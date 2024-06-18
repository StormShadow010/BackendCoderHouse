//DAO - Assign corresponding manager
import dao from "../data/dao.factory.js";
import Repository from "./CustomRepository.js";

const { cartsManager } = dao;
const cartsRepository = new Repository(cartsManager);
export default cartsRepository;
