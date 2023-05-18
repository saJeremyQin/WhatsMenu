
import React,{ useState} from 'react';
import CartView from '../components/CartView';
import { Tab, Text, TabView } from '@rneui/themed';
import ReceiptView from '../components/ReceiptView';
import { THEME, windowHeight } from '../globals/constants';


const OrdersTabView = () => {
  const {colors} = THEME;
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [index, setIndex] = useState(0);

  const onOrderPlaced = () => {
    setIndex(1);
    setOrderPlaced(false);
  };

  return (
    <>
    <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: colors.accent,
        height: 1,
      }}
      variant="primary"
    >
      <Tab.Item
        title="Cart"
        titleStyle={{ 
          fontSize: 14, 
          fontWeight: index === 0 ? 'bold' : 'normal',
          color: index === 0 ? colors.bottomTab.active : colors.bottomTab.inactive
        }}     
        icon={{ 
          name: 'cart', 
          type: 'ionicon', 
          color: index === 0 ? colors.bottomTab.active : colors.bottomTab.inactive 
        }}
        containerStyle={{
          // height:50,
          height:0.09*windowHeight,
          backgroundColor: index === 0 ? colors.bottomTab.inactivebackground : colors.bottomTab.background
        }}
      />
      <Tab.Item
        title="Receipt"
        titleStyle={{ 
          fontSize: 14, 
          fontWeight: index === 1 ? 'bold' : 'normal',
          color: index === 1 ? colors.bottomTab.active : colors.bottomTab.inactive
        }}
        icon={{ 
          name: 'receipt', 
          type: 'ionicon', 
          color: index === 1 ? colors.bottomTab.active : colors.bottomTab.inactive
        }}
        containerStyle={{ 
          // height:50,
          height:0.09*windowHeight,
          // paddingBottom:2,
          backgroundColor: index === 1 ? colors.bottomTab.inactivebackground : colors.bottomTab.background
        }}
      />
    </Tab>

    <TabView value={orderPlaced ? 1:index} onChange={setIndex} animationType="timing">
      <TabView.Item style={{ backgroundColor: colors.background, width: '100%' }}>
        <CartView onOrderPlaced={onOrderPlaced} />
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: colors.background, width: '100%' }}>
        <ReceiptView edit={true}/>
      </TabView.Item>
    </TabView>
    </>
  );
};

export default OrdersTabView;
