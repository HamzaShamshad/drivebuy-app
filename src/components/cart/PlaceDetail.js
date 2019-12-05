import React, { Component } from "react";
import { Modal, View, Image, Text, Button, StyleSheet , ScrollView} from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

class PlaceDetail  extends Component {
    constructor(props) {
        super(props);
    }

    modalContent = null

    printResults = () => {
        if (this.props.selectedPlace) {
            const pic = {uri: this.props.selectedPlace.icon}
            return (
                    <ScrollView style={styles.modalContainer}>
                    
                    <Card>
                    <CardImage 
                        source={{uri: this.props.selectedPlace.icon}} 
                        title={this.props.selectedPlace.name}
                    />
                    <CardTitle
                        style={styles.placeName}
                        subtitle="Location Information"
                    />
                    <CardContent text={this.props.selectedPlace.name} />
                    <CardContent text={this.props.selectedPlace.user_ratings_total} />
                    <CardContent text={this.props.selectedPlace.vicinity} />
                    <CardContent text={this.props.selectedPlace.rating} />
                    <CardAction 
                        separator={true} 
                        inColumn={false}>
                        <CardButton
                            onPress={this.props.onModalClosed}
                            title="Go Back"
                            color="indigo"
                        />
                    </CardAction>
                    </Card>

                    </ScrollView>
    
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
                    </View>
                </Modal>
        );
    }

};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
  },
  placeImage: {
    width: "50%",
    height: "50%"
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30
  }
});

export default PlaceDetail;