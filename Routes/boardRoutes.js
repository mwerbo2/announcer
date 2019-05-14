import {
    getAllBoards, createBoard, updateBackground
} from '../controllers/boardController';

module.exports = (app) => {
    app.get('/boards', getAllBoards);
    app.post('/boards', createBoard);
    app.put('/boards', updateBackground)
}