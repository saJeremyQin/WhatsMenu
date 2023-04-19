
import React,{ useState} from 'react';
import CartView from '../components/CartView';
import { Tab, Text, TabView } from '@rneui/themed';
import ReceiptView from '../components/ReceiptView';


const OrdersTabView = () => {
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
        backgroundColor: 'white',
        height: 3,
      }}
      variant="primary"
    >
      <Tab.Item
        title="Cart"
        titleStyle={{ fontSize: 16 }}
        icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="Receipt"
        titleStyle={{ fontSize: 16 }}
        icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
      />
    </Tab>

    <TabView value={orderPlaced ? 1:index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: '#f0f0f0', width: '100%' }}>
        <CartView onOrderPlaced={onOrderPlaced} />
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: '#f0f0f0', width: '100%' }}>
        <ReceiptView edit={true}/>
      </TabView.Item>
    </TabView>
    </>
  );
};

export default OrdersTabView;
