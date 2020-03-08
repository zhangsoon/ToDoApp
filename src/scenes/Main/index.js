import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import * as selectors from '../../selectors';
import {connect} from 'dva';
import {GLOBAL_HORIZONTAL_PADDING, moderateScale, verticalScale, viewPortWidth} from '../../utils/Scaling';
import {TabView} from 'react-native-tab-view';
import CustomButton from '../components/CustomButton';
import Colors from '../../utils/Color';
import Helper from '../../utils/Helper';
import CustomText from '../components/CustomText';
import ToDoTaskTab from './scenes/ToDoTaskTab';
import CompletedTaskTab from './scenes/CompletedTaskTab';
import ActionSheet from 'react-native-actionsheet';
import * as taskAction from '../../actions/task';
import _ from 'lodash';
const TODOTASK = 'to-do-list';
const COMPLETEDTASK = 'completed-task';

const todoActionData = ['Cancel', 'Edit', 'Delete'];
const moreActionData = ['Cancel', 'Delete'];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {
          key: TODOTASK,
          title: 'To do',
        },
        {
          key: COMPLETEDTASK,
          title: 'Completed',
        },
      ],
      isCompletedSelected: null,
      isToDoSelected: null,
    };
  }
  onPressDrawer = () => {
    this.props.navigation.openDrawer();
  };

  renderScene = ({route, jumpTo}) => {
    const {toDoTask, completedTask} = this.props;
    const {isToDoSelected} = this.state;
    switch (route.key) {
      case TODOTASK:
        return (
          <ToDoTaskTab
            data={toDoTask}
            selectedItem={isToDoSelected}
            onPressItem={this.onPressToDoItem}
            onPressMoreItem={this.onPressMoreToDoItem}
          />
        );
      case COMPLETEDTASK:
        return (
          <CompletedTaskTab
            data={completedTask}
            onPressItem={this.onPressCompletedItem}
            onPressMoreItem={this.onPressMoreCompletedItem}
          />
        );
    }
  };

  onPressMoreToDoItem = id => {
    this.setState({taskID: id}, () => this.todoActionSheet.show());
  };

  onPressMoreCompletedItem = id => {
    this.setState({taskID: id}, () => this.completedActionSheet.show());
  };

  onPressToDoItem = id => {
    const {isToDoSelected} = this.state;
    let newToDoSelected = [];
    const targetID = _.find(isToDoSelected, item => _.isEqual(id, item));

    if (_.isEmpty(targetID)) {
      newToDoSelected = !_.isEmpty(isToDoSelected) ? isToDoSelected.concat([id]) : [id];
    } else {
      newToDoSelected = _.remove(isToDoSelected, item => !_.isEqual(id, item));
    }
    this.setState({isToDoSelected: newToDoSelected});
  };

  onPressCompletedItem = id => {};

  renderTabBar = props => {
    const {navigationState} = props;
    const {routes, index} = navigationState;
    return (
      <View style={{alignItems: 'center', marginBottom: verticalScale(10)}}>
        <View style={styles.tabBarContainer}>
          {routes &&
            routes.map((route, key) => {
              return (
                <TouchableOpacity
                  style={styles.tabBarItemContainer}
                  key={key}
                  onPress={() => this.setState({index: key})}>
                  <CustomText
                    style={
                      key === index
                        ? {
                            color: Colors.primaryThemeColor,
                            fontWeight: 'bold',
                          }
                        : {
                            color: Colors.primaryThemeColor,
                          }
                    }>
                    {route.title}
                  </CustomText>
                  <View
                    style={[
                      styles.indicatorButtonStyle,
                      key === index
                        ? {backgroundColor: Colors.primaryThemeColor}
                        : {backgroundColor: 'transparent'},
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    );
  };

  onPressAddTask = () => {
    const {navigation} = this.props;

    navigation.navigate('NewTask');
  };

  onPressToDoMoreAction = index => {
    const {taskID} = this.state;
    const {deleteTask} = this.props;
    if (!_.isEqual(index, 0)) {
      switch (index) {
        case 1:
          const {navigation} = this.props;
          navigation.navigate('NewTask', {id: taskID});
          break;
        case 2:
          deleteTask(taskID);
          break;
      }
    }
  };

  onPressCompletedMoreAction = index => {
    const {taskID} = this.state;
    const {deleteTask} = this.props;
    if (!_.isEqual(index, 0)) {
      if (index === 1) {
        deleteTask(taskID);
      }
    }
  };

  handleActionSheetRef = ref => (this.todoActionSheet = ref);

  handleCompletedActionSheetRef = ref => (this.completedActionSheet = ref);

  onPressDone = () => {
    const {isToDoSelected} = this.state;
    const {completeTask} = this.props;
    if (_.isEmpty(isToDoSelected)) {
      return;
    }
    completeTask(isToDoSelected);

    this.setState({isToDoSelected: null});
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomHeaderComponent
          leftIcon="ios-menu"
          title="Task"
          onPressLeft={this.onPressDrawer}
          onPressRight={this.onPressDone}
          rightText={!_.isEmpty(this.state.isToDoSelected) ? 'Done' : ''}>
          <View style={styles.tabViewContainer}>
            <TabView
              navigationState={this.state}
              style={{flex: 1}}
              lazy
              swipeEnabled={false}
              onIndexChange={index => this.setState({index})}
              renderScene={this.renderScene}
              //sceneContainerStyle={{ width: viewPortWidth }}
              renderTabBar={this.renderTabBar}
            />
          </View>
          <View style={styles.addNewTaskButtonContainer}>
            <CustomButton
              style={styles.addNewTaskButtonStyle}
              title="Add New Task"
              onPress={this.onPressAddTask}
            />
          </View>
        </CustomHeaderComponent>
        <ActionSheet
          ref={this.handleActionSheetRef}
          options={todoActionData}
          cancelButtonIndex={0}
          onPress={this.onPressToDoMoreAction}
        />
        <ActionSheet
          ref={this.handleCompletedActionSheetRef}
          options={moreActionData}
          cancelButtonIndex={0}
          onPress={this.onPressCompletedMoreAction}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(30),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  tabBarContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: verticalScale(10),
    borderColor: Colors.primaryThemeColor,
  },
  tabBarItemContainer: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(25),
  },
  tabViewContainer: {
    flex: 1,
    marginTop: verticalScale(5),
    paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
  },
  addNewTaskButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: Helper.isIphoneX ? verticalScale(25) : verticalScale(15),
    left: 0,
    right: 0,
  },
  addNewTaskButtonStyle: {
    width: viewPortWidth - GLOBAL_HORIZONTAL_PADDING * 2,
    backgroundColor: Colors.primaryThemeColor,
  },
  indicatorButtonStyle: {
    backgroundColor: 'white',
    width: 6,
    height: 6,
    borderRadius: 12,
    marginTop: verticalScale(3),
  },
});

function mapStateToProps(state) {
  return {
    currentUser: selectors.getCurrentUser(state),
    toDoTask: selectors.getTaskDataArrayToDo(state),
    completedTask: selectors.getTaskDataArrayCompleted(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTask: taskID => dispatch(taskAction.deleteTaskRequest(taskID)),
    completeTask: arrayTask => dispatch(taskAction.completeTaskRequest(arrayTask)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
