import React , { useState,useEffect } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,AsyncStorage,FlatList} from 'react-native';
import {Card} from 'native-base'
import { Entypo } from '@expo/vector-icons';


export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([])

  const getAllData = async () => {
    
    await AsyncStorage.getAllKeys().then(keys => {
      
      return AsyncStorage.multiGet(keys).then(result => {
        setData(result)
        
      }).then(error => {
        console.log(error)
      })
      
    })
    .catch(error => { 
      console.log(error)
    })
    //console.log(data)
  }
  

  //getAllData();

  useEffect( () =>{
    navigation.addListener("willFocus", getAllData() )   
    console.log("sepration")  
  },[]
    
  )

  return (
    <View style={styles.container}>
      <FlatList 
      
      data={data}
      renderItem={({item}) =>{
        const contect= JSON.parse(item[1]);
        return (
          <TouchableOpacity onPress={() => {navigation.navigate("View",{key : item[0].toString()})}}>
            <Card style={styles.listItem}>
              <View style={styles.iconContainer}>
                <Text style = {styles.contactIcon}> { contect.fname[0].toUpperCase() }</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>{contect.fname}{contect.lname}</Text>
                <Text style={styles.infoText}>{contect.phone}</Text>
              </View>
            </Card>
          </TouchableOpacity>

        )

      }}

      keyExtractor = {(item,index) => item[0].toString()}

      />


      <TouchableOpacity
      onPress={() => navigation.navigate('Add')}
      style={styles.floatButton}
      >
      <Entypo
      name="plus"
      size={30}
      color='#fff'
      />
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100
  }
});