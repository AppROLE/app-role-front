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

export default function Account() {
  const [phone, setPhone] = React.useState('');
  const [cpf, setCpf] = React.useState('');

  const insets = useSafeAreaInsets(); // Obtem as margens seguras do dispositivo
  const [viewHeight, setViewHeight] = useState(0);

  const handleLayout = (event:any) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const tabBarHeightWithSafeArea = viewHeight - 20;
  const tabBarHeightWithoutSafeArea = 0;

  const tabBarHeight = insets.bottom > 0 ? tabBarHeightWithoutSafeArea : tabBarHeightWithSafeArea;

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
            <Text className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-sansBold">
              Conta
            </Text>
          </View>
        </View>

        <ScrollView>
          <View className="pl-6 gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="text-white text-lg font-sansBold">
              Data de nascimento
            </Text>
            <TouchableOpacity className="bg-button_color p-2 justify-center rounded-lg mb-8">
              <Text className="text-sub_text text-lg">
                DD / MM / AAAA
              </Text>
            </TouchableOpacity>
          </View>
          <View className="px-6 gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="text-white text-lg font-sansBold">
              Telefone
            </Text>
            <RoleInput type="none" placeholder="(00) 0 0000-0000" value={phone} onChangeText={handlePhoneChange}/>
          </View>
          <View className="px-6 gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="text-white text-lg font-sansBold">
              CPF
            </Text>
            <RoleInput type="none" placeholder="000.000.000-00" value={cpf} onChangeText={handleCpfChange}/>
          </View>
          <View className="px-6 gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="text-white text-lg font-sansBold">
              Gênero
            </Text>
            <View className="flex flex-row gap-2">
              <TouchableOpacity className="bg-button_color justify-center p-2 rounded-lg mb-8">
                <Text className="text-sub_text text-lg font-sans">
                  Masculino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-button_color justify-center p-2 rounded-lg mb-8">
                <Text className="text-sub_text text-lg font-sans">
                  Feminino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-button_color justify-center p-2 rounded-lg mb-8">
                <Text className="text-sub_text text-lg font-sans">
                  Outro
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="ml-6 text-white text-lg font-sansBold">
              E-mail
            </Text>
            <TouchableOpacity onPress={openChange} className="bg-button_color p-2 justify-center self-center rounded-3xl mb-8 w-10/12">
              <Text className="text-white text-lg text-center font-sans">
                Alterar E-mail
              </Text>
            </TouchableOpacity>
          </View>
          <View className="gap-6 pt-6 items-start">
            <Text className="ml-6 text-white text-lg font-sansBold">
              Senha
            </Text>
            <TouchableOpacity onPress={openChange} className="bg-button_color p-2 justify-center self-center rounded-3xl mb-8 w-10/12">
              <Text className="text-white text-lg text-center font-sans">
                Alterar Senha
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View onLayout={handleLayout} className="absolute flex justify-end items-center py-4 bg-button_color w-full" style={{bottom: tabBarHeight}}>
          <BigButton buttonFunction={onSave}>
            <Text className="text-white text-lg font-sans">
              Salvar
            </Text>
          </BigButton>
        </View>
      </View>
    </Background>
  );
}
