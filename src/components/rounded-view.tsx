import { SafeAreaView, ViewProps } from 'react-native'

type RoundedViewProps = ViewProps

export function RoundedView({
  children,
  className,
  style,
  ...props
}: RoundedViewProps) {
  return (
    <SafeAreaView
      {...props}
      className="absolute bottom-0 flex h-[76%] w-full rounded-t-[32px] bg-red-800"
      style={style}
    >
      {children}
    </SafeAreaView>
  )
}
