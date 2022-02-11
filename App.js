import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Text, TouchableWithoutFeedbackBase, Alert, ActivityIndicator } from 'react-native';
import Combobox from './src/Components/Combobox';
import Table from './src/Components/Table';

const searchParameters = [{ id: 0, label: "name", display: "Name" },
{ id: 1, label: "given", display: "Given" },
{ id: 2, label: "family", display: "Family" },
{ id: 3, label: "id", display: "Id" }];
const App = () => {
  const [searchText, setText] = useState("");
  const [show, setShow] = useState(false);
  const [searchParameter, setsearchParameter] = useState("");
  const [response, setResponse] = useState();
  const [spinnerShow, setSpinnerShow] = useState(false)
  const handleId = (id) => {
    setsearchParameter(searchParameters.filter(p => p.id === id)[0]);
  }
  const [isToAllowSearch, setIsToAllowSearch] = useState(true);

  //5s de bir aramaya izin verilmiştir.
  useEffect(() => {
    if (!isToAllowSearch) {
      setTimeout(() => setIsToAllowSearch(true), 5000);
    }
  }, [isToAllowSearch])


  const searchPress = () => {
    let searchKey = searchText
    let searchKeyWithoutStar = searchKey.replaceAll("*", "");
    if (searchParameter.label === undefined || searchParameter.label === "" || searchParameter.label === null) {
      Alert.alert("Error", "Please select a search parameter");
    }
    else if (searchKeyWithoutStar.length < 2) {
      Alert.alert("Error", "Please search with at least 2 character/number");
    }
    else {
      setSpinnerShow(true);
      if (isToAllowSearch) {
        fetch(`http://fhir.imagerad.com/dummy/Patient/?${searchParameter.label}=${searchText.trim()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/fhir+json",
            "Content-Type": "application/fhir+xml",
          },
          redirect: 'follow'
        })
          .then(response => response.json())
          .then(data => {
            setResponse(data)
            setSpinnerShow(false);
          })
          .catch(error => console.log(error));
        setIsToAllowSearch(false);
      }
    }
  }

  return (
    <View onp style={styles.container}>
      <ScrollView>
        <View style={styles.searchBar}>
          <Combobox
            handleId={(id) => handleId(id)}
            setShow={(value) => setShow(value)}
            show={show}
            placeHolder="Search by"
            data={searchParameters}
            style={styles.searchParameter}></Combobox>
          <TextInput onFocus={() => setShow(false)} style={styles.searchBarInput} onChangeText={setText} value={searchText} />
          <TouchableOpacity onPress={() => searchPress()}>
            <View style={styles.button}>
              <Text style={{ color: "white" }}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Table data={response}></Table>
        {spinnerShow ? <ActivityIndicator size="large" /> : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#fff'
  },
  searchBar: {
    flex: 0.1,
    flexDirection: "row",
    zIndex: 2,
  },
  searchBarInput: {
    flex: 0.7,
    height: 40,
    marginVertical: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#DDDDFF',
  },
  searchParameter: {
    flex: 0.6,
    marginVertical: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    alignContent: "center",
    borderColor: "#DDDDFF",
  },
  button: {
    marginVertical: 12,
    marginHorizontal: 5,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
  },
});

export default App;
