import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/reduxHooks'
import ReactNativeCalendarStrip from 'react-native-calendar-strip'
import moment from 'moment'
import { Task } from '@/types'
import { FlatList } from 'react-native-gesture-handler'
import TaskCard from '@/components/TaskCard'

type Dot = {
  color:string
}

type MarkedDate = {
  date: Date,
  dots: Dot[]
}

const Calender = () => {

  const tasks = useAppSelector(state=>state.reducer.activeUser?.tasks)

  const dots : Dot[]= [{
    color: '#ff0000'
  }
  ]

  const [markedDates,setMarkedDates] = useState<MarkedDate[]>([])
  const [selectedDate,setSelectedDate] = useState<Date>(new Date())

  const [dateTask,setDateTask] = useState<Task[]>([]);

  useEffect(()=>{
    const arr = tasks?.filter(element=>new Date(element.dueDate).toDateString() === new Date(selectedDate).toDateString())??[]
    setDateTask(arr)
  },[selectedDate])

  useEffect(()=>{
    const newMarkedDates: MarkedDate[] = tasks?.map(task => ({
      date: new Date(task.dueDate),
      dots
    })) || []

    setMarkedDates(newMarkedDates)
  },[])


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
        selectedDate={selectedDate}
        highlightDateNameStyle={{color:'#19fa00'}}
        onDateSelected={(date) => setSelectedDate(date.toDate())}
        markedDates = {markedDates}
      />
      {
        dateTask.length == 0 && <View style={{margin:'auto', maxWidth:'60%'}}>
          <Text style={{fontSize:30, fontWeight:'300',textAlign:'center'}}>
            No tasks for {selectedDate.toDateString()}
          </Text>
        </View>
      }
      {
        dateTask.length > 0 && <FlatList
          data={dateTask}
          renderItem={(t) => <TaskCard {...t.item} />}
          style={styles.list}
          contentContainerStyle={{ gap: 20, padding: 20 }}
        />
      }
    </View>
  )
}

export default Calender

const styles = StyleSheet.create({
  list:{
    margin: "auto",
  }
})