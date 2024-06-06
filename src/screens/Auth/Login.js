import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import userStore from '../../store/UserStore';

export default function LoginForm({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login, loading} = userStore;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg.jpg')}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 24,
            paddingVertical: 20,
          }}>
          <Image
            source={{
              uri: 'https://seeklogo.com/images/M/m-design-logo-09A5D82F03-seeklogo.com.png',
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.inputView}>
            <Text style={{color: Colors.text, fontWeight: '500'}}>
              Kullanıcı Adı:
            </Text>
            <TextInput
              style={styles.input}
              placeholder="test@gmail.com"
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Text style={{color: Colors.text, fontWeight: '500'}}>Parola:</Text>
            <TextInput
              style={styles.input}
              placeholder="PASSWORD"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.buttonView}>
            <Pressable
              style={styles.button}
              onPress={async () => {
                console.log(username, password);
                const status = await login({username, password});
                if (!status) {
                  Alert.alert('Login Error!');
                } else {
                  navigation.navigate('Home');
                }
              }}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </Pressable>
          </View>

          <Text style={styles.footerText}>Şifremi unuttum</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 160,
    width: 170,
    marginHorizontal: 'auto',
    marginBottom: 20,
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 7,
    color: Colors.text,
  },
  forgetText: {
    fontSize: 11,
    color: 'red',
  },
  button: {
    backgroundColor: '#173c8e',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#173c8e',
    marginTop: 16,
  },
  signup: {
    color: 'red',
    fontSize: 13,
  },
});
