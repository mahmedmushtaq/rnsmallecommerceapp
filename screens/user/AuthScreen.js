import React,{useState} from "react";
import {StyleSheet,View,ScrollView,Text,Button,KeyboardAvoidingView} from "react-native";
import Input from "../../components/ui/Input";
import Colors from "../../constants/Colors";
import Card from "../../components/ui/Card";
import {LinearGradient} from "expo-linear-gradient";
import {useDispatch} from "react-redux";
import * as authActions from "../../store/actions/auth";


const AuthScreen = props=>{

    const [email,setEmail] = useState('');
    const [error,setError]  =useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();

    const createNewUser = async ()=>{
        try {
            setError("");
            await dispatch(authActions.signUp(email, password));
            props.navigation.navigate("Shop");
        }catch(err){
            setError(err);
        }
    }
    const login = async ()=>{

        try {
            setError("");
           await dispatch(authActions.login(email, password))
            props.navigation.navigate("Shop");
        }catch(error){
            setError(error);
        }

    }

    return(
        <KeyboardAvoidingView
            behaviour={"padding"}
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
       <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient} >
        <Card style={styles.authContainer}>
            <ScrollView>
                <Input
                    id="email"
                    label="E-Mail"
                    keyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorText="Please enter a valid email address."
                    onInputChange={(id,value) => setEmail(value)}
                    initialValue=""
                />
                <Input
                    id="password"
                    label="Password"
                    keyboardType="default"
                    secureTextEntry
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorMessage="Please enter a valid password."
                    onInputChange={(id,value) => {setPassword(value)}}
                    initialValue=""
                />

                <View style={styles.buttonContainer}>
                    <Button title="Login" color={Colors.primary} onPress={() => login()} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign Up"
                        color={Colors.secondary}
                        onPress={createNewUser}
                    />
                </View>

            </ScrollView>
        </Card>
       </LinearGradient>


            {
                error ? <Text style={{color:"red"}}>{error.toString()}</Text> : <Text>""</Text>
            }


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;