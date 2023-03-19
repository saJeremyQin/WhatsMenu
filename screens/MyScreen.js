import React from 'react';
import { View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';

const MyScreen = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <Card title="Card Title">
          <Input placeholder="Input Field" />
          <Button title="Button" />
        </Card>
      </View>
      <View style={{ flex: 1 }}>
        <Card title="Card Title">
          <Input placeholder="Input Field" />
          <Button title="Button" />
        </Card>
      </View>
    </View>
  );
};

export default MyScreen;
