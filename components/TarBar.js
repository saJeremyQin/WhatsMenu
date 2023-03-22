import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'column', backgroundColor: '#333', width: 150, height:"100%" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={route.key}
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 10, backgroundColor: isFocused ? '#555' : '#333' }}
          >
            <Text style={{ color: isFocused ? '#fff' : '#aaa', fontSize: 16, fontWeight: 'bold', marginRight: 8 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;



