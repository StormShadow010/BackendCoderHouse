class Manager {
    constructor(Model) {
        this.Model = Model;
    }
    create = async (data) => {
        try {
            const newNote = await this.Model.create(data)
            return newNote;
        } catch (error) {
            throw error;
        }
    }
    read = async (category) => {
        try {
            const notes = await this.Model.find();
            return notes;
        } catch (error) {
            throw error;
        }
    }
    readOne = async (id) => {
        try {
            const note = await this.Model.findById(id);
            return note;
        } catch (error) {
            throw error;
        }
    }
    update = async (id, data) => {
        try {
            //new:true return a object updated
            const note = await this.Model.findByIdAndUpdate(id, data, { new: true });
            return note;
        } catch (error) {
            throw error;
        }
    }
    delete = async (id) => {
        try {
            const note = await this.Model.findByIdAndDelete(id);
            return note;
        } catch (error) {
            throw error;
        }
    }
}

export default Manager