import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '@/hooks/reduxHooks'
import ReactNativeCalendarStrip from 'react-native-calendar-strip'
import moment from 'moment'

const Calender = () => {

  const tasks = useAppSelector(state=>state.reducer.activeUser?.tasks)

  return (
    <View style={{flex:1}}>
      <ReactNativeCalendarStrip
        scrollable
        style={{ height: 150, paddingTop: 50, paddingBottom: 10 }}
        calendarColor={'#4535C1'}
        calendarHeaderStyle={{ color: 'white' }}
        dateNumberStyle={{ color: 'white' }}
        dateNameStyle={{ color: 'white' }}
        iconContainer={{ flex: 0.1 }}
        selectedDate={moment()}
        onDateSelected={(date) => console.log(date)}
      />
    </View>
  )
}

export default Calender

const styles = StyleSheet.create({})