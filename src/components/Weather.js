import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snowy, sunny } from '../../assets/index';

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null);
    
    const { weather,
            name,
            main: { temp}
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])

    function getBackgroundImg(weather) {
        if(weather === 'Snow') return snowy
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return haze;   
    }

    const WeatherIcon = (weather) => {
        if(weather == "Clear"){
            return <SunIcon width={30} height={30} fill="#fff" />
        }
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='darkgray' />
            <ImageBackground 
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <SearchBar fetchWeatherData={fetchWeatherData} />

                <View style={{alignItems: 'center' }}>
                    <Text style={{ ...styles.headerText, color: textColor }}>{name}</Text>
                    <View>{WeatherIcon(name.weather)}</View>
                    <Text style={{ ...styles.mainText, color: textColor}}>{main}</Text>
                    <Text style={{ ...styles.mainText, color: textColor}}>{temp} °C</Text>
                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
    },
    headerText: {
        fontSize: 46,
        marginTop: 100,
        fontWeight: 'bold',
    },
    mainText: {
        fontSize: 30
    }
});