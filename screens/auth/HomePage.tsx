import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { removeActiveUser } from "@/context/user/userSlice";
import { Icon } from "react-native-paper";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import TaskCard from "@/components/TaskCard";
import { FlatList } from "react-native-gesture-handler";
import { Task } from "@/types";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector((state) => state.reducer.activeUser);
  const [selectedButton, setSelectedButton] = useState<Number>(1);

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handlePillClick = (id: number) => {
    setSelectedButton(id);
  };

  const todayTask: Task[]|undefined = activeUser?.tasks.filter(task => new Date(task.dueDate).toDateString() === new Date().toDateString()) 
  const completedTask :Task[]|undefined = activeUser?.tasks.filter(task => task.status === 'completed')
  const logout = () => {
    dispatch(removeActiveUser());
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
        }}
      >
        <View style={{}}>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#2E3A59" }}>
            Hello {activeUser?.name}
          </Text>
          <Text style={{ fontWeight: "300" }}>Have a nice day</Text>
        </View>
        <TouchableOpacity onPress={logout} style={{ justifyContent: "center" }}>
          <Icon source="power-standby" size={40} color="#4535C1" />
        </TouchableOpacity>
      </View>
      <View style={styles.pillsContainer}>
        <TouchableOpacity
          style={[styles.pills, selectedButton === 1 && styles.selected]}
          onPress={() => handlePillClick(1)}
        >
          <Text>My Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pills, selectedButton === 2 && styles.selected]}
          onPress={() => handlePillClick(2)}
        >
          <Text>Due Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pills, selectedButton === 3 && styles.selected]}
          onPress={() => handlePillClick(3)}
        >
          <Text>Completed</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate("New Task")}
      >
        <Icon size={60} source="plus-circle" color="#4535C1" />
      </TouchableOpacity>

      {selectedButton === 1 && (
        <FlatList
          data={activeUser?.tasks}
          renderItem={(t) => <TaskCard {...t.item} />}
          style={styles.list}
          contentContainerStyle={{ gap: 20, padding: 20 }}
        />
      )}
      {
        selectedButton === 2 && todayTask && (
          <FlatList
            data = {todayTask}
            renderItem = {(t)=> <TaskCard {...t.item} />}
            style = {styles.list}
            contentContainerStyle = {{gap:20,padding:20}}
          />
        )
      }

      {
        selectedButton === 3 && completedTask && (
          <FlatList
            data={completedTask}
            renderItem={(t) => <TaskCard {...t.item} />}
            style={styles.list}
            contentContainerStyle={{ gap: 20, padding: 20 }}
          />
        )
      }
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 30,
    justifyContent: "space-evenly",
    paddingHorizontal: 30,
  },
  selected: {
    backgroundColor: "#77E4C8",
  },
  pills: {
    backgroundColor: "#36C2CE",
    width: 110,
    height: 50,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    position: "absolute",
    right: 20,
    top: Dimensions.get("screen").height - 180,
    zIndex: 1,
  },
  list: {
    margin: "auto",
  },
});
