import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import _ from 'lodash';
import EmptyItemBox from '../../../components/EmptyItemBox';
import TaskListItem from '../../components/TaskListItem';
import Colors from '../../../../utils/Color';

class CompletedTaskTab extends Component {
  renderItem = ({item, index}) => {
    return <TaskListItem item={item} onPressMoreItem={this.onPressMoreItem} onPressItem={this.onPressItem} />;
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
    const {data} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={!_.isEmpty(data) ? this.renderSeparator : false}
          ListEmptyComponent={<EmptyItemBox emptyTitle="No any completed task" iconName="md-clipboard" />}
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

export default CompletedTaskTab;
