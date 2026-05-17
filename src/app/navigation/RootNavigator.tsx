import React from 'react'
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useTranslation} from 'react-i18next'
import type {RootStackParamList} from './types'
import {useAppState} from '@/hooks/useAppState'
import PhoneInputScreen from '@/screens/PhoneInput/PhoneInputScreen'
import RoleSelectScreen from '@/screens/RoleSelect/RoleSelectScreen'
import OTPScreen from '@/screens/OTP/OTPScreen'
import RegistrationScreen from '@/screens/Registration/RegistrationScreen'
import ProfileScreen from '@/screens/Profile/ProfileScreen'
import LanguageSwitcher from '@/components/common/LanguageSwitcher/LanguageSwitcher'
import {colors} from '@/theme'

const Stack = createNativeStackNavigator<RootStackParamList>()

function CloseButton({onPress}: {onPress: () => void}) {
  return (
    <Pressable onPress={onPress} hitSlop={12} style={styles.closeBtn}>
      <Text style={styles.closeText}>✕</Text>
    </Pressable>
  )
}

export function RootNavigator() {
  const {t} = useTranslation()
  const appState = useAppState()

  if (!appState) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    )
  }

  const initialRouteName = appState.route
  const registrationInitialParams =
    appState.route === 'Registration'
      ? {phone: appState.phone, role: appState.role}
      : undefined

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerTintColor: colors.text,
          headerBackTitle: '',
          headerTitleStyle: {fontSize: 16, fontWeight: '600'},
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="PhoneInput"
          component={PhoneInputScreen}
          options={{
            headerTitle: t('registration.title'),
            headerRight: () => <LanguageSwitcher />,
          }}
        />
        <Stack.Screen
          name="RoleSelect"
          component={RoleSelectScreen}
          options={({navigation}) => ({
            headerTitle: t('registration.title'),
            headerRight: () => (
              <CloseButton onPress={() => navigation.navigate('PhoneInput')} />
            ),
          })}
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={({navigation}) => ({
            headerTitle: t('registration.title'),
            headerRight: () => (
              <CloseButton onPress={() => navigation.navigate('PhoneInput')} />
            ),
          })}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          initialParams={registrationInitialParams}
          options={({navigation}) => ({
            headerTitle: t('registration.title'),
            headerRight: () => (
              <CloseButton onPress={() => navigation.navigate('PhoneInput')} />
            ),
          })}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
})
