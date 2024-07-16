import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { removeActiveUser } from '@/context/user/userSlice';
import { Icon } from 'react-native-paper';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';


const HomePage = () => {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector(state => state.reducer.activeUser);
  const [selectedButton,setSelectedButton] = useState<Number>(1); 

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handlePillClick = (id:number)=>{
    setSelectedButton(id);
  }

  const logout = ()=>{
    dispatch(removeActiveUser())
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{}}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color:'#2E3A59'}}>Hello {activeUser?.name}</Text>
          <Text style={{fontWeight:'300'}}>Have a nice day</Text>
        </View>
        <TouchableOpacity onPress={logout} style={{justifyContent:'center'}}>
          <Icon source='power-standby' size={40} color='#4535C1' />
        </TouchableOpacity>
      </View>
      <View style={styles.pillsContainer}>
        <TouchableOpacity style={[styles.pills , selectedButton === 1 && styles.selected]} onPress={()=>handlePillClick(1)}>
          <Text>My Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.pills, selectedButton === 2 && styles.selected]} onPress={() => handlePillClick(2)} >
          <Text>Due Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.pills, selectedButton === 3 && styles.selected]} onPress={() => handlePillClick(3)} >
          <Text>Completed</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.add} onPress={()=>navigation.navigate("Create a new Task")}>
        <Icon size={60} source='plus-circle' color='#4535C1'/>
      </TouchableOpacity>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:30,
    paddingTop:60
  },
  pillsContainer:{
    flexDirection:'row',
    gap:16,
    top:30,
    justifyContent:"space-evenly"
  },
  selected:{
    backgroundColor:'#77E4C8'
  },
  pills:{
    backgroundColor:'#36C2CE',
    width:110,
    height:50,
    borderRadius:75,
    justifyContent:'center',
    alignItems:'center',
  },
  add:{
    position:'absolute',
    right:20,
    top:Dimensions.get('screen').height-180
  }
})