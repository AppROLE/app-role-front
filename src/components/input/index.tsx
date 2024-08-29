import React, { useEffect, useState } from 'react'
import { View, TextInput, Text } from 'react-native' // Import the 'Text' component from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

export type RoleInputType =
  | 'email'
  | 'password'
  | 'confirm-password'
  | 'user'
  | 'at'
  | 'hidden-password'
  | 'hidden-confirm-password'
  | 'nickname'

interface RoleInputProps {
  type: RoleInputType
  value?: string
  onChangeText?: (value: string) => void
  error: string
}

export default function RoleInput({
  type,
  value,
  onChangeText,
  error
}: RoleInputProps) {
  const [hidden, setHidden] = useState(true)

  function hiddenToggle() {
    setHidden(!hidden)
  }

  return (
    <View className="w-full">
      <View className="flex w-full flex-row items-baseline gap-2 border-b-[1px] border-[#BDBDBD] pb-1">
        {type === 'email' ? (
          <FontAwesome6
            name="envelope"
            size={24}
            color={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'password' ? (
          <FontAwesome6
            name="key"
            size={24}
            color={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'confirm-password' ? (
          <FontAwesome6
            name="key"
            size={24}
            color={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'user' ? (
          <FontAwesome6
            name="user"
            size={24}
            color={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'at' ? (
          <FontAwesome6
            name="at"
            size={24}
            color={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'hidden-password' ? (
          <FontAwesome6
            name="key"
            size={24}
            color={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'hidden-confirm-password' ? (
          <FontAwesome6
            name="key"
            size={24}
            color={error ? '#F87171' : '#BDBDBD'}
          />
        ) : type === 'nickname' ? (
          <FontAwesome6
            name="user"
            size={24}
            color={error ? '#F87171' : '#BDBDBD'}
          />
        ) : null}
        <TextInput
          placeholder={
            type === 'email'
              ? 'Email'
              : type === 'password'
                ? 'Senha'
                : type === 'confirm-password'
                  ? 'Confirme a senha'
                  : type === 'user'
                    ? 'Nome de usuário'
                    : type === 'at'
                      ? 'Nome de usuário'
                      : type === 'hidden-password'
                        ? 'Senha'
                        : type === 'hidden-confirm-password'
                          ? 'Confirme a senha'
                          : type === 'nickname'
                            ? 'Apelido'
                            : ''
          }
          className={`w-[80%] ${!error ? 'text-white placeholder:text-[#BDBDBD]' : 'placeholder:text-red-400] text-red-400 opacity-80'} text-[16px] outline-none`}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={
            hidden &&
            (type === 'hidden-password' || type === 'hidden-confirm-password')
          }
        />
        {(type === 'hidden-password' || type === 'hidden-confirm-password') &&
          (hidden === true ? (
            <FontAwesome6
              name="eye"
              size={24}
              color="#BDBDBD"
              onPress={hiddenToggle}
            />
          ) : (
            <FontAwesome6
              name="eye-slash"
              size={24}
              color="#BDBDBD"
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
