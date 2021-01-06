
import React, { Component, useState, useCallback } from 'react';
import { View, Text, Image, Dimensions, RefreshControl, ScrollView } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

import Carousel from 'react-native-snap-carousel';
import { ENTRIES1, ENTRIES2 } from '../data/index';

const { width, height } = Dimensions.get('window');

const Main = () => {
    // crashlytics().log('User signed in.');
    const [getWidth, setWidth] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        setTimeout(() => {
            setRefreshing(false)
        }, timeout);
    }

    const onRefresh = useCallback(() => {
        crashlytics().log('User crash.');
        crashlytics().crash()
        setRefreshing(true);
        wait(2000)
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <View>
                {/* <Text>{item.title}</Text> */}
                <Image style={{ width: 250, height: 250, borderRadius: 0 }} source={{ uri: item.illustration }} />
                <View style={{ backgroundColor: 'white', width: 10, height: 10, borderBottomLeftRadius: 10, position: 'absolute', top: 0, right: 0 }}></View>
                <View style={{ backgroundColor: 'white', width: 10, height: 10, borderBottomRightRadius: 10, position: 'absolute', top: 0, left: 0 }}></View>
            </View>
        )
    }

    return (
        
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={{ height: 300 }}>
                <Carousel
                    // contentContainerCustomStyle={{ backgroundColor: 'red' }}
                    data={ENTRIES1}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={250}
                    inactiveSlideShift={50}
                    // inactiveSlideScale={1}
                />
                <Text style={{ position: 'absolute', left: '50%', bottom: 0, marginLeft: -getWidth / 2, fontSize: 24 }} onLayout={(event) => {
                    const { x, y, width, height } = event.nativeEvent.layout;
                    setWidth(width)
                }}>10:20:15:01</Text>
            </View>
        </ScrollView>
    );

}

export default Main