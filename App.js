import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let timer = null
let ss = 0;
let mm = 0;
let hh = 0;

export default function App(){
  const [time, setTime] = useState(0 + `0:00:00`)
  const [start, setStart] = useState('Iniciar')
  const [lastTime, setLastTime] = useState(null)

  function iniciar(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      setStart('Iniciar')
    }else{
      timer = setInterval(() => {
        ss++
        if(ss == 60){
          ss = 0;
          mm++
        }
        if(mm == 60){
          mm = 0;
          hh++
        }
        
        let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)

        setTime(format)
      }, 1000)
      setStart('Parar')
    }
  }

  function zerar(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
    }

    setLastTime(time)

    setTime(0 + `0:00:00`);
    ss = 0;
    mm = 0;
    hh = 0;

    setStart('Iniciar')
  }

  return(
    <View style={styles.container}>
      <Image
        source={require('./src/stopwatch.png')}
        style={styles.img}
      />

      <Text style={styles.timer}>{time}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={[styles.btn, {borderColor: '#54ff55'}]} onPress={iniciar}>
          <Text style={[styles.btnText, {color: '#54ff55'}]}>{start}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, {borderColor: '#FF0000'}]} onPress={zerar}>
          <Text style={[styles.btnText, {color: '#FF0000'}]}>Zerar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastTime}>
        <Text style={styles.lastTimeText}>
          {
            lastTime ? 'Último tempo: ' + lastTime : ''
          }
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  img:{
    width: 200,
    height: 200
  },
  timer:{
    fontSize: 45,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#FFF'
  },
  btnArea:{
    flexDirection: 'row',
    marginTop: 20,
    height: 40
  },
  btn:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252525',
    borderColor: '#FFF',
    borderWidth: 2,
    height: 40,
    margin: 20,
    borderRadius: 9
  },
  btnText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  lastTime:{
    marginTop: 70
  },
  lastTimeText:{
    fontSize: 18,
    color: '#FFF',
    fontStyle: 'italic',
  }
})
