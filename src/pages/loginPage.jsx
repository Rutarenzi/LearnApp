import React, {useRef}from "react";
import { View,PanResponder,Animated, Text, Image,SafeAreaView,StyleSheet} from "react-native";
import Colors from "../shared/colors";
import { AntDesign } from '@expo/vector-icons';

const LoginPage=()=>{
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: ()=> true,
            onPanResponderMove: (_,gestureState)=>{
                if(gestureState.dy < 0 && gestureState.dy >= -100)
               {
                Animated.event(
                    [null, { dy: animatedValue }],
                    { useNativeDriver: false }
                  )(_, gestureState);
               }
            },
            onPanResponderRelease:()=>{
                if(animatedValue._value < 0){
                    Animated.timing(animatedValue,{
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current
    const animatedValue = useRef(new Animated.Value(0)).current;
    return(
        <SafeAreaView style={styles.container}>
                <Image source={require("../assests/login.png")} style={styles.Img}/>
                <Animated.View {...panResponder.panHandlers}
                style={[
                   styles.container2,
                    {transform: [{translateY: animatedValue}],}
                ]}>
               <View style={styles.container2}>
                    <Text style={styles.Texter}>Welcome to IGApp</Text>
                    <Text style={styles.Texter2}>Login/SignUp</Text>
                    <View style={styles.button}>
                    <AntDesign name="google" size={24} color="white" />
                        <Text style={{color: "white"}}> Sign up with Google</Text>
                    </View>
                </View> 
                </Animated.View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS=="android" ? 24: 0,
    },
    container2: {
     backgroundColor: "white",
     paddingTop:40,
     marginTop: -25,
    
     borderTopRightRadius:25,
     borderTopLeftRadius: 25
    },
    draggableBox: {
     width: 150,
     height:150,
     backgroundColor: 'blue'
    },
    Img:{
      width: "100%",
    },
    Texter: {
        fontSize:35,
        textAlign: 'center',
        fontWeight:"bold"
    },
    Texter2: {
        marginTop: "50%",
        textAlign: "center",
        fontSize: 15
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        alignSelf:"center",
        width: "75%",
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",
        alignItems: "center",
        borderRadius: 20,
        marginTop: 10
    }
})
export default LoginPage