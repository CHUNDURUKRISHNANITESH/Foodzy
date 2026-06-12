import Toast, { BaseToast, ToastProps } from 'react-native-toast-message';

const customToast = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#28a745', backgroundColor: '#d4edda' }} 
      contentContainerStyle={{ backgroundColor: '#d4edda' }}
      text1Style={{ color: '#155724' }}
      text2Style={{ color: '#155724' }}
    />
  ),
  error: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#dc3545', backgroundColor: '#f8d7da' }} 
      contentContainerStyle={{ backgroundColor: '#f8d7da' }}
      text1Style={{ color: '#721c24' }}
      text2Style={{ color: '#721c24' }}
    />
  ),
  info: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#007BFF', backgroundColor: '#D6E9FF' }}
      contentContainerStyle={{ backgroundColor: '#D6E9FF' }}
      text1Style={{ color: '#004085' }}
      text2Style={{ color: '#004085' }}
    />
  ),
};

export default customToast
