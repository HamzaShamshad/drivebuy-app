import React, { Component } from "react";
import { Modal, View, Image, Text, Button, StyleSheet } from "react-native";

class PlaceDetail  extends Component {
    constructor(props) {
        super(props);
    }

    modalContent = null

    printResults = () => {
        if (this.props.selectedPlace) {
            const pic = {uri: this.props.selectedPlace.icon}
            return (
                <View>
                    <Image source={pic} style={styles.placeImage} />
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                    <Text style={styles.placeName}>{this.props.selectedPlace.user_ratings_total}</Text>
                    <Text style={styles.placeName}>{this.props.selectedPlace.vicinity}</Text>
                </View>
            );
        }
    }

   

    render() {
        return (
                <Modal
                onRequestClose={this.props.onModalClosed}
                visible={this.props.selectedPlace !== null}
                animationType="slide"
                >
                    <View style={styles.modalContainer}>
                    {this.printResults()}
                        <View>
                            <Button title="go back" onPress={this.props.onModalClosed} />
                        </View>
                    </View>
                </Modal>
        );
    }

};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  }
});

export default PlaceDetail;