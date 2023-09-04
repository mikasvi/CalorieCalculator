import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {Picker} from '@react-native-picker/picker';

export default function App() {
    const [weight, setWeight] = useState('');
    const [activity, setActivity] = useState('1.3');
    const [gender, setGender] = useState('male');
    const [calories, setCalories] = useState(null);

    const gender_props = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ];

    const calculateCalories = () => {
        const weightValue = parseFloat(weight);
        const activityValue = parseFloat(activity);

        let cal;
        if (gender === 'male') {
            cal = (879 + 10.2 * weightValue) * activityValue;
        } else {
            cal = (795 + 7.18 * weightValue) * activityValue;
        }

        setCalories(cal.toFixed(2));
    };

    return (
        <View style={styles.container}>
            <Text>Weight</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter weight in kg"
                value={weight}
                onChangeText={setWeight}
            />
            <Text>Intensity</Text>
            <Picker
                selectedValue={activity}
                style={styles.picker}
                onValueChange={(itemValue) => setActivity(itemValue)}
            >
                <Picker.Item label="Light" value="1.3" />
                <Picker.Item label="Usual" value="1.5" />
                <Picker.Item label="Moderate" value="1.7" />
                <Picker.Item label="Hard" value="2.0" />
                <Picker.Item label="Very Hard" value="2.2" />
            </Picker>

            <RadioForm
                radio_props={gender_props}
                initial={0}
                onPress={(value) => setGender(value)}
            />

            <Button title="Calculate" onPress={calculateCalories} />

            {calories && (
                <Text style={styles.result}>Calories: {calories}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    picker: {
        width: 200,
        height: 50,
        marginBottom: 10,
    },
    result: {
        marginTop: 20,
        fontSize: 20,
    },
});
