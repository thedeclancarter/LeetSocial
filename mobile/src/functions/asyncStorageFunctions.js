const storeData = async(tok) => {
    try {
        await AsyncStorage.setItem('tokenValue', tok.accessToken);
    } catch (error) {
        console.log(error);
    }
}

const getData = async() => {
    try {
        const ud = await AsyncStorage.getItem('tokenValue');
        return value;
    } catch (error) {
        console.log(error);
    }
}