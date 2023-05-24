import React,{ useState, useImperativeHandle, forwardRef, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectDishes } from '../redux/slices/dishesSlice';
import { 
  selectOngoingDishesSections, 
  deleteDishInOngoingDishes, 
  selectCurrentTable,
  selectNumberOfDiners,
  selectTotalAmountByTableNumber 
} from '../redux/slices/ordersSlice';
import { Divider, Button } from '@rneui/themed';
import { Pressable } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import * as Print from 'expo-print';
import { WebView } from 'react-native-webview';
import { ReturningDishContext } from '../context/appContext';
import { THEME, restaurant, windowHeight, windowWidth } from '../globals/constants';

const ReceiptView = React.forwardRef(({edit}, ref) => {
  const {colors} = THEME;
  const {isReturningDish, setIsReturningDish} = useContext(ReturningDishContext);
  // const [htmlContent, setHtmlContent] = useState('');

  const curTable = useSelector(selectCurrentTable);
  const diners = useSelector(selectNumberOfDiners);
  const dispatch = useDispatch();

  // useEffect(()=> {
  //   const receiptHTML = generateReceiptHTML();
  //   setHtmlContent(receiptHTML);
  // },[]);

  const dishes = useSelector(selectDishes);
  const getDishById = (dishId) => {
    const dish = dishes.find((dish) => dish.id === dishId);
    // console.log("dishprice is",dish.price);
    return dish;
  };

  const dishesSections = useSelector(selectOngoingDishesSections);
  const total = useSelector(selectTotalAmountByTableNumber(curTable));  
  const tax = total * 0.1 ;
  const subtotal = total-tax;

  const btnReturnDishHandler = () => {
    setIsReturningDish(s => !s);
  };

  const btnDeleteDishHandler = (indexS, indexD) => {
    // console.log("delete indexS", indexS);
    dispatch(deleteDishInOngoingDishes({
      indexS:indexS,
      indexD:indexD
    }));
  };

  useImperativeHandle(ref, () => ({
    printReceipt: printReceipt  
  }));

  const printReceipt = async () => {
    await Print.printAsync({
      html: generateReceiptHTML(),
    });
  };

  const generateReceiptHTML =  () => {
    // Generate the HTML markup of the receipt
    const receiptHTML = `
      <html>
        <head>
        <style>
        .container {
          width: 512px;
          display: flex;
          flex-wrap: wrap;
          //background: pink;  
          margin: 0 auto;
        }
        .restaurantInfo {
          width: 100%;
          margin-top: 20px;
          text-align: center;
        }
        .logo {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }      
        .company {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 10px;
        }
        .address {
          margin-top: 5px;
          font-size: 16px;
          text-align: center; 
        }
        .orderInfo {
          width: 100%;
          border-top: 1px solid #ccc;
          margin-top: 10px;
        }
        .curTable {
          text-align: center;
          font-size: 22px;
        }
        .diners {
          text-align: right;
          font-size: 20px;
          margin-right: 10px;
        }
        .dishesInfo {
          width: 100%;
          border-top: 1px solid #ccc;
          // background: purple;
          display:flex;
        }
        table {
          flex:1;
          margin-top: 5px;
        }
        table th {
          font-weight: bold;
          font-size: 24px;
        }
        table td {
          font-size: 22px;
          padding: 2px;
        }
        table th:nth-child(1) {
          width: 42%;
          text-align: left;
          padding-left:5px;
        }
        table th:nth-child(2) {
          width: 8%;
          text-align: right;
        }
        table th:nth-child(3) {
          width: 50%;
          text-align: right;
          padding-right: 5px;
        }
        table td:nth-child(1) {
          width: 42%;
          text-align: left;
          padding-left:5px;
        }
        table td:nth-child(2) {
          width: 8%;
          text-align: right;
        }
        table td:nth-child(3) {
          width: 50%;
          text-align: right;
          padding-right: 5px;
        }
        .totalInfo {
          width: 100%;
          border-top: 1px solid #ccc;
          justify-content: flex-end; 
        }
        .placedTime {
          // background: pink;
          white-space: nowrap;
          margin-left: auto;
        }
        .subTotal {
          text-align: right;
          font-size:20px;
          margin-right:10px;
        }
        .tax {
          text-align: right;
          font-size:20px;
          margin-right: 10px;
        }
        .totalAmount {
          text-align: right;
          font-size: 22px;
          margin-right: 10px;
        }
        </style>
        </head>
        <body>
        <div class="container">
          <div class="restaurantInfo">
            <img class="logo" src=${restaurant.logo} alt="Restaurant Logo">
            <p class="company">${restaurant.company}</p>
            <p class="address">${restaurant.address}</p>
          </div>
          <div class="orderInfo">
            <p class="curTable">Table ${curTable}<p>
            <p class="diners">Diners ${diners}</p>
          </div>
          <div class="dishesInfo">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>       
                ${dishesSections.map((dishSection, indexS) => {
                  const formattedTimestamp = dishSection.placedTime ? new Date(dishSection.placedTime).toLocaleString() : '';
                  const sectionRows = dishSection.dishesOngoing.map((dishItem, indexD) => {
                      const dish = getDishById(dishItem.dishId);
                      return (`
                        <tr>
                          <td>${dish.name}</td>
                          <td>${dishItem.dishQuantity}</td>
                          <td>${dish.price}</td>
                        </tr>
                      `);
                    });
                  const timestampRow = (`
                    <tr style="display:flex;">
                      <td colSpan="3" class="placedTime">placed on ${formattedTimestamp}</td>
                    </tr>`
                  );
                  return sectionRows.join('') + timestampRow;
                }).join('')}
            </tbody>
            </table>
          </div>
          <div class="totalInfo">
            <p class="subTotal">SubTotal:${subtotal}</p>
            <p class="tax">Tax:${tax}</p>
            <p class="totalAmount">Total: ${total}</p>
          </div>
        </div>
        </body>
      </html>
  `;  

    return receiptHTML;
   
  };
  

  return (
    total === 0 ? (
      <Text style={[styles.noPlacedDishesText, {color:colors.dialogPrimary}]}>
        Have no placed dishes yet!
      </Text>
    ) : (
      edit ? ( <View style={styles.container}>
        <ScrollView style={styles.receiptContainer}>
          <View style={styles.restaurantHeader}>
            <Image style={styles.logo} source={{uri:restaurant.logo}} />
            <Text style={styles.company}>{restaurant.company}</Text>
            <Text style={styles.address}>{restaurant.address}</Text>
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.tableNumber}>Table {curTable}</Text>
            <Text style={styles.numberOfDiners}>Diners: {diners}</Text>
          </View>
          <View style={styles.dishesSections}>
            <View style={styles.sectionHeader}>
              <Text style={styles.itemHeader}>Item</Text>
              <Text style={styles.quantityHeader}>Qty</Text>
              <Text style={styles.priceHeader}>Price</Text>
              { isReturningDish && (
                <Text style={styles.optHeader}>Opt</Text>
              )}  
            </View>
            {
              dishesSections.map((dishSection, indexS) => {
                const placedTime = dishSection.placedTime;
                const formattedTimestamp = new Date(placedTime).toLocaleString();
                return (
                  <React.Fragment key={indexS}>
                  {
                    dishSection.dishesOngoing.map((dishItem,indexD) => {
                      const dish = getDishById(dishItem.dishId);
                      return (            
                          <View key={`line-${indexS}-${indexD}`} style={[styles.dishItem, {height: isReturningDish ? 50 : 30}]}>
                            <Text style={styles.name}>{dish.name}</Text>
                            <Text style={styles.quantity}>{dishItem.dishQuantity}</Text>
                            <Text style={styles.price}>{getDishById(dishItem.dishId).price}</Text>
                            { isReturningDish && (
                              <View style={styles.delete_container}>
                                <Pressable style={[styles.delete_btn,{backgroundColor:colors.text}]} onPress={()=>btnDeleteDishHandler(indexS, indexD)}>
                                  <AntDesign name="minus" size={24} color="white"/>
                                </Pressable>
                              </View>
                            )}  
                          </View>                     
                      )
                    })
                  }
                  <Text style={styles.timeText}>placed on {formattedTimestamp}</Text>
                  {indexS < dishesSections.length-1  && <Divider width={1} color={"#ccc"} />}
                  </React.Fragment>
                )
              })
            }
          </View>
          <View style={styles.footer}>
            <Text style={styles.subtotal}>Subtotal: {subtotal}</Text>
            <Text style={styles.tax}>Tax: {tax}</Text>
            <Text style={styles.total}>Total: {total}</Text>
          </View>
        </ScrollView>
        {
          edit ? (     
            <Button
              title={ isReturningDish ? "Finish":"Return Dish" }
              buttonStyle={{
                  backgroundColor: colors.accent,
                  borderRadius: 5,
              }}
              // disabled={orderPlaced}
              titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
              containerStyle={{
                  marginVertical: 0.01*windowHeight,
                  alignSelf: 'center', // center the button horizontally
                  position:"absolute",
                  bottom:0.07*windowHeight
              }}
              onPress={btnReturnDishHandler}
            />
          ) : null
        }
      </View> ) : (
        <WebView 
          source={{html:generateReceiptHTML()}}
          style={{flex:1}} 
           originWhitelist={['file://*']}
          />
        )
    )
    
  );
});

const styles = StyleSheet.create({
  container: {
    flex:1,
    // paddingHorizontal: 20,
    paddingHorizontal:0.02*windowWidth,
    // margin: 10,
    margin:0.01*windowWidth,
    width:"100%",
  },
  noPlacedDishesText: {
    flex:1,
    alignSelf:"center",
    textAlignVertical: "center",
    fontSize: 20
  },
  receiptContainer:{

  },
  orderInfo: {
    borderTopWidth:1,
    borderColor:"#ccc",
    marginTop:10
  },
  tableNumber:{
    alignSelf:"center",
    fontSize:26
  },
  numberOfDiners:{
    alignSelf:"flex-end",
    fontSize:20,
    marginRight:10
  },
  restaurantHeader: {
    marginTop: 20,
    alignItems:"center"
  },
  logo: {
    // width: 100,
    width:0.1*windowWidth,
    height: 0.1*windowWidth,
    resizeMode: 'contain',
  },
  company: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    // marginTop: 5,
    marginTop:0.01*windowHeight,
    fontSize: 14,
  },
  dishesSections: {
    // marginTop: 10,
    marginTop:0.01*windowHeight,
    // paddingTop:10,
    paddingTop:0.01*windowHeight,
    // paddingHorizontal:5,
    paddingHorizontal:0.01*windowWidth,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderColor: '#ccc',
    alignItems:"center",
    justifyContent:"space-between"
  },
  sectionHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dishItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 5,
    marginBottom:0.01*windowHeight,
    alignItems:"center",
    width:"100%",
  },
  itemHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  quantityHeader: {
    // width: 50,
    width:0.05*windowWidth,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceHeader: {
    // width: 70,
    width: 0.08*windowWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor:"green"
  },  
  optHeader:{
    // width: 60,
    width:0.06*windowWidth,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor:"purple"
  },
  name: {
    flex: 1,
    // backgroundColor:"red"
  },
  quantity: {
    // width: 50,
    width:0.05*windowWidth,
    textAlign: 'center',
    // backgroundColor:"blue"
  },
  price: {
    // width: 70,
    width:0.08*windowWidth,
    textAlign: 'center',
    // backgroundColor:"green"
  },
  delete_container: {
    // width:60,
    width:0.06*windowWidth,
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor:"purple"
  },
  delete_btn:{
    // width:30,
    width:0.03*windowWidth,
    // height:30,
    height:0.03*windowWidth,
    // borderRadius:15,
    borderRadius:0.015*windowWidth,
    justifyContent:"center",
    alignItems:"center"
  },
  timeText:{
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderColor: '#ccc',   
    alignSelf:"flex-end"
  },
  separator:{
    // paddingTop:5,
    paddingTop:0.01*windowHeight,
    color:"#ccc"
  },
  footer: {
    alignSelf:"flex-end",
    // marginTop: 20,
    marginTop:0.03*windowHeight,
    borderTopWidth: 1,
    borderColor: '#ccc',
    // paddingTop: 10,
    paddingTop:0.01*windowHeight,
  },
  subtotal: {
    textAlign: 'right',
    // marginBottom: 5,
    marginBottom:0.01*windowHeight,
  },
  tax: {
    textAlign: 'right',
    // marginBottom: 5,
    marginBottom: 0.01*windowHeight,
  },
  total: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default ReceiptView;
