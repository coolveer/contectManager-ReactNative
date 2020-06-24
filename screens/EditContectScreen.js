import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Keyboard,AsyncStorage,Alert,TouchableWithoutFeedback,ScrollView } from 'react-native';
import {Form ,Item,Input,Label,Button} from 'native-base'

export default function EditContectScreen({ route, navigation }) {

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

  

  const updateContect = async key => {
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
      await AsyncStorage.mergeItem(key, JSON.stringify(contect)).then(
         () => {
          navigation.goBack()
         } 
      ).catch(error =>{
        console.log(error)
      })
    }
  }

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


  return (
    <View style={styles.container}>
      <Form>
        <Item style={styles.inputItem}>
          <Label>First name</Label>
          <Input 
          autoCorrect = {false}
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={Ln => setFname(Ln)}
          value={fname}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label>last name</Label>
          <Input 
          autoCorrect = {false}
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={fn => setLname(fn)}
          value={lname}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label>Phone</Label>
          <Input 
          autoCorrect = {false}
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={phone => setLname(phone)}
          value={phone}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label>First name</Label>
          <Input 
          autoCorrect = {false}
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={email => setLname(email)}
          value={email}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label>First name</Label>
          <Input 
          autoCorrect = {false}
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={address => setLname(address)}
          value={address}
          />
        </Item>
        <Button style={styles.button} full rounded onPress={() => {
          updateContect(key)
        }}>
          <Text style={styles.buttonText}>update</Text>
        </Button>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
