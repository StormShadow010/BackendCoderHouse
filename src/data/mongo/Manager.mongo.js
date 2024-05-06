class Manager {
    constructor(Model) {
        this.Model = Model;
    }
    create = async (data) => {
        try {
            const newOne = await this.Model.create(data)
            return newOne;
        } catch (error) {
            throw error;
        }
    }
    read = async (filterInfo) => {
        try {
            const allData = await this.Model.find();
            return allData;
        } catch (error) {
            throw new Error(error.message);
        }
    };
    paginate = async ({ filter, opts }) => {
        try {
            const allData = await this.Model.paginate(filter, opts);
            return allData;
        } catch (error) {
            throw new Error(error.message);
        }
    };
    readOne = async (id) => {
        try {
            const itemInvidual = await this.Model.findById(id);
            return itemInvidual;
        } catch (error) {
            throw error;
        }
    }
    update = async (id, data) => {
        try {
            //new:true return a object updated
            const itemUpdate = await this.Model.findByIdAndUpdate(id, data, { new: true });
            return itemUpdate;
        } catch (error) {
            throw error;
        }
    }
    destroy = async (id) => {
        try {
            const itemDelete = await this.Model.findByIdAndDelete(id);
            return itemDelete;
        } catch (error) {
            throw error;
        }
    }
}

export default Manager