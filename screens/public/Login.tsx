import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { User } from '@/types';
import { addActiveUser } from '@/context/user/userSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const Login = () => {

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const users = useAppSelector(state => state.reducer.users);
  const dispatch = useAppDispatch();

  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');

  useEffect(()=>{
    console.log(users)
  },[users])

  const handleLogin = ()=>{
    const user = {
      email,
      password,
    }
    const index = users.findIndex(u => u.email === user.email && u.password === user.password)
    if(index!=-1){
      dispatch(addActiveUser(users[index]))
    }
  }

  const handleCreateAcc = ()=> navigation.navigate("Register")

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', gap: 26, paddingHorizontal: 96, top: 97 }}>
        <Text style={{ color: '#1F41BB', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }} >Login Here</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Welcome back, you've been missed</Text>
      </View>
      <View style={{  top: 170, gap: 29 }}>
        <TextInput placeholder='Email' inputMode='email' style={styles.input} value={email} onChangeText={text => setEmail(text)}/>
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} value={password}  onChangeText={text=>setPassword(text)}/>
      </View>
      <View style={{ top:297 }}>
        <TouchableOpacity style={{ width: 357, height: 60, backgroundColor: '#1F41BB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={handleLogin}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:357, height:41, justifyContent:'center', alignItems:'center'}} onPress={handleCreateAcc}>
          <Text style={{fontWeight:'300'}}>Create a new Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 357,
    padding: 20, 
    backgroundColor: '#F1F4FF', 
    borderRadius: 10
  }
})