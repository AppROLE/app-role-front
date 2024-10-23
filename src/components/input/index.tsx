import React, { useEffect, useState } from 'react'
import { View, TextInput, Text } from 'react-native' // Import the 'Text' component from 'react-native'
import Svg from '../svg'

export type RoleInputType =
  | 'email'
  | 'password'
  | 'confirm-password'
  | 'user'
  | 'at'
  | 'hidden-password'
  | 'hidden-confirm-password'
  | 'nickname'
  | 'none'

interface RoleInputProps {
  type: RoleInputType
  value?: string
  onChangeText?: (value: string) => void
  error?: string
  onFocus?: () => void;
  style?: any;
  placeholder?: string;
}

export default function RoleInput({
  type,
  value,
  onChangeText,
  onFocus,
  style,
  error,
  placeholder
}: RoleInputProps) {
  const [hidden, setHidden] = useState(true)

  function hiddenToggle() {
    setHidden(!hidden)
  }

  return (
    <View className="w-full">
      <View className="flex w-full flex-row items-baseline gap-2 border-b-[1px] border-[#BDBDBD] pb-1" style={{alignItems: 'flex-end'}}>
        {type === 'email' ? (
          <Svg
            uri={process.env.EXPO_PUBLIC_URL_S3 + "/email.svg"}
            fill={error ? '#F87171' : '#BDBDBD'}

          />
        ) : type === 'password' ? (
          <Svg
            uri={process.env.EXPO_PUBLIC_URL_S3 + "/key.svg"}
            fill={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'confirm-password' ? (
          <Svg
            uri={process.env.EXPO_PUBLIC_URL_S3 + "/key.svg"}
            fill={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'user' ? (
          <Svg
            uri={process.env.EXPO_PUBLIC_URL_S3 + "/user.svg"}
            fill={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'at' ? (
          <Svg
            uri={process.env.EXPO_PUBLIC_URL_S3 + "/at.svg"}
            fill={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'hidden-password' ? (
          <Svg
            uri={process.env.EXPO_PUBLIC_URL_S3 + "/key.svg"}
            fill={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'hidden-confirm-password' ? (
          <Svg
            uri={process.env.EXPO_PUBLIC_URL_S3 + "/key.svg"}
            fill={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'nickname' ? (
          <Svg
            uri={process.env.EXPO_PUBLIC_URL_S3 + "/user.svg"}
            fill={error ? '#F87171' : '#BDBDBD'}
          />
        ) : null}
        <TextInput
          placeholder={
            placeholder
            ? placeholder + ':'
              : type === 'email'
                ? 'E-mail:'
                : type === 'password'
                  ? 'Senha:'
                  : type === 'confirm-password'
                    ? 'Confirme sua senha:'
                    : type === 'user'
                      ? 'Nome completo:'
                      : type === 'at'
                        ? 'Nome de usuário'
                        : type === 'hidden-password'
                          ? 'Senha:'
                          : type === 'hidden-confirm-password'
                            ? 'Confirme sua senha:'
                            : type === 'nickname'
                              ? 'Apelido:'
                              : type === 'none'
                                ? ''
                                : ''

          }
          className={`w-[75%] ${!error ? 'text-white placeholder:text-[#BDBDBD]' : 'placeholder:text-red-400 text-white opacity-80'} text-[16px] outline-none`}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={
            hidden &&
            (type === 'hidden-password' || type === 'hidden-confirm-password')
          }
          onFocus={onFocus}
          style={style}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
        />
        {(type === 'hidden-password' || type === 'hidden-confirm-password') &&
          (hidden === true ? (
            <Svg
              uri={process.env.EXPO_PUBLIC_URL_S3 + "/eye.svg"}
              fill={'#BDBDBD'}
              onPress={hiddenToggle}
            />
          ) : (
            <Svg
              uri={process.env.EXPO_PUBLIC_URL_S3 + "/eye-slash.svg"}
              fill={'#BDBDBD'}
              onPress={hiddenToggle}
            />
          ))}
      </View>
      <View>
        <Text className="text-red-400 opacity-80">{error}</Text>
      </View>
    </View>
  )
}
