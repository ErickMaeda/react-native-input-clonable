import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import MultipleTextInput from 'react-native-input-clonable';

class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
          <MultipleTextInput
            autoCapitalize={'none'}
            textInputPlaceholder='Email'
            textInputKeyboardType='email-address'
            textInputs={[{ text: 'first@gmail.com' }, { text: 'second@gmail.com' }]}
            onAdd={() => console.log("onAdd")}
            onRemove={(index) => console.log("onRemove", index)}
            onChangeText={(input, index) => console.log("onChangeText", input, index)}
            maxTextInput={10}
            inputStyle={{ fontSize: 14, width: 190 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 80
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default App;
