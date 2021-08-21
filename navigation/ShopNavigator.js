
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductNavigator = createStackNavigator({
	ProductsOverview: ProductOverviewScreen,
	ProductDetail: ProductDetailsScreen,
	Cart: CartScreen,
}, {
	navigationOptions: {
		drawerIcon: drawerConfig => (
			<Ionicons
				name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
				size={23}
				color={drawerConfig.tintColor}
			/>
		)
	},
	defaultNavigationOptions: defaultNavOptions
});


const OrdersNavigator = createStackNavigator({
	Orders: OrdersScreen
}, {
	navigationOptions: {
		drawerIcon: drawerConfig => (
			<Ionicons
				name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
				size={23}
				color={drawerConfig.tintColor}
			/>
		)
	},
	defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
	UserProducts: UserProductScreen,
	EditProduct: EditProductScreen
}, {
	navigationOptions: {
		drawerIcon: drawerConfig => (
			<Ionicons
				name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
				size={23}
				color={drawerConfig.tintColor}
			/>
		)
	},
	defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
	Products: ProductNavigator,
	Orders: OrdersNavigator,
	Admin: AdminNavigator
}, {
	contentOptions: {
		activeTintColor: Colors.primary
	},
	contentComponent: props => {
		const dispatch = useDispatch();
		return (
			<View style={{ flex: 1, paddingTop: 20 }}>
				<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
					<DrawerItems {...props} />
					<Button title="Logout" color={Colors.primary} onPress={() => {
						dispatch(authActions.logout());
						// props.navigation.navigate('Auth'); 
					}} />
				</SafeAreaView>
			</View>
		)
	}
});

const AunthNavigator = createStackNavigator({
	Auth: AuthScreen
}, {
	defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
	Stratup: StartupScreen,
	Auth: AunthNavigator,
	Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);