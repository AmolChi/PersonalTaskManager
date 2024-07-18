import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Task } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Icon } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { updateTask } from "@/context/user/userSlice";

const TaskCard = (task: Task) => {
  const X = useSharedValue(10);

  const [completed, setCompleted] = useState(task.status === "completed");
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if(completed && task.status === 'pending'){
        const updatedTask:Task = {...task,status:"completed"}
        dispatch(updateTask({...updatedTask}))
        Toast.show({
            type:'success',
            position:'bottom',
            text1:'Task completed'
        })
    }
  },[completed])

  useDerivedValue(() => {
    if (X.value === 215) runOnJS(setCompleted)(true);
  }, []);

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      if (e.translationX < 0) X.value = -e.translationX;
      else X.value = e.translationX;
    })
    .onEnd((e) => {
      if (X.value < 200) X.value = withSpring(10);
      else {
        X.value = withSpring(215);
      }
    });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: X.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(X.value, [10, 150], [0.8, 0], Extrapolation.CLAMP),
      transform: [
        {
          translateX: interpolate(
            X.value,
            [10, 150],
            [0, 150],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <LinearGradient colors={["#77E4C8", "#478CCF"]} style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={{ color: "white" }}>
          {new Date(task.dueDate).toDateString()}
        </Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 42, color: "white" }}>{task.title}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {!completed ? (
          <View style={styles.track}>
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[styles.rider, animatedButtonStyle]}>
                <Image
                  source={require("../assets/tick-square.png")}
                  width={24}
                  height={24}
                />
              </Animated.View>
            </GestureDetector>
            <Animated.Text
              style={[
                {
                  fontSize: 18,
                  color: "white",
                  textAlign: "center",
                  paddingLeft: 30,
                },
                animatedTextStyle,
              ]}
            >
              {"Drag to mark done >>"}
            </Animated.Text>
          </View>
        ) : (
          <View style={styles.track}>
            <View style={styles.riderEnd}>
              <Image
                source={require("../assets/tick-square.png")}
                width={24}
                height={24}
              />
            </View>
          </View>
        )}
        <TouchableOpacity
          style={{
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: "#ffffff80",
            width: 60,
            height: 60,
            margin: 8,
            alignItems: "center",
          }}
        >
          <Icon size={30} source="pencil" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    width: 369,
    height: 364,
    borderRadius: 36,
  },
  dateContainer: {
    height: 62,
    backgroundColor: "#ffffff40",
    width: 150,
    borderRadius: 36,
    padding: 20,
    margin: 10,
  },
  titleContainer: {
    marginLeft: 24,
    height: 200,
    justifyContent: "flex-end",
  },
  track: {
    width: 275,
    height: 62,
    backgroundColor: "#ffffff40",
    margin: 8,
    borderRadius: 36,
    justifyContent: "center",
  },
  rider: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#478CCF",
    borderRadius: 50,
    position: "absolute",
  },
  riderEnd: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#478CCF",
    borderRadius: 50,
    position: "absolute",
    right: 10,
  },
});
