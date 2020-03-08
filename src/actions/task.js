export const setAndUpdateTask = (taskID, task) => ({
  type: 'task/SET_AND_UPDATE_TASK',
  taskID,
  task,
});

export const deleteTaskRequest = taskID => ({
  type: 'task/DELETE_TASK_REQUEST',
  taskID,
});

export const completeTaskRequest = arrayTask => ({
  type: 'task/COMPLETE_TASK_REQUEST',
  arrayTask,
});
