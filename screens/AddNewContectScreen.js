import React, {useState} from 'react';
import { StyleSheet, Text, View , Keyboard,AsyncStorage,Alert,TouchableWithoutFeedback,ScrollView} from 'react-native';
import {Form ,Item,Input,Label,Button} from 'native-base'

export default function AddNewContectScreen({ navigation }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const saveContect = async () => {
    if (
      fname != "" &&
      lname != "" &&
      phone != "" &&
      email != "" &&
      address != "" 
    ) {
      var contect = {
        fname:fname,
        lname:lname,
        phone:phone,
        email:email,
        address:address 
      }
      await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contect)).then(
         () => {
          navigation.goBack()
         } 
      ).catch(error =>{
        console.log(error)
      })
    }else{
      Alert.alert("All fields are required")
    }
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Form>
          <Item style={styles.inputItem}>
            <Label>First Name</Label>
            <Input
              autoCorrect = {false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={fn => setFname(fn)}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Last Name</Label>
            <Input
              autoCorrect = {false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={Ln => setLname(Ln)}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Phone Number</Label>
            <Input
              autoCorrect = {false}
              autoCapitalize="none"
              keyboardType="number-pad"
              onChangeText={phne => setPhone(phne)}
            />
          </Item>
          <Item style={styles.InputItem}>
            <Label>Email</Label>
            <Input
              autoCorrect = {false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={eml => setEmail(eml)}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Address</Label>
            <Input
              autoCorrect = {false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={add => setAddress(add)}
            />
          </Item>
          
        </Form>
        <Button onPress={() => {
          saveContect()
        }} style={styles.button} full > 
          <Text style={styles.buttonText}> save </Text>
        </Button>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 30
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});