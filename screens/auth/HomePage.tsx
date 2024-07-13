import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { removeActiveUser } from '@/context/user/userSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector(state => state.reducer.activeUser);
  const [selectedButton,setSelectedButton] = useState<Number>(1); 

  const handlePillClick = (id:number)=>{
    setSelectedButton(id);
  }

  const logout = ()=>{
    dispatch(removeActiveUser())
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color:'#2E3A59'}}>Hello {activeUser?.name}</Text>
        <Text style={{fontWeight:'300'}}>Have a nice day</Text>
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
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container:{
    padding:50,
  },
  pillsContainer:{
    flexDirection:'row',
    gap:16,
    top:30,
    marginLeft: -25
  },
  selected:{
    backgroundColor:'#FFFFFF'
  },
  pills:{
    backgroundColor:'#E5EAFC',
    width:110,
    height:50,
    borderRadius:75,
    justifyContent:'center',
    alignItems:'center',
  }
})