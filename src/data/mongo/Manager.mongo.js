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
            // Use optional chaining to simplify the code and prevent errors
            const allData = await this.Model.find(filterInfo || {});
            return allData;
        } catch (error) {
            // Re-throw the error as an instance of Error for consistency
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