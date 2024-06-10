class Service {
  constructor(manager) {
    this.manager = manager;
  }
  createService = async (data) => {
    try {
      const newUser = await this.manager.create(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  };
  readService = async (filterInfo) => {
    try {
      const allData = await this.manager.read(filterInfo);
      return allData;
    } catch (error) {
      throw error;
    }
  };
  readOneService = async (uid) => {
    try {
      const itemInvidual = await this.manager.readOne(uid);
      return itemInvidual;
    } catch (error) {
      throw error;
    }
  };
  updateService = async (uid, data) => {
    try {
      const itemUpdated = await this.manager.update(uid, data);
      return itemUpdated;
    } catch (error) {
      throw error;
    }
  };
  destroyService = async (uid) => {
    try {
      const itemDeleted = await this.manager.destroy(uid);
      return itemDeleted;
    } catch (error) {
      throw error;
    }
  };
  paginateService = async ({ filter, opts }) => {
    try {
      const allData = await this.manager.paginate({ filter, opts });
      return allData;
    } catch (error) {
      throw error;
    }
  };
  destroyAllService = async (uid) => {
    try {
      const itemDeleted = await this.manager.destroyMany(uid);
      return itemDeleted;
    } catch (error) {
      throw error;
    }
  };
}

export default Service;
