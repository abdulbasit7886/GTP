import { Router } from 'express';
import Tasks from '../models/taskModel.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// Create Task

router.post('/create-task', authenticate, async(req,res) => {
    const userID = req.user.id
    const {task} = req.body;
    try{
        const tasks = new Tasks({
            userID,
            task
        })
        await tasks.save()
        return res.status(200).json({
            message: "Task added Successfully!!"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        })
    }

})

// Update Task

router.put('/update-task/:id', authenticate, async (req, res) => {
    const task = req.body;
    const taskId = req.params.id;

    try {
        const taskToUpdate = await Tasks.findById(taskId);
        
        if (!taskToUpdate) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (taskToUpdate.userID.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        const updatedTask = await Tasks.findByIdAndUpdate(
            taskId,
            task,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to update task. Please try again later."
        });
    }
});

// Returning All tasks of the User

router.get('/api/all-tasks', authenticate, async(req,res) => {
    try{
        const userID = req.user.id;
        const tasks = await Tasks.find({ userID });
        if(tasks.length === 0){
            return res.status(404).json({
                message: "No tasks found"
            })
        }
        return res.status(200).json({ tasks })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "server error"
        })
    }
})

// Delete Task

router.delete('/delete-task/:id', authenticate, async (req, res) => {
    const taskId = req.params.id;

    try {
        const taskToDelete = await Tasks.findById(taskId);

        if (!taskToDelete) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (taskToDelete.userID.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this task" });
        }
        await Tasks.findByIdAndDelete(taskId);

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete task. Please try again later."
        });
    }
});


export default router;