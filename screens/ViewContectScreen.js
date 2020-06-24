import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Linking,Platform,Alert,AsyncStorage,ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { Card,CardItem } from 'native-base'

export default function ViewContectScreen({ route, navigation }) {

  const [fname, setFname] = useState("DummyText");
  const [lname, setLname] = useState("DummyText");
  const [phone, setPhone] = useState("DummyText");
  const [email, setEmail] = useState("DummyText");
  const [key, setKey] = useState("keyText");
  const [address, setAddress] = useState("DummyText");

  useEffect(() => {
      const { key } = route.params;
      getContect(key)
  });

  const getContect = async key => {
    await AsyncStorage.getItem(key).then(
      contectJsonString => {
        const contect = JSON.parse(contectJsonString)
        contect["key"] = key
        setKey(contect["key"])
        setFname(contect["fname"])
        setLname(contect.lname)
        setPhone(contect.phone)
        setEmail(contect.email)
        setAddress(contect.address)

      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  const callAction = phone => {
    let phoneNumber = phone
    if (Platform.OS !== "android") {
      phoneNumber = `telpromt:${phone}`
    } else {
      phoneNumber = `tel:${phone}`
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert("phone number is not valid ")
      }else{
        return Linking.openURL(phoneNumber)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const smsAction = phone => {
    let phoneNumber = `sms:${phone}`
    
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert("phone number is not valid ")
      }else{
        return Linking.openURL(phoneNumber)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const editScreen = key => {
    navigation.navigate("Edit",{key:key})
  }

  const deleteAction = key => {
    Alert.alert(
      "Delete Contect ?",
      `${fname} ${lname} `,
      [
        {
          text:"Cancel",onPress:() => console.log("cancel pressed")
        },
        {
          text:"Ok",onPress:async () => {
            await AsyncStorage.removeItem(key)
            .then(() => {
              navigation.goBack()
            })
            .catch(error => {
              console.log(error)
            })
          }
        }
      ]
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contactIconContainer}>
        <Text style={styles.contactIcon}>{fname[0].toUpperCase()}</Text>
        <View style={styles.nameContainer}>
        <Text style={styles.name}>{fname}{lname}</Text>
      </View>
      </View>
      <Card>
        <CardItem bordered>
          <Text style={styles.infoText} >Phone</Text>
        </CardItem>
        <CardItem bordered>
          <Text style={styles.infoText} >{phone}</Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem bordered>
          <Text style={styles.infoText} >Email</Text>
        </CardItem>
        <CardItem bordered>
          <Text style={styles.infoText} >{email}</Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem bordered>
          <Text style={styles.infoText} >address</Text>
        </CardItem>
        <CardItem bordered>
          <Text style={styles.infoText} >{address}</Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem bordered>
          <Text style={styles.infoText} >Your Personal key</Text>
        </CardItem>
        <CardItem bordered>
          <Text style={styles.infoText} >{key}</Text>
        </CardItem>
      </Card>
      <Card style={styles.actionContainer}>
        <CardItem style={styles.actionButton} bordered>
          <TouchableOpacity
            onPress={
              () => {
                smsAction(phone)
              }
            }
          >
            <Entypo 
              name="message"
              size={50}
              color="#B83227"
            />
          </TouchableOpacity>
        </CardItem>
        <CardItem style={styles.actionButton} bordered>
          <TouchableOpacity
            onPress={
              () => {
                callAction(phone)
              }
            }
          >
            <Entypo 
              name="phone"
              size={50}
              color="#B83227"
            />
          </TouchableOpacity>
        </CardItem>
        
      </Card>
      {/* edit and delete buttions */}
      <Card style={styles.actionContainer}>
        <CardItem style={styles.actionButton} bordered>
          <TouchableOpacity
            onPress={
              () => {
                editScreen(key)
              }
            }
          >
            <Entypo 
              name="edit"
              size={50}
              color="#B83227"
            />
          </TouchableOpacity>
        </CardItem>
        <CardItem style={styles.actionButton} bordered>
          <TouchableOpacity
            onPress={
              () => {
                deleteAction(key)
              }
            }
          >
            <Entypo 
              name="trash"
              size={50}
              color="#B83227"
            />
          </TouchableOpacity>
        </CardItem>
        
      </Card>
      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  }
});
