import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Button, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-fontawesome-pro";

class MultipleTextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textInputs: props.textInputs
        };
    }

    render() {
        return (
            <View style={[styles.containerStyle, this.props.containerStyle]}>
                {this.state.textInputs.map((textInput, idx) => {
                    return (
                        <View key={idx.toString()}>
                            <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                                {this.renderTextInput(textInput, idx)}
                                {this.renderRemoveButton(idx)}
                            </View>
                            {this.renderSeparator()}
                        </View>
                    )
                })}
                {this.renderAddButton()}
            </View>
        );
    };

    renderTextInput(textInput, idx) {
        let returnKeyType = (this.state.textInputs.length - 1) === idx ? 'done' : 'next'
        return (
            <TextInput
                ref={(ref) => {
                    if (this.state.textInputs[idx]) {
                        this.state.textInputs[idx].ref = ref
                    }
                }}
                keyboardType={this.props.textInputKeyboardType}
                autoCapitalize={this.props.autoCapitalize}
                placeholder={this.props.textInputPlaceholder}
                returnKeyType={returnKeyType}
                value={textInput.text}
                onChangeText={this.handleChangeTextInput(idx)}
                onSubmitEditing={() => {
                    if (this.state.textInputs[idx + 1] && this.state.textInputs[idx + 1].ref) {
                        this.state.textInputs[idx + 1].ref.focus()
                    }
                }}
                style={[styles.inputStyle, this.props.inputStyle]}
            />
        );
    };

    renderRemoveButton(idx) {
        return (
            <TouchableOpacity
                onPress={() => this.handleRemoveTextInput(idx)}
                style={[styles.containerActionButton, styles.containerDeleteButton]}
            >
                {this.props.removeIcon}
            </TouchableOpacity>
        );
    };

    renderAddButton() {
        if (this.props.enableAddButton && this.props.maxTextInput > this.state.textInputs.length) {
            return (
                <TouchableOpacity
                    onPress={() => this.handleAddTextInput()}
                    style={[styles.containerActionButton, styles.containerAddButton]}
                >
                    {this.props.addIcon}
                </TouchableOpacity>
            );
        }
    };

    handleAddTextInput = () => {
        this.setState({
            textInputs: this.state.textInputs.concat([{ text: '' }])
        }, () => {
            if (this.props.onAdd instanceof Function) {
                this.props.onAdd();
            }
        });
    };

    handleRemoveTextInput = (idx) => {
        this.setState({
            textInputs: this.state.textInputs.filter((s, sidx) => idx !== sidx)
        }, () => {
            if (this.props.onRemove instanceof Function) {
                this.props.onRemove(this.state.textInputs[idx], idx);
            }
        });
    };

    handleChangeTextInput = (idx) => (evt) => {
        const newTextInputs = this.state.textInputs.map((textInput, sidx) => {
            if (idx !== sidx) {
                return textInput;
            } else {
                return {
                    ...textInput,
                    text: evt
                };
            }
        });

        this.setState({
            textInputs: newTextInputs
        }, () => {
            if (this.props.onChangeText instanceof Function) {
                this.props.onChangeText({
                    text: evt
                }, idx);
            }
        });
    };

    renderSeparator() {
        return (
            <View
                style={{
                    marginTop: 5,
                    ...Platform.select({
                        ios: {
                            height: 0.5,
                            backgroundColor: 'grey'
                        }
                    })
                }}
            />
        );
    };

    getTextInputs() {
        return this.state.textInputs;
    };
};

getDefaultAddIcon = () => {
    return (
        <Icon
            name='plus'
            color='white'
            type='regular'
            size={15}
        />
    );
}

getDefaultRemoveIcon = () => {
    return (
        <Icon
            name='times'
            color='white'
            type='regular'
            size={15}
        />
    );
}

MultipleTextInput.defaultProps = {
    enableAddButton: true,
    addIcon: getDefaultAddIcon(),
    removeIcon: getDefaultRemoveIcon(),
    textInputPlaceholder: '',
    textInputKeyboardType: 'default',
    maxTextInput: 3,
    textInputs: [{ text: '' }],
    autoCapitalize: 'sentences'
};

MultipleTextInput.propTypes = {
    addIcon: PropTypes.element,
    removeIcon: PropTypes.element,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onChangeText: PropTypes.func,
    title: PropTypes.string,
    textInputPlaceholder: PropTypes.string,
    textInputKeyboardType: PropTypes.string,
    maxTextInput: PropTypes.number,
    textInputs: PropTypes.array,
    autoCapitalize: PropTypes.string
};

export default MultipleTextInput;

const styles = StyleSheet.create({
    containerActionButton: {
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerDeleteButton: {
        height: 25,
        width: 25,
        backgroundColor: '#bbbbbb',
    },
    containerAddButton: {
        height: 25,
        width: 25,
        backgroundColor: global.COLOR_MAIN,
        alignSelf: 'flex-end',
        marginVertical: 5
    },
    containerStyle: {
        flexDirection: 'column',
        marginVertical: 4
    },
    inputStyle: {
        flex: 1
    }
});
