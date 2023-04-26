
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
        // width: '50%',
        // marginLeft: '25%',
        // marginTop: 5,
        // borderRadius: 10,
      }}
      variant="primary"
    >
      <Tab.Item
        title="Cart"
        titleStyle={{ fontSize: 16, fontWeight: index === 0 ? 'bold' : 'normal',color: index === 0 ? 'blue' : 'white'}}     
        icon={{ name: 'cart', type: 'ionicon', color: index === 0 ? 'blue' : 'white' }}
        style={{ backgroundColor: index === 0 ? 'blue' : '#333333' }}
      />
      <Tab.Item
        title="Receipt"
        titleStyle={{ fontSize: 16, fontWeight: index === 1 ? 'bold' : 'normal',color: index === 1 ? 'green' : 'white'}}
        icon={{ name: 'receipt', type: 'ionicon', color: index === 1 ? 'green' : 'white' }}
        style={{ backgroundColor: index === 1 ? 'green' : '#333333' }}
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
