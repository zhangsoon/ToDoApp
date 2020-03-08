import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import {GLOBAL_HORIZONTAL_PADDING, moderateScale, verticalScale} from '../../utils/Scaling';
import CustomText, {getFontSize} from '../components/CustomText';
import Colors from '../../utils/Color';
import DatePicker from 'react-native-datepicker';
import _ from 'lodash';
import CustomButton from '../components/CustomButton';
import Toast from '../../utils/Toast';
import * as selectors from '../../selectors';
import * as taskAction from '../../actions/task';
import {connect} from 'dva';
import * as taskSelectors from '../../selectors/task';

class NewTask extends Component {
  constructor(props) {
    super(props);
    const {taskItem} = props;
    this.state = {
      title: taskSelectors.getTaskTitle(taskItem),
      description: taskSelectors.getTaskDescription(taskItem),
      date: taskSelectors.getTaskDate(taskItem) !== null ? taskSelectors.getTaskDate(taskItem) : new Date(),
      time: taskSelectors.getTaskTime(taskItem),
    };
  }

  getTaskID = () => {
    const {navigation} = this.props;

    return navigation.getParam('id', null);
  };

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack(null);
  };

  onPressChooseDate = () => {};

  handleDatePickerReference = ref => (this.datePicker = ref);

  onPressChooseTime = () => {};

  handleTimePickerReference = ref => (this.timePicker = ref);

  onDateChange = date => {
    this.setState({date: date});
  };

  onTimeChange = time => {
    this.setState({
      time: time,
    });
  };

  onPressAddNewTask = () => {
    const {title, description, date, time} = this.state;
    const {setAndUpdateTask, navigation} = this.props;
    if (this.validateTaskData()) {
      const id = this.getTaskID();
      if (!_.isEmpty(id)) {
        let task = {
          id: id,
          title: title,
          description: description,
          date: date,
          time: time,
          isCompleted: false,
        };
        setAndUpdateTask(id, task);
      } else {
        const newID = Math.random()
          .toString(36)
          .substr(2, 9);
        let task = {
          id: newID,
          title: title,
          description: description,
          date: date,
          time: time,
          isCompleted: false,
        };
        setAndUpdateTask(newID, task);
      }

      navigation.goBack(null);
    }
  };

  validateTaskData = () => {
    const {title, date, time} = this.state;
    console.log(date);

    if (_.isEmpty(title)) {
      Toast.error('Your title is empty.');
      return false;
    }
    if (_.isEmpty(time)) {
      Toast.error('Please select your time.');
      return false;
    }

    return true;
  };

  onChangeTitleText = text => {
    this.setState({title: text});
  };

  onChangeDescriptionText = text => {
    this.setState({
      description: text,
    });
  };

  render() {
    const {date, time, title} = this.state;
    const {taskItem} = this.props;
    return (
      <View style={styles.container}>
        <CustomHeaderComponent title="New Task" onPressLeft={this.onPressBack}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View>
              <View>
                <CustomText size="large" style={styles.titleTextStyle}>
                  Title
                </CustomText>
                <TextInput
                  placeholder="Please enter your title"
                  allowFontScaling={false}
                  style={styles.titleTextInputStyle}
                  value={title}
                  onChangeText={this.onChangeTitleText}
                />
              </View>
              <View style={{marginTop: verticalScale(15)}}>
                <CustomText size="large" style={styles.titleTextStyle}>
                  Description (Optional)
                </CustomText>
                <TextInput
                  placeholder="Please enter your description"
                  allowFontScaling={false}
                  onChangeText={this.onChangeDescriptionText}
                  style={styles.descriptionTextInputStyle}
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>
              <View style={{marginTop: verticalScale(15)}}>
                <CustomText size="large" style={styles.titleTextStyle}>
                  Date :
                </CustomText>
                <TouchableOpacity
                  style={styles.chooseDateContainer}
                  activeOpacity={0.6}
                  onPress={this.onPressChooseDate}>
                  <DatePicker
                    // style={styles.datePickerStyle}
                    date={date}
                    mode="date"
                    minDate={new Date()}
                    ref={this.handleDatePickerReference}
                    androidMode="spinner"
                    placeholder="Date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    allowFontScaling={false}
                    customStyles={customDateStyle}
                    onDateChange={this.onDateChange}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: verticalScale(15)}}>
                <CustomText size="large" style={styles.titleTextStyle}>
                  Time :
                </CustomText>
                <TouchableOpacity
                  style={styles.chooseDateContainer}
                  activeOpacity={0.6}
                  onPress={this.onPressChooseTime}>
                  <DatePicker
                    // style={styles.datePickerStyle}
                    date={time}
                    mode="time"
                    // minDate={new Date()}
                    ref={this.handleTimePickerReference}
                    androidMode="spinner"
                    placeholder="Time"
                    //  format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    allowFontScaling={false}
                    customStyles={customDateStyle}
                    onDateChange={this.onTimeChange}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <CustomButton
              style={{marginVertical: verticalScale(15)}}
              title={_.isEmpty(taskItem) ? 'Add Task' : 'Save Task'}
              onPress={this.onPressAddNewTask}
            />
          </ScrollView>
        </CustomHeaderComponent>
      </View>
    );
  }
}

const customDateStyle = {
  dateInput: {
    borderWidth: 0,
  },
  dateText: {
    fontWeight: 'bold',
    fontFamily: 'roboto',
    ...getFontSize('medium'),
  },
  dateTouchBody: {
    height: 'auto',
  },
  placeholderText: {
    color: Colors.placeholderColor,
    fontFamily: 'roboto',
    ...getFontSize('medium'),
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: moderateScale(25),
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  titleTextStyle: {
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  chooseDateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: moderateScale(15),
  },
  titleTextInputStyle: {
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
    flex: 1,
    ...getFontSize('medium'),
    paddingTop: verticalScale(5),
    paddingHorizontal: moderateScale(10),
    marginTop: 0,
    fontFamily: 'roboto',
    fontWeight: 'bold',
  },
  descriptionTextInputStyle: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    flex: 1,
    ...getFontSize('medium'),
    paddingTop: verticalScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: 10,
    marginTop: 0,
    fontFamily: 'roboto',
    fontWeight: 'bold',
  },
});
function mapStateToProps(state, props) {
  const {navigation} = props;
  const taskID = navigation.getParam('id', null);
  return {
    taskItem: selectors.getTaskDataDetail(state, taskID),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAndUpdateTask: (taskID, task) => dispatch(taskAction.setAndUpdateTask(taskID, task)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewTask);
