import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { User } from '@/types';
import { addActiveUser } from '@/context/user/userSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Login = () => {

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const users = useAppSelector(state => state.reducer.users);
  const dispatch = useAppDispatch();

  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');

  const handleLogin = ()=>{
    const user = {
      email,
      password,
    }
    const index = users.findIndex(u => u.email === user.email && u.password === user.password)
    if(index!=-1){
      dispatch(addActiveUser(users[index]))
      return;
    }

    Toast.show({
      type:'error',
      position:'bottom',
      text1:'Invalid Credentials'
    })
  }

  const handleCreateAcc = ()=> navigation.navigate("Register")

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.form}>
        <Text style={{ color: '#1F41BB', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }} >Login Here</Text>
        <Text style={{ marginTop:-20,fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Welcome back, you've been missed</Text>
        <TextInput placeholder='Email' inputMode='email' style={styles.input} value={email} onChangeText={text => setEmail(text)}/>
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} value={password}  onChangeText={text=>setPassword(text)}/>
        <TouchableOpacity style={{ height: 60, backgroundColor: '#1F41BB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={handleLogin}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height:41, justifyContent:'center', alignItems:'center'}} onPress={handleCreateAcc}>
          <Text style={{fontWeight:'300'}}>Create a new Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    paddingHorizontal:20,
    backgroundColor:'#ffffff',
  },
  input: {
    padding: 20, 
    height:60,
    backgroundColor: '#F1F4FF', 
    borderRadius: 10
  },
  form:{
    gap:30,
  }
})