import express from "express";
import {
    deleteCommentController,
    getCommentByIdController,
    getCommentsController,
    updateCommentController
} from "../controllers/commentsController";
import {errorMiddleware} from "../middlewares/errorMiddleware";
import {contentCommentValidator, idCommentValidator} from "../middlewares/commentsValidators";


const router = express.Router();

router.route('/')
    .get(getCommentsController)

router.route('/:id')
    .put(
    //     authMiddleware,
        idCommentValidator,
        contentCommentValidator,
        errorMiddleware,
        updateCommentController
    )
    .delete(
    //     authMiddleware,
        idCommentValidator,
        errorMiddleware,
        deleteCommentController
    )
    .get(
        idCommentValidator,
        errorMiddleware,
        getCommentByIdController
    );


export default router
