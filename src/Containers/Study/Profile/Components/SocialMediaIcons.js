import React from 'react'
import { StyleSheet, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const size = 64;
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly"
	},
	icon: {
		width: size,
		height: size,
		borderRadius: size / 2,
		backgroundColor: '#3884ff',
		justifyContent: "center",
		alignItems: "center"
	}
});

export default () => {
	return (
		<View style={styles.container}>
			{["github", "twitter", "facebook"].map(name => (
				<View key={name} style={styles.icon}>
					<Icon name="github" color="white" size={32} {...{ name }} />
				</View>
			))}
		</View>
	);
};
