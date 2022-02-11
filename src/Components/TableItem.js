import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const TableItem = (props) => {
  const [patient, setPatient] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState({
    line: "",
    city: "",
    country: ""
  })
  const [phone, setPhone] = useState("")
  useEffect(() => {
    if (props.patient !== undefined) {
      setPatient(props.patient);
      let name = props.patient.resource.name.filter(item => item.use == "usual")[0];
      setName(getName(name));
      setGender(props.patient.resource.gender);
      setId(props.patient.resource.id);
      let address = props.patient.resource.address.filter(item => item.use == "home")[0];
      setAddress(getAddress(address));
      let phone = props.patient.resource.telecom.filter(item => item.system == "phone")[0];
      setPhone(getPhone(phone));
    }
  }, [props.patient])

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.left}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.smallFont}>Id:{id}</Text>
          <Text style={styles.smallFont}>{gender}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.left}>
          <Text style={styles.smallFont}>Address</Text>
          <Text style={styles.smallFont}>Line: {address.line}</Text>
          <Text style={styles.smallFont}>City: {address.city}</Text>
          <Text style={styles.smallFont}>Country: {address.country}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.smallFont}>Phone</Text>
          <Text style={styles.smallFont}>{phone}</Text>
        </View>
      </View>
    </View>
  )
}

export default TableItem

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    height: 160,
    borderWidth: 3,
    borderColor: "#DDDDFF"
  },
  top: {
    flex: 0.35,
    flexDirection: "row",
    backgroundColor: "#1C96C5"
  },
  bottom: {
    flex: 0.65,
    flexDirection: "row",
    backgroundColor: "#A0D9EF"
  },
  left: {
    flex: 0.7
  },
  right: {
    flex: 0.35
  },
  name: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold"
  },
  smallFont: {
    fontSize: 15,
    color: "black"
  }
})

const getName = (name) => {
  let fullName = "";
  for (let i = 0; i < name.given.length; i++) {
    fullName += name.given[i] + " ";
  }
  fullName += name.family
  return fullName;
}

const getAddress = (address) => {
  let fullAddress = {
    line: "",
    city: "",
    country: ""
  };
  for (let i = 0; i < address.line.length; i++) {
    fullAddress.line += address.line[i];
  }
  fullAddress.city = address.city;
  fullAddress.country = address.country;
  return fullAddress;
}

const getPhone = (phone) => {
  return phone.value;
}