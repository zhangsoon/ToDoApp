import _ from 'lodash';

export const getTaskData = state => _.get(state, ['task'], null);
export const getTaskDataDetail = (state, taskID) => _.get(state, ['task', taskID], null);
export const getTaskDataArrayTodo = state => {
  let arrayData = getTaskData(state);
  if (!_.isEmpty(arrayData)) {
    return _.filter(arrayData, item => !getTaskIsCompleted(item));
  } else {
    return null;
  }
};
export const getTaskDataArrayCompleted = state => {
  let arrayData = getTaskData(state);
  if (!_.isEmpty(arrayData)) {
    return _.filter(arrayData, item => getTaskIsCompleted(item));
  } else {
    return null;
  }
};

//task
export const getTaskID = task => _.get(task, ['id'], null);
export const getTaskTitle = task => _.get(task, ['title'], null);
export const getTaskDescription = task => _.get(task, ['description'], null);
export const getTaskDate = task => _.get(task, ['date'], null);
export const getTaskTime = task => _.get(task, ['time'], null);
export const getTaskIsCompleted = task => _.get(task, ['isCompleted'], false);
