import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import IndexScreen from "./src/screens/indexScreen";
import { Provider } from "./src/context/BlogContext";
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen"; // Import EditScreen
import { Feather } from "@expo/vector-icons";

// Create a stack navigator
const Stack = createStackNavigator();

const App = function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1E90FF", // Updated header background color
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 22, // Larger title font
          },
          headerShadowVisible: false, // Remove shadow for a cleaner look
        }}
      >
        <Stack.Screen
          name="Index"
          component={IndexScreen}
          options={({ navigation }) => ({
            title: "Blog Posts",
            headerRight: () => (
              <Feather
                name="plus-circle"
                size={28}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Create")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Show"
          component={ShowScreen}
          options={({ navigation, route }) => ({
            title: "View Post",
            headerRight: () => (
              <Feather
                name="edit"
                size={28}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Edit", { id: route.params?.id })}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{
            title: "Create New Post",
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{
            title: "Edit Post",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
