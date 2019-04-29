import {
    getAllBoards, createBoard
} from '../controllers/boardController';

module.exports = (app) => {
    app.get('/boards', getAllBoards);
    app.post('/boards', createBoard);
}