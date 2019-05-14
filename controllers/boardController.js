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
            board_background: req.body.background,
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
            background_color: res.body.background_color,
            background_image: res.body.background_image
        })
        return res.status(200).send(board);
    } catch (error) {
        return res.status(400).send(error);
    }
}

export {
    getAllBoards,
    createBoard,
    updateBackground
}