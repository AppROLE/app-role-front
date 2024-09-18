import {
  TouchableOpacity,
  View,
  Text,
  ScrollView, Modal,
} from 'react-native';
import Background from '@/src/components/background';
import React from "react";
import Svg from "@/src/components/svg";
import RoleInput from "@/src/components/input";
import BigButton from "@/src/components/bigButton";

export default function Account() {
  const [phone, setPhone] = React.useState('');
  const [cpf, setCpf] = React.useState('');

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
        <View className="flex flex-row h-12 w-full items-center gap-3 border-b-2 border-b-line_gray">
          <TouchableOpacity
              className="ml-5 flex h-12 w-12 items-center justify-center rounded-full bg-button_color mb-8"
          >
            <Svg
                uri={process.env.EXPO_PUBLIC_URL_S3 + "/left_arrow.svg"}
            />
          </TouchableOpacity>
          <View className="flex-1 h-full mb-8">
            <Text className="text-white text-center text-3xl font-bold">
              Conta
            </Text>
          </View>
        </View>
        <ScrollView>
          <View className="pl-6 gap-6 pt-6 items-start border-b-2 border-b-line_gray">
            <Text className="text-white text-lg font-bold">
              Data de nascimento
            </Text>
            <TouchableOpacity className="bg-button_color p-2 justify-center rounded-lg mb-8">
              <Text className="text-sub_text text-lg">
                DD / MM / AAAA
              </Text>
            </TouchableOpacity>
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
            <View className="flex flex-row gap-2">
              <TouchableOpacity className="bg-button_color justify-center p-2 rounded-lg mb-8">
                <Text className="text-sub_text text-lg">
                  Masculino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-button_color justify-center p-2 rounded-lg mb-8">
                <Text className="text-sub_text text-lg">
                  Feminino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-button_color justify-center p-2 rounded-lg mb-8">
                <Text className="text-sub_text text-lg">
                  Outro
                </Text>
              </TouchableOpacity>
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
            <TouchableOpacity onPress={openChange} className="bg-button_color p-2 justify-center self-center rounded-3xl mb-8 w-10/12">
              <Text className="text-white text-lg text-center">
                Alterar Senha
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View className="flex justify-end items-center py-4 bg-button_color">
          <BigButton buttonFunction={onSave}>
            <Text className="text-white text-lg">
              Salvar
            </Text>
          </BigButton>
        </View>
      </View>
    </Background>
  );
}
