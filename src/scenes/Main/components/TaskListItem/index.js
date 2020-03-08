import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale, verticalScale} from '../../../../utils/Scaling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../utils/Color';
import CustomText from '../../../components/CustomText';
import * as taskSelectors from '../../../../selectors/task';
import _ from 'lodash';

class TaskListItem extends Component {
  onPressMoreItem = () => {
    const {onPressMoreItem, item} = this.props;
    const id = taskSelectors.getTaskID(item);

    onPressMoreItem && onPressMoreItem(id);
  };

  onPressItem = () => {
    const {onPressItem, item} = this.props;
    const id = taskSelectors.getTaskID(item);
    onPressItem && onPressItem(id);
  };

  render() {
    const {item, selectedItem} = this.props;
    const isCompleted = taskSelectors.getTaskIsCompleted(item);
    const id = taskSelectors.getTaskID(item);
    const title = taskSelectors.getTaskTitle(item);
    const description = taskSelectors.getTaskDescription(item);
    const date = taskSelectors.getTaskDate(item);
    const isSelected = _.includes(selectedItem, id);
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.6} onPress={this.onPressItem} style={styles.leftContainer}>
          {!isCompleted ? (
            <Ionicons
              name={isSelected ? 'ios-radio-button-on' : 'ios-radio-button-off'}
              color={Colors.primaryThemeColor}
              size={25}
            />
          ) : (
            false
          )}
          <View style={styles.leftContentContainer}>
            <CustomText style={styles.titleTextStyle}>{title}</CustomText>
            {!_.isEmpty(description) ? (
              <CustomText numberOfLines={3} style={{marginTop: verticalScale(5)}}>
                {description}
              </CustomText>
            ) : (
              false
            )}
            <CustomText style={styles.dateTextStyle}>{date.toString()}</CustomText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.rightContainer} onPress={this.onPressMoreItem}>
          <Ionicons name="md-more" color="gray" size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    marginLeft: moderateScale(10),
    padding: 10,
  },
  leftContentContainer: {
    flex: 1,
    marginLeft: moderateScale(10),
  },
  dateTextStyle: {
    marginTop: verticalScale(8),
  },
  titleTextStyle: {
    fontWeight: 'bold',
  },
});

export default TaskListItem;
