import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import TaskListItem from '../../components/TaskListItem';
import Colors from '../../../../utils/Color';
import _ from 'lodash';
import EmptyItemBox from '../../../components/EmptyItemBox';

class ToDoTaskTab extends Component {
  renderItem = ({item, index}) => {
    const {selectedItem} = this.props;
    return (
      <TaskListItem
        item={item}
        selectedItem={selectedItem}
        onPressMoreItem={this.onPressMoreItem}
        onPressItem={this.onPressItem}
      />
    );
  };

  renderSeparator = () => {
    return <View style={styles.separatorStyle} />;
  };

  onPressMoreItem = id => {
    const {onPressMoreItem} = this.props;

    onPressMoreItem && onPressMoreItem(id);
  };

  onPressItem = id => {
    const {onPressItem} = this.props;

    onPressItem && onPressItem(id);
  };

  render() {
    const {data, selectedItem} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          extraData={selectedItem}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={!_.isEmpty(data) ? this.renderSeparator : false}
          ListEmptyComponent={<EmptyItemBox emptyTitle="No any to-do task" iconName="md-clipboard" />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separatorStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
  },
});

export default ToDoTaskTab;
