import Board from '../models/boardModel';

const getAllBoards = async (req, res) => {
    try {
        const board = await Board.findAll({})
        return res.status(200).send(board);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const createBoard = async (req, res) => {
    try {
        const board = await Board.create({
            user_id: req.body.user_id,
            background_color: req.body.background_color,
            background_image: req.body.background_image,
            status: req.body.status
        })
        return res.status(200).send(board);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const updateBackground = async (req, res) => {
    try {
        const board = await Board.update({
            background_color: req.body.background_color,
            background_image: req.body.background_image,
            background_opacity: req.body.background_opacity
        }, { where: {
            id: req.body.id
        }})
        return res.status(200).send(board);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getBackground = async (req, res) => {
    try {
        const board = await Board.findAll({})
        return res.status(200).send(board);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const seedDB = async (req, res) => {
    console.log('******Seeding********')
    try {
        const board = await Board.create({
            background_image: 'https://live.staticflickr.com/25/62666535_0a7513949f_b.jpg'
        })
        return res.status(200).send(board);
    } catch (error) {
        return res.status(400).send(error)
    };
}

export {
    getAllBoards,
    createBoard,
    updateBackground,
    getBackground,
    seedDB
}