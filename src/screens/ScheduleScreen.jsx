import React, { Component, Fragment, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from "react-native";
import moment from "moment";
// Config
import colors from "../config/colors";

// Constants
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const time = [
  "3:00am",
  "6:00am",
  "9:00am",
  "12:00pm",
  "3:00pm",
  "6:00pm",
  "9:00pm",
  "12:00am",
];

export class Box extends Component {
  render() {
    return (
      <Fragment>
        <View
          style={[
            styles.square,
            { backgroundColor: this.props.backgroundColor },
          ]}
        ></View>
      </Fragment>
    );
  }
}

export class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: time,
    };
  }

  // Maps blocks to display on or off
  timeMap() {
    return this.state.time.map((data) => {
      // convert string to date time
      var on = moment(this.props.onTime, "h:mma").format("HH:mm");
      var off = moment(this.props.offTime, "h:mma").format("HH:mm");
      var data = moment(data, "h:mma").format("HH:mm");
      return (
        <Fragment>
          <Box
            backgroundColor={
              data > on && data <= off ? colors.onTime : colors.offTime
            }
          />
          <View style={styles.verticalLine}></View>
        </Fragment>
      );
    });
  }

  render() {
    return (
      <View style={{ marginTop: "20px" }}>
        <Text style={styles.subheadingStyle}>{this.props.name}</Text>
        <View style={[styles.rowStyle, { justifyContent: "space-between" }]}>
          <Text>12AM</Text>
          <Text>12PM</Text>
          <Text>12AM</Text>
        </View>
        <View style={styles.rowStyle}>{this.timeMap()}</View>
      </View>
    );
  }
}

export default function ScheduleScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Proxy to temporarily bypass CORS policy
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "http://159.203.37.33:3696/times"; // site that doesn’t send Access-Control-*
  fetch(proxyurl + url)
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={styles.headingStyle}>DAILY SCHEDULE:</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Schedule
              name={item.name}
              status={item.status}
              onTime={item.onTime}
              offTime={item.offTime}
            />
          )}
        />
      )}
      {/* <Schedule name="Test Car" onTime="6:00am" offTime="9:00am" /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  square: {
    height: (windowWidth - 50) / time.length,
    width: (windowWidth - 50) / time.length,
  },
  verticalLine: {
    height: windowWidth / time.length,
    width: 1,
    backgroundColor: "black",
  },
  headingStyle: {
    fontWeight: "bold",
    fontSize: "2em",
  },
  subheadingStyle: {
    fontWeight: "bold",
    fontSize: "1.5em",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  rowStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },
});
