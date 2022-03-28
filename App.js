import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState(null);

  async function handleTouch(){
    setJoke(null);
    setLoading(true);
    
    const rows = await (await (fetch('https://api.chucknorris.io/jokes/random'))).json();
    setJoke(rows);
    setLoading(false);
  }
  
  return (
    <View style={styles.container}>
      {
        !loading 
        ? <Image
            source={ joke ? require(`./src/assets/biscoitoAberto.png`) : require(`./src/assets/biscoito.png`)}
            style={styles.image}
          />
        : <ActivityIndicator />
      }
      { loading && <Text style={styles.loading}>Loading...</Text> }
      { joke
        && <TouchableOpacity onPress={() => setJoke(null)} style={styles.buttonClose}>
            <Text style={styles.textButton}> Clear </Text>
          </TouchableOpacity> 
      }
      { !joke && <Button handleTouch={handleTouch}/> }
      { (!loading && joke)  && <Text style={styles.description}> {joke.value} </Text >} 
    </View>
  );
}

function Button({ handleTouch, style }){
  return(
      <TouchableOpacity onPress={handleTouch} style={[styles.button, style]}>
        <Text style={styles.textButton}> Get a Joke </Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  image: {
    width: 220,
    height: 220
  },
  button: {
    margin: 24,
    width: 220,
    padding: 12,
    backgroundColor: "orange",
    borderRadius: 4,
  },
  buttonClose: {
    margin: 24,
    width: 220,
    padding: 12,
    backgroundColor: "red",
    borderRadius: 4,
  },
  textButton: {
    fontSize: 18,
    fontWeight: '700',
    color: "white",
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: "#c2c2c2",
    padding: 12,
    lineHeight: 22,
    textAlign: 'center'
  },
  loading: {
    fontSize: 14,
    fontWeight: '400',
    color: "#45e",
    opacity: 0.5
  }
});
