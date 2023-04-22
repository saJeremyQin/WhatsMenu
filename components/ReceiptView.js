import React,{ useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectDishes } from '../redux/slices/dishesSlice';
import { 
  selectOngoingDishesSections, 
  deleteDishInOngoingDishes, 
  selectCurrentTable,
  selectNumberOfDiners 
} from '../redux/slices/ordersSlice';
import { Divider, Button } from '@rneui/themed';
import { Pressable } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import * as Print from 'expo-print';
import { WebView } from 'react-native-webview';



const ReceiptView = React.forwardRef((props, ref) => {
  // const htmlRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [returningDish, setReturningDish] = useState(false);

  const curTable = useSelector(selectCurrentTable);
  const diners = useSelector(selectNumberOfDiners);
  const dispatch = useDispatch();

  const logo_img = require("../assets/restaurant_logo.png");
  const restaurant = {
    company:"Forks and Chopsticks Asian Restaurant",
    address:"Unit 69/155 Brebner Dr, West Lakes SA 5021",
    logo:logo_img
  };

  useEffect(()=> {
    const receiptHTML = generateReceiptHTML();
    // console.log("receiptHtml is",receiptHTML);
    setHtmlContent(receiptHTML);
  },[]);

  // dishSections, [{[dishesPlaced1], time1}, {[dishesPlaced2],time2}]
  const dishes = useSelector(selectDishes);
  const getDishById = (dishId) => {
    const dish = dishes.find((dish) => dish.id === dishId);
    // console.log("dishprice is",dish.price);
    return dish;
  };

  const dishesSections = useSelector(selectOngoingDishesSections);

  // Calculate the total money of all sections.
  let total = 0;
  dishesSections.map((dishSection) => {
    // console.log("dishSection.dishesOngoing is",dishSection.dishesOngoing);
    total = total + dishSection.dishesOngoing.reduce(
      (acc, dish) => acc + getDishById(dish.dishId).price * dish.dishQuantity,0
    );
    // console.log("subtotal inside is", subtotal);
  })
  
  // console.log("receipt subtotal is", subtotal);
  
  const tax = total * 0.1 ;
  const subtotal = total-tax;

  const btnReturnDishHandler = () => {
    setReturningDish(!returningDish);
    // console.log("return Dish here");
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
    // const receiptData = await generateReceiptHTML();
    await Print.printAsync({
      html: htmlContent,
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
          margin-top: 30px;
          text-align: center;
        }
        .logo {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }      
        .company {
          font-size: 24px;
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
          font-size: 26px;
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
            <img class="logo" src="https://studentserver.com.au/daqin/images/restaurant_logo.png" alt="Restaurant Logo">
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
                  {console.log("placed time is,",dishSection.placedTime)}
                  const formattedTimestamp = dishSection.placedTime ? new Date(dishSection.placedTime).toLocaleString() : '';
                  {console.log("formattedTime is", formattedTimestamp)}
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
                    <tr>
                    <td></td>
                    <td></td>
                    <td>${formattedTimestamp}</td>
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
    props.edit ? ( <View style={styles.container}>
      <ScrollView style={styles.receiptContainer}>
        <View style={styles.restaurantHeader}>
          <Image style={styles.logo} source={restaurant.logo} />
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
            { returningDish && (
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
                        <View key={`line-${indexS}-${indexD}`} style={[styles.dishItem, {height: returningDish ? 50 : 30}]}>
                          <Text style={styles.name}>{dish.name}</Text>
                          <Text style={styles.quantity}>{dishItem.dishQuantity}</Text>
                          <Text style={styles.price}>{getDishById(dishItem.dishId).price}</Text>
                          { returningDish && (
                            <View style={styles.delete_container}>
                              <Pressable style={styles.delete_btn} onPress={()=>btnDeleteDishHandler(indexS, indexD)}>
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
        props.edit ? (     
          <Button
            title={ returningDish ? "Finish":"ReturnDish" }
            buttonStyle={{
                backgroundColor: 'rgba(111, 202, 186, 1)',
                borderRadius: 5,
            }}
            // disabled={orderPlaced}
            titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
            containerStyle={{
                marginVertical: 10,
                alignSelf: 'center', // center the button horizontally
                position:"absolute",
                bottom:30
            }}
            onPress={btnReturnDishHandler}
          />
        ) : null
      }
    </View> ) : (
      <WebView 
        source={{html:htmlContent}}
        style={{flex:1}} 
         originWhitelist={['file://*']}
        />
      )
  );
});

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 20,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 10,
    margin: 10,
    // backgroundColor:"pink",
    width:"100%",
    // alignItems:"center",
    // justifyContent:"space-between"
  },
  receiptContainer:{

  },
  orderInfo: {
    borderTopWidth:1,
    borderColor:"#ccc",
    marginTop:10
    // backgroundColor:"pink"   
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
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  company: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    marginTop: 5,
    fontSize: 14,
  },
  dishesSections: {
    marginTop: 10,
    paddingTop:10,
    paddingHorizontal:5,
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
    marginBottom: 5,
    alignItems:"center",
    width:"100%",
    // height:80,
    // backgroundColor:"pink"
  },
  itemHeader: {
    flex: 1,
    fontWeight: 'bold',
    // backgroundColor:"red"
  },
  quantityHeader: {
    width: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor:"blue"
  },
  priceHeader: {
    width: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor:"green"
  },  
  optHeader:{
    width: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor:"purple"
  },
  name: {
    flex: 1,
    // backgroundColor:"red"
  },
  quantity: {
    width: 50,
    textAlign: 'center',
    // backgroundColor:"blue"
  },
  price: {
    width: 70,
    textAlign: 'center',
    // backgroundColor:"green"
  },
  delete_container: {
    width:60,
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor:"purple"
  },
  delete_btn:{
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:"#f00",
    // marginLeft:40,
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
    paddingTop:5,
    color:"#ccc"
  },
  footer: {
    alignSelf:"flex-end",
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  subtotal: {
    textAlign: 'right',
    marginBottom: 5,
  },
  tax: {
    textAlign: 'right',
    marginBottom: 5,
  },
  total: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default ReceiptView;
