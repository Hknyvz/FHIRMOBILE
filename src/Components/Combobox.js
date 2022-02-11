import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const Combobox = (props) => {
  const [text, setText] = useState("");
  const [data, setdata] = useState(props.data);
    const [width, setWidth] = useState(0);
    const [top, setTop] = useState(0);
    const touchHandle=()=>{
        props.setShow(!props.show);
    }
    const blurHandle=()=>{
        props.setShow(false);
    }
    const pressItem = (item) => {
        setText(item.display);
        props.setShow(false);
        props.handleId(item.id);
    }
    const onLayoutView=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;
        setWidth(width);
    }

    const onLayoutTouch=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;
        setTop(height);
    }
  return (
    <View onLayout={onLayoutView} style={props.style}>
        <TouchableHighlight onLayout={onLayoutTouch} onPress={touchHandle}>
            <View style={styles.comboBoxText}>
                {text==""?<Text style={{color:"black"}}>{props.placeHolder}</Text>:<Text style={styles.text}>{text}</Text>}
            </View>
        </TouchableHighlight>
        <View style={{width:width-1, position: 'absolute', left:0,top:top, zIndex:1, height:100}}>
        {props.show && 
            data.map((item) => 
            <TouchableHighlight key={item.id} onPress={()=>pressItem(item)}>
                <View style={styles.comboBoxItem}>
                    <Text style={styles.text}>{item.display}</Text>
                </View>
            </TouchableHighlight>)
        }
        </View>
    </View>
  );
};

export default Combobox;

const styles = StyleSheet.create({
    comboBoxItem: {
        alignItems: "center",
        backgroundColor: "#AACCFF",
        padding: 10,
        borderWidth:1,
        borderColor:"#DDDDFF",
    },
    comboBoxText:{
        alignItems: "center",
        backgroundColor: "#AACCFF",
        padding: 10
    },
    text:{
        fontWeight:'bold',
        color:"black"
    }
});
