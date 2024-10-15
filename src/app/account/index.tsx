import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Background from '@/src/components/background';
import React, {useState} from "react";
import Svg from "@/src/components/svg";
import RoleInput from "@/src/components/input";
import BigButton from "@/src/components/bigButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AnimatedOption from "@/src/components/selectedCard";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Account() {
  const [phone, setPhone] = React.useState('');
  const [cpf, setCpf] = React.useState('');

  const insets = useSafeAreaInsets(); // Obtem as margens seguras do dispositivo
  const [viewHeight, setViewHeight] = useState(0);
  const [genderSelected, setGenderSelected] = useState([false, false, false])

  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [dateSelected, setDateSelected] = useState(false)
  const [formattedDate, setFormattedDate] = useState('DD/MM/YYYY')

  const handleLayout = (event:any) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const tabBarHeightWithSafeArea = viewHeight - 20;
  const tabBarHeightWithoutSafeArea = 0;

  const tabBarHeight = insets.bottom > 0 ? tabBarHeightWithoutSafeArea : tabBarHeightWithSafeArea;

  console.log(tabBarHeight);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date
    setShowPicker(false)
    setDate(currentDate)

    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = currentDate.getFullYear()

    setFormattedDate(`${day}/${month}/${year}`)
    setDateSelected(true)
  }

  function handleClosePicker() {
    setShowPicker(false)
  }

  function handlePhoneChange(text: string) {
    setPhone(text);
  }

  function handleCpfChange(text: string) {
    setCpf(text);
  }

  function openChange(){
    //go to confirm code screen
  }

  function onSave(){
    //go back to previous screen
  }

  return (
    <Background>
      <View className="w-full flex-1">
        <View className="relative flex flex-row h-12 w-full items-center gap-3 border-b-2 border-b-line_gray">
          <TouchableOpacity
              className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-button_color bottom-4 left-6"
          >
            <Svg
                uri={process.env.EXPO_PUBLIC_URL_S3 + "/left_arrow.svg"}
            />
          </TouchableOpacity>
          <View className="flex-1 h-full mb-8">
            <Text className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold">
              Conta
            </Text>
          </View>
        </View>

        <ScrollView style={{marginBottom: tabBarHeight + 96}}>
          <View className="pl-6 gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="text-white text-lg font-bold">
              Data de nascimento
            </Text>
            <View className="flex flex-row flex-wrap mb-8">
              <AnimatedOption
                  label={formattedDate}
                  selected={dateSelected}
                  onPress={() => setShowPicker(true)}
              />
            </View>

          </View>
          <View className="px-6 gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="text-white text-lg font-bold">
              Telefone
            </Text>
            <RoleInput type="none" placeholder="(00) 0 0000-0000" value={phone} onChangeText={handlePhoneChange}/>
          </View>
          <View className="px-6 gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="text-white text-lg font-bold">
              CPF
            </Text>
            <RoleInput type="none" placeholder="000.000.000-00" value={cpf} onChangeText={handleCpfChange}/>
          </View>
          <View className="px-6 gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="text-white text-lg font-bold">
              Gênero
            </Text>
            <View className="flex flex-row gap-2 mb-8">
              <AnimatedOption
                  label={"Masculino"}
                  selected={genderSelected[0]}
                  onPress={() => setGenderSelected([true, false, false])}
              />
              <AnimatedOption
                  label={"Feminino"}
                  selected={genderSelected[1]}
                  onPress={() => setGenderSelected([false, true, false])}
              />
              <AnimatedOption
                  label={"Outro"}
                  selected={genderSelected[2]}
                  onPress={() => setGenderSelected([false, false, true])}
              />
            </View>
          </View>
          <View className="gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="ml-6 text-white text-lg font-bold">
              E-mail
            </Text>
            <TouchableOpacity onPress={openChange} className="bg-button_color p-2 justify-center self-center rounded-3xl mb-8 w-10/12">
              <Text className="text-white text-lg text-center">
                Alterar E-mail
              </Text>
            </TouchableOpacity>
          </View>
          <View className="gap-6 pt-6 items-start">
            <Text className="ml-6 text-white text-lg font-bold">
              Senha
            </Text>
            <TouchableOpacity onPress={openChange} className="bg-button_color p-2 justify-center self-center rounded-3xl w-10/12">
              <Text className="text-white text-lg text-center">
                Alterar Senha
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View onLayout={handleLayout} className="absolute flex justify-end items-center py-4 bg-button_color w-full" style={{bottom: tabBarHeight}}>
          <BigButton buttonFunction={onSave}>
            <Text className="text-white text-lg">
              Salvar
            </Text>
          </BigButton>
        </View>
        {showPicker && (
            <View className="absolute inset-0 flex z-50 bg-transparent mt-20 w-[100vw] p-5">
              <View className="relative flex justify-center items-center bg-black rounded-3xl">
                <View className="w-[90%] flex p-4 rounded-lg mx-auto">
                  <DateTimePicker
                      value={date}
                      mode="date"
                      display="inline"
                      accentColor="#9C4EDC"
                      themeVariant='dark'
                      minimumDate={new Date()}
                      onChange={handleDateChange}
                  />
                  <TouchableOpacity
                      onPress={handleClosePicker}
                      className="mt-4 p-2 bg-[#1C1C1C] rounded-full items-center justify-center"
                  >
                    <Text className="text-white">Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        )}
      </View>
    </Background>
  );
}
