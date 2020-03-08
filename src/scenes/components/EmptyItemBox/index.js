import CustomText from '../CustomText/index';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, verticalScale} from '../../../utils/Scaling';
import {View, StyleSheet} from 'react-native';
import Colors from '../../../utils/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function getIconComponent(iconName, iconColor, iconFamily, iconSize) {
  if (iconFamily === 'Ionicon') {
    return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
  } else if (iconFamily === 'MaterialIcons') {
    return <MaterialIcons name={iconName} size={iconSize} color={iconColor} />;
  } else if (iconFamily === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />;
  }
}

const EmptyItemBox = ({
  style,
  iconName,
  iconColor = '#979797',
  iconFamily = 'Ionicon',
  imageSource,
  emptyTitle,
  emptyDesc,
  emptyBtnText,
  onPress,
  emptyBtnStyle,
  emptyBtnTextStyle,
  children,
  iconSize = 55,
  imageStyle,
}) => {
  return (
    <View style={[styles.emptyContainer, style]}>
      {getIconComponent(iconName, iconColor, iconFamily, iconSize)}
      {emptyTitle ? (
        <CustomText size="large" style={styles.emptyTitle}>
          {emptyTitle}
        </CustomText>
      ) : (
        false
      )}
      {emptyDesc ? <CustomText style={styles.emptyText}>{emptyDesc}</CustomText> : false}
      {onPress ? (
        <CustomButton
          style={[styles.emptyBtnText, emptyBtnStyle]}
          title={emptyBtnText}
          textStyle={[styles.emptyBtnTextStyle, emptyBtnTextStyle]}
          onPress={() => onPress && onPress()}
        />
      ) : (
        false
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: '50%',
  },
  emptyTitle: {
    fontWeight: '500',
    marginTop: verticalScale(10),
    color: Colors.secondaryTextColor,
  },
  emptyText: {
    marginTop: moderateScale(8),
    textAlign: 'center',
    color: 'gray',
    fontWeight: '400',
    paddingHorizontal: moderateScale(45),
    lineHeight: 25,
  },
  emptyBtnText: {
    marginTop: moderateScale(15),
    width: moderateScale(200),
    backgroundColor: Colors.primaryThemeColor,
  },
  imageStyle: {
    height: 250,
    width: 250,
  },
  emptyBtnTextStyle: {
    color: 'white',
  },
});

export default EmptyItemBox;
