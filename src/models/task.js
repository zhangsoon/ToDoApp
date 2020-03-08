import Immutable from 'seamless-immutable';
import _ from 'lodash';

export default () => {
  const INITIAL_STATE = Immutable({
    task: null,
  });

  return {
    namespace: 'task',
    state: INITIAL_STATE,
    reducers: {
      SET_AND_UPDATE_TASK(state, action) {
        const id = action.taskID;
        return state.setIn(['task', id], action.task);
      },
      DELETE_TASK_REQUEST(state, action) {
        const id = action.taskID;
        let {task} = state;
        let newTaskObject = _.omit(task, [id]);

        return state.setIn(['task'], newTaskObject);
      },
      COMPLETE_TASK_REQUEST(state, action) {
        let {task} = state;
        const newTask = _.clone(task);
        const arrayTask = action.arrayTask;
        if (!_.isEmpty(arrayTask)) {
          _.forEach(arrayTask, item => {
            newTask[item] = {...newTask[item], isCompleted: true};
          });
        }
        return state.setIn(['task'], newTask);
      },
    },
    effects: {},
  };
};
