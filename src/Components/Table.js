import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TableItem from './TableItem';

const Table = (props) => {
  const [patientData, setData] = useState([]);

  useEffect(() => {
    if (props.data != null && props.data.total > 0) {
      setData(props.data.entry.filter(p => p.resource.resourceType == "Patient"));
    }
    else{
      setData([])
    }
  }, [props.data]);
  return (
    <View style={{ minHeight: 150 }}>
      {patientData.map((item, i) => <TableItem key={i} patient={item}></TableItem>)}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({

});
