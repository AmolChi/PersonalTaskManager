import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { status, Task, TaskError } from "@/types";
import { addTask } from "@/context/user/userSlice";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "react-native-paper";
import Toast from "react-native-toast-message";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

const CreateTask = () => {
  const dispatch = useAppDispatch();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(()=>{
    const d = new Date();
    return d.toISOString();
  });
  const status: status = "pending";
  const [show, setShow] = useState<boolean>(false);

  const [error, setError] = useState<TaskError>({
    descError: "",
    titleError: "",
  });

  useEffect(() => {
    setId(String(Date.now()));
  }, []);

  const handleSetError = (text: string, input: keyof TaskError) => {
    setError((prevState) => ({ ...prevState, [input]: text }));
  };

  const validate = () => {
    let error = false;
    if (title.length < 5) {
      handleSetError("Please keep title of at least 5 letters", "titleError");
      error = true;
    }
    if (desc.split(" ").length < 10) {
      handleSetError("Enter at least 10 words", "descError");
      error = true;
    }
    return error === false;
  };

  const createTask = () => {
    if (validate()) {
      const task: Task = {
        id: String(id),
        title,
        description: desc,
        dueDate: date,
        status,
      };
      dispatch(addTask(task));
      Toast.show({
        type:'success',
        text1:'Task created successfully',
        position:'bottom'
      }
    )
    navigation.navigate("home")
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 15 }}>
      <Text style={styles.titleText}>ID</Text>
      <Text style={styles.contentText}>{id}</Text>
      <Text style={styles.titleText}>Title</Text>
      <TextInput
        style={styles.inputContainer}
        value={title}
        onFocus={() => handleSetError("", "titleError")}
        onChangeText={(text) => setTitle(text)}
      />
      {error.titleError.length > 0 ? (
        <Text style={styles.errorText}>{error.titleError}</Text>
      ) : null}
      <Text style={styles.titleText}>Description</Text>
      <TextInput
        multiline
        numberOfLines={5}
        value={desc}
        onChangeText={(text) => setDesc(text)}
        onFocus={() => handleSetError("", "descError")}
        style={styles.descContainer}
      />
      {error.descError.length > 0 ? (
        <Text style={styles.errorText}>{error.descError}</Text>
      ) : null}
      <Text style={styles.titleText}>Set due Date</Text>
      <View style={styles.calendarContainer}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Icon size={30} source="calendar-search" color="#36C2CE" />
        </TouchableOpacity>
        <Text
          style={{
            textAlignVertical: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {new Date(date).toDateString()}
        </Text>
      </View>
      {show && (
        <RNDateTimePicker
          minimumDate={new Date()}
          value={new Date(date)}
          onChange={(event, selectedDate) => {
            const currentDate = new Date(selectedDate || date);
            setDate(currentDate.toISOString());
            setShow(false);
          }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={createTask}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "right",
    marginVertical:-10
  },
  titleText: {
    fontSize: 18,
    fontWeight: "300",
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    height: 60,
    padding: 20,
    backgroundColor: "#DADADA",
    borderRadius: 10,
    width: "100%",
  },
  inputContainer: {
    height: 60,
    padding: 20,
    backgroundColor: "#DADADA",
    borderRadius: 10,
  },
  descContainer: {
    padding: 20,
    backgroundColor: "#DADADA",
    borderRadius: 10,
    textAlignVertical: "top",
  },
  calendarContainer: {
    backgroundColor: "#DADADA",
    borderRadius: 10,
    padding: 20,
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 60,
    backgroundColor: "#4535C1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText:{
    fontSize:20,
    fontWeight:'bold',
    color:'white'
  }
});
