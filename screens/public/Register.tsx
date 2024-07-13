import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch } from '@/hooks/reduxHooks';
import { User } from '@/types';
import { addUser } from '@/context/user/userSlice';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';

const Register = () => {
  
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();

  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const handle = () => navigation.navigate("Login")
  

  const validate = ()=>{
    if(password !== confirmPassword)
        return false;
    return true
  }

  const handleSignUp = ()=>{
    if(validate()){

      const user:User = {
        email,
        id:String(Date.now()),
        name,
        password,
        tasks:[]
      }
      dispatch(addUser(user))
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', gap: 26, paddingHorizontal: 25, top: 97 }}>
        <Text style={{ color: '#1F41BB', fontSize: 30, fontWeight: 'bold',textAlign:'center'}} >Create Account</Text>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>Create an account to use all features provided by the app</Text>
      </View>
      <View style={{ top: 170, gap: 29 }}>
        <TextInput placeholder='Name' style={styles.input} value={name} onChangeText={text => setName(text)}/>
        <TextInput placeholder='Email' inputMode='email' style={styles.input} value={email} onChangeText={text=>setEmail(text)} />
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} value={password} onChangeText={text => setPassword(text) }/>
        <TextInput placeholder='Confirm Password' secureTextEntry={true} style = {styles.input} value={confirmPassword} onChangeText={text => setConfirmPassword(text)} />
      </View>
      <View style={{ top: 250, gap:30 }}>
        <TouchableOpacity style={{ width: 357, height: 60, backgroundColor: '#1F41BB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={handleSignUp}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 357, height: 41, justifyContent: 'center', alignItems: 'center' }} onPress={handle}>
          <Text style={{ fontWeight: '300' }}>Already have an Account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Register

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