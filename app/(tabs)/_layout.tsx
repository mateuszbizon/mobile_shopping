import React from "react";
import { Tabs } from "expo-router";
import TabIcon from "@/components/TabIcon";
import { MaterialIcons } from "@expo/vector-icons";

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
			}}
        >
			<Tabs.Screen
				name='index'
				options={{
					headerShown: false,
					title: "Home",
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} title='Home' icon={<MaterialIcons name="home" size={15} />} />
					),
				}}
			/>
			<Tabs.Screen
				name='categories'
				options={{
					headerShown: false,
					title: "Kategorie",
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} title='Kategorie' icon={<MaterialIcons name="category" size={15} />} />
					),
				}}
			/>
			<Tabs.Screen
				name='products'
				options={{
					headerShown: false,
					title: "Produkty",
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} title='Produkty' icon={<MaterialIcons name="production-quantity-limits" size={15} />} />
					),
				}}
			/>
			<Tabs.Screen
				name='shopping-list'
				options={{
					headerShown: false,
					title: "Lista",
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} title='Lista' icon={<MaterialIcons name="shopping-cart" size={15} />} />
					),
				}}
			/>
		</Tabs>
	);
};

export default _layout;
