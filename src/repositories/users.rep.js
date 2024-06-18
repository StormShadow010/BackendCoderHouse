//DAO - Assign corresponding manager
import dao from "../data/dao.factory.js";
import Repository from "./CustomRepository.js";

const { usersManager } = dao;
const usersRepository = new Repository(usersManager);
export default usersRepository;
