import React from 'react';
import { StyleSheet, View, Button, TextInput, SafeAreaView, FlatList, Text } from 'react-native';
import film from '../Helpers/filmsData';
import Constants from 'expo-constants';
import {getFilmsFromApiWithSearchedText} from '../Api/TMDBApi'
import FilmItem from './FilmItem'

class Search extends React.Component {

    constructor(props){
        super(props)
        this.state = { 
            films: [],
         }
         this.searchedText = ""
    }

    _loadFilms() {
        if(this.searchedText.length > 0){
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => this.setState({ films: data.results}))
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
      }

    render() {
        console.log("RENDER");
        
        return (            
            <View style={styles.main_container}>
                <TextInput 
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    style={styles.textinput} 
                    placeholder='Titre du film'/>
                <Button title='Rechercher' onPress={() => {this._loadFilms()}}/>
                <SafeAreaView style={styles.container}>
                    <FlatList
                    data={this.state.films}
                    renderItem={({ item }) => <FilmItem film={item}/>}
                    keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            </View> 
        )
    }
}

// Components/Search.js

const styles = StyleSheet.create({
    main_container: {
        marginTop: 30,
        flex:1
    },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
      },
  })

export default Search