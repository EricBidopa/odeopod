import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import BuyConfirmModal from "./BuyConfirmModal";
  
  const IWantToBuyPage = () => {
    const [showModal, setShowModal] = useState(false);
  
    const [askPrice, setAskPrice] = useState("");
    const [sellQuantity, setSellQuantity] = useState("");
    const [totalAmountAsk, setTotalAmountAsk] = useState(0);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    useEffect(() => {
      const total = parseFloat(askPrice) * parseFloat(sellQuantity);
      setTotalAmountAsk(isNaN(total) ? 0 : total);
    }, [askPrice, sellQuantity]);
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
    const handleAskPriceChange = (text) => {
      // Allow numeric input including decimal points
      setAskPrice(text.replace(/[^0-9.]/g, ""));
    };
  
    const handleSellQuantityChange = (text) => {
      // Allow numeric input including decimal points
      setSellQuantity(text.replace(/[^0-9.]/g, ""));
    };
  
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || expiryDate;
      setShowDatePicker(false);
      setExpiryDate(currentDate);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>I want To Buy $Jordan with ETH</Text>
          <Text>$Jordan Current Price : 0.05 ETH</Text>
          
          <View style={styles.labelAndInputView}>
            <Text style={styles.label}>Buy Quantity: </Text>
            <View style={styles.inputAndETHView}>
              <TextInput
                placeholder="Enter quantity"
                style={styles.input}
                keyboardType="numeric"
                value={sellQuantity}
                onChangeText={handleSellQuantityChange}
              />
              <Text>$Jordan</Text>
            </View>
          </View>
          <View style={styles.labelAndInputView}>
            <Text style={styles.label}>Your Ask Price Per Share: </Text>
            <View style={styles.inputAndETHView}>
              <TextInput
                placeholder="Enter price"
                style={styles.input}
                keyboardType="numeric"
                value={askPrice}
                onChangeText={handleAskPriceChange}
              />
              <Text>ETH</Text>
            </View>
          </View>

          <View style={styles.totalPriceContainer}>
            <Text style={styles.label}>Total Amount Needed:</Text>
            <Text style={styles.totalPriceText}>
              {totalAmountAsk.toFixed(4)} ETH
            </Text>
          </View>
  
          <View style={styles.labelAndInputView}>
            <Text style={styles.label}>Expiration Date: </Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {expiryDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={expiryDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
  
          <Pressable style={styles.button} onPress={openModal}>
            <Text style={styles.buttonText}>Start Upload</Text>
          </Pressable>
          <BuyConfirmModal show={showModal} onClose={closeModal}/>
        </View>
      </View>
    );
  };
  
  export default IWantToBuyPage;
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 30,
      flex: 1,
      backgroundColor: "blue",
    },
    wrapper: {
      backgroundColor: "pink",
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "#333",
    },
    labelAndInputView: {
      marginBottom: 15,
    },
    inputAndETHView: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: "#555",
    },
    input: {
      backgroundColor: "#f0f0f0",
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      color: "#333",
      width: "70%",
    },
    totalPriceContainer: {
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    totalPriceText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#007bff",
    },
    dateText: {
      fontSize: 16,
      color: "#333",
    },
    button: {
      backgroundColor: "#007bff",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 20,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 15,
      fontWeight: "bold",
    },
  });
  