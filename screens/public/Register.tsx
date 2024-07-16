import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { User, UserRegister } from "@/types";
import { addUser } from "@/context/user/userSlice";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";

import Toast from "react-native-toast-message";

const Register = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const users:User[] = useAppSelector(state => state.reducer.users);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<UserRegister>({
    confirmPassword: "",
    email: "",
    name: "",
    password: "",
  });

  const handle = () => navigation.navigate("Login");

  const handleOnChange = (text: String, input: keyof UserRegister) => {
    setData((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleSetError = (text: String, input: keyof UserRegister) => {
    setError((prevState) => ({ ...prevState, [input]: text }));
  };

  const validate = () => {

    let errorFound = false
    if (data.name.length == 0){
      setError((prevState) => ({
        ...prevState,
        name: "Please give some username",
      }));
      errorFound = true
    }
    if (!data.email.match(/\S+@\S+\.\S+/)){
      setError((prevState) => ({ ...prevState, email: "Invalid Email" }));
      errorFound = true
    }

    if (data.password.length < 8){
      setError((prevState) => ({
        ...prevState,
        password: "Minimum password length is 8",
      }));
      errorFound = true
    }

    if (data.confirmPassword !== data.password){
      setError((prevState) => ({
        ...prevState,
        confirmPassword: "Both passwords are wrong",
      }));
      errorFound = true
    }
    return errorFound === false
  };

  const handleSignUp = () => {
    if (validate()) {
      const user: User = {
        name: data.name,
        password: data.password,
        email: data.email,
        id: String(Date.now()),
        tasks: [],
      };

      const index = users.findIndex(u => u.email === user.email)

      if(index !== -1){
        Toast.show({
          type:'error',
          text1:'Email ID already existing',
          position:'bottom'
        })
        return;
      }
      dispatch(addUser(user));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text
          style={{
            color: "#1F41BB",
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Create Account
        </Text>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          Create an account to use all features provided by the app
        </Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={data.name}
          onChangeText={(text) => handleOnChange(text, "name")}
          onFocus={() => handleSetError("", "name")}
        />
        {error.name.length > 0 ? (
          <Text style={styles.errorMessage}>{error.name}</Text>
        ) : null}
        <TextInput
          placeholder="Email"
          inputMode="email"
          style={styles.input}
          value={data.email}
          onChangeText={(text) => handleOnChange(text, "email")}
          onFocus={() => handleSetError("", "email")}
        />
        {error.email.length > 0 ? (
          <Text style={styles.errorMessage}>{error.email}</Text>
        ) : null}

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          value={data.password}
          onChangeText={(text) => handleOnChange(text, "password")}
          onFocus={() => handleSetError("", "password")}
        />
        {error.password.length > 0 ? (
          <Text style={styles.errorMessage}>{error.password}</Text>
        ) : null}
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={styles.input}
          value={data.confirmPassword}
          onChangeText={(text) => handleOnChange(text, "confirmPassword")}
          onFocus={() => handleSetError("", "confirmPassword")}
        />
        {error.confirmPassword.length > 0 ? (
          <Text style={styles.errorMessage}>{error.confirmPassword}</Text>
        ) : null}
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: "#1F41BB",
            borderRadius: 10,
            justifyContent: "center",
          }}
          onPress={handleSignUp}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 41 }} onPress={handle}>
          <Text style={{ fontWeight: "300", textAlign: "center" }}>
            Already have an Account?
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  input: {
    height: 60,
    padding: 20,
    backgroundColor: "#F1F4FF",
    borderRadius: 10,
  },
  form: {
    gap: 20,
  },
  errorMessage: {
    color: "red",
    marginTop:-10,
    textAlign: "right",
  },
});
