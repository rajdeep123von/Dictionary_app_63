import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
    };
  }
getWord=(word)=>{
 var searchKeyword=word.toLowerCase()
 var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
  
  return fetch(url)
  .then((data)=>{
    if(data.status===200){
      return data.json()}
      else{
        return null
      }
    })
    .then((response)=>{
      var responseObject = response
      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition=wordData.description
        var lexicalCategory=wordData.wordtype

        this.setState({
          "word": this.state.text,
          "definition": definition,
          "lexicalCategory": lexicalCategory})
      }
      else{
        this.setState({
          "word": this.state.text,
          "definition":"Not Found",

        })
      }
        })
      }
  

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#d9d926'}
          centerComponent={{
            text: 'Dictionary-App',
            style: { color: 'ffffff', fontSize: 20 },
          }}
        />
       <View style={{backgroundColor:'#39c6a3',height:'100%'}}>
    <TextInput
          style={styles.inputbox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word : "Loading...",
              lexicalCategory:'',
              examples:[],
              definition:""
            });
          }}
          value={this.state.text}
        />

      <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchPressed:true });
            this.getWord(this.state.text)
          }}>
       <Text style={{textAlign:'center',fontSize:30,marginTop:-14}}>Search</Text>
        </TouchableOpacity>
<View style={styles.detailsContainer}>
<Text style={styles.detailsTitle}>
Word : {""}
</Text>
<Text style={{fontSize:28}}>
{this.state.word}
</Text>
</View>

<View style={styles.detailsContainer}>
<Text style={styles.detailsTitle}>
Type : {""}
</Text>
<Text style={{fontSize:28}}>
{this.state.lexicalCategory}
</Text>
</View>

<View style={{flexDirection:'row', flexWrap:'wrap'}}>
<Text style={styles.detailsTitle}>
Definition : {""}
</Text>
<Text style={{fontSize:25}}>
{this.state.definition}
</Text>
</View>

      </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputbox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    outline: 'none',
    height: 40,
    borderWidth: 4,
  },
  searchButton: {
    width: '50%',
    height: '5%',
    alignSelf: 'center',
    padding: 10,
    margin: 20,
    backgroundColor:'#ffe6e6',
   borderRadius:30,
  },
  detailsContainer: {
    textAlign:'center',
    fontWeight:'bold',
    fontColor:'white',
    fontSize:30,
    flexDirection:'row', 
    flexWrap:'wrap',


  },
 detailsTitle: {
    textAlign:'center',
    fontSize:30,
    color:'white',
    flexDirection:'row', 
    flexWrap:'wrap',
    fontFamily:"Blackadder ITC",
  
  },
});
